#include <ArduinoJson.h>
#include <SPI.h>  
#include <LoRa.h>

DynamicJsonDocument data(100);

long frequency = 433E6;  // LoRa Frequency
long spreadingFactor = 7; // defaults 7 Supported values are between 6 and 12. If a spreading factor of 6 is set, implicit header mode must be used to transmit and receive packets.
long signalBandwidth = 125E3; //defaults to 125E3. Supported values are 7.8E3, 10.4E3, 15.6E3, 20.8E3, 31.25E3, 41.7E3, 62.5E3, 125E3, 250E3, and 500E3.
int codingRateDenominator = 5;
int txPower = 17; //defaults 17 2-20 

int csPin = 5;          // LoRa radio chip select
int resetPin = 16;        // LoRa radio reset
int irqPin = 4;          // change for your board; must be a hardware interrupt pin

byte localAddress = 0xBB;     // address of this device
byte destination = 0xFF;      // destination to send 
byte msgCount = 0;            // count of outgoing messages


void setup() {
  Serial.begin(115200);
  while (!Serial);
  LoRa.setPins(csPin, resetPin, irqPin);
  if (!LoRa.begin(frequency)) {
    Serial.println("LoRa init failed. Check your connections.");
    while (true);
  }
  Serial.println("LoRa init succeeded.");
  LoRa.onReceive(onReceive);
  LoRa.onTxDone(onTxDone);
  
}

void loop() {
//  if (runEvery(5000)) {
//    readSensor();
//    String dataJson;
//    serializeJson(data, dataJson);
//    Serial.println(dataJson);
//    LoRa_sendMessage(dataJson);
//  }
}



void readSensor(){
  data["time"] = millis();
}


void LoRa_rxMode(){
//  LoRa.setSpreadingFactor(spreadingFactor);
//  LoRa.setSignalBandwidth(signalBandwidth);
//  LoRa.setCodingRate4(codingRateDenominator);
  LoRa.enableInvertIQ();                // active invert I and Q signals
  LoRa.receive();                       // set receive mode
}

void LoRa_txMode(){
//  LoRa.setTxPower(txPower);
//  LoRa.setSpreadingFactor(spreadingFactor);
//  LoRa.setSignalBandwidth(signalBandwidth);
//  LoRa.setCodingRate4(codingRateDenominator);
  LoRa.idle();                          // set standby mode
  LoRa.disableInvertIQ();               // normal mode
}

void LoRa_sendMessage(String message) {
  LoRa_txMode();                        // set tx mode
  LoRa.beginPacket();                   // start packet
  LoRa.write(destination);              // add destination address
  LoRa.write(localAddress);             // add sender address
  LoRa.write(msgCount);                 // add message ID
  LoRa.write(message.length());         // add payload length
  LoRa.print(message);                  // add payload
  LoRa.endPacket(true);                 // finish packet and send it
  msgCount++;
}

void onReceive(int packetSize) {
  if (packetSize == 0) return;          // if there's no packet, return
  int recipient = LoRa.read();          // recipient address
  byte sender = LoRa.read();            // sender address
  byte incomingMsgId = LoRa.read();     // incoming msg ID
  byte incomingLength = LoRa.read();    // incoming msg length

  String message = "";
  while (LoRa.available())message += (char)LoRa.read();
  if (incomingLength != message.length())return;
  if (recipient != localAddress && recipient != localAddress)return;
  Serial.println("Received from: 0x" + String(sender, HEX));
  Serial.println("Sent to: 0x" + String(recipient, HEX));
  Serial.println("Message ID: " + String(incomingMsgId));
  Serial.println("Message length: " + String(incomingLength));
  Serial.println("Message: " + message);
  Serial.println("RSSI: " + String(LoRa.packetRssi()));
  Serial.println("Snr: " + String(LoRa.packetSnr()));
  Serial.println();
}

void onTxDone(){
  Serial.println("TxDone");
  LoRa_rxMode();
}

boolean runEvery(unsigned long interval){
  static unsigned long previousMillis = 0;
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval){
    previousMillis = currentMillis;
    return true;
  }
  return false;
}
