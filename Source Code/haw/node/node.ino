#include "SdsDustSensor.h"
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <SPI.h>  
#include <LoRa.h>

int rxPin = 4;
int txPin = 3;
SdsDustSensor sds(rxPin, txPin);
DynamicJsonDocument data(100);

long frequency = 433E6;  // LoRa Frequency
int csPin = 10;          // LoRa radio chip select
int resetPin = 9;        // LoRa radio reset
int irqPin = 2;          // change for your board; must be a hardware interrupt pin

byte localAddress = 0xFF;     // address of this device
byte destination = 0xBB;      // destination to send 
byte msgCount = 0;            // count of outgoing messages

void setup() {
  for(int i = 14; i<=17; i++){
    pinMode(i,INPUT);
  }
  Serial.begin(9600);
  sds.begin();
  while (!Serial);
  LoRa.setPins(csPin, resetPin, irqPin);
  if (!LoRa.begin(frequency)) {
    Serial.println("LoRa init failed. Check your connections.");
    while (true);
  }
  Serial.println("LoRa init succeeded.");
//  LoRa.onReceive(onReceive);
  LoRa.onTxDone(onTxDone);
}

void loop() {
  if (runEvery(5000)) { // repeat every 5000 millis
    readSensor();
    String dataJson;
    serializeJson(data, dataJson);
    LoRa_sendMessage(dataJson);
  }
}
void readSensor(){
  PmResult pm = sds.readPm();
  if (pm.isOk() ) {
    data["PM25"] = pm.pm25;
    data["PM10"] = pm.pm10;
    data["NO2"] = analogRead(A0);
    data["CO"] = analogRead(A1);
    data["SO2"] = analogRead(A2);
    data["O3"] = analogRead(A3);
  }
  serializeJson(data, Serial);
  Serial.println("");
}


void LoRa_rxMode(){
  LoRa.enableInvertIQ();                // active invert I and Q signals
  LoRa.receive();                       // set receive mode
}

void LoRa_txMode(){
  LoRa.idle();                          // set standby mode
  LoRa.disableInvertIQ();               // normal mode
}

void LoRa_sendMessage(String message) {
  LoRa_txMode();                        // set tx mode
  LoRa.beginPacket();                   // start packet
  LoRa.write(destination);              // add destination address
  LoRa.write(localAddress);             // add sender address
  LoRa.write(msgCount);                 // add message ID
  LoRa.write(message.length());        // add payload length
  LoRa.print(message);                  // add payload
  LoRa.endPacket(true);                 // finish packet and send it
  msgCount++;
}

void onReceive(int packetSize) {
  digitalWrite(3, 1);
  if (packetSize == 0) return;          // if there's no packet, return
   // read packet header bytes:
  int recipient = LoRa.read();          // recipient address
  byte sender = LoRa.read();            // sender address
  byte incomingMsgId = LoRa.read();     // incoming msg ID
  byte incomingLength = LoRa.read();    // incoming msg length

  String message = "";
  while (LoRa.available()) {
    message += (char)LoRa.read();
  }
  if (incomingLength != message.length()) {   // check length for error
    Serial.println("error: message length does not match length");
    return;                             // skip rest of function
  }
  if (recipient != localAddress && recipient != localAddress) {
    Serial.println("This message is not for me.");
    return;                             // skip rest of function
  }
  Serial.println("Received from: 0x" + String(sender, HEX));
  Serial.println("Sent to: 0x" + String(recipient, HEX));
  Serial.println("Message ID: " + String(incomingMsgId));
  Serial.println("Message length: " + String(incomingLength));
  Serial.println("Message: " + message);
  Serial.println("RSSI: " + String(LoRa.packetRssi()));
  Serial.println("Snr: " + String(LoRa.packetSnr()));
  Serial.println();
//  deserializeJson(data, message);
////  data["rssi"] = LoRa.packetRssi();
//  serializeJson(data, Serial);
//  Serial.println();
}

void onTxDone() {
  Serial.println("TxDone");
//   LoRa_rxMode();
}

boolean runEvery(unsigned long interval)
{
  static unsigned long previousMillis = 0;
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    return true;
  }
  return false;
}
