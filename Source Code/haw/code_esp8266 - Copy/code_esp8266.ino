#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoOTA.h>
#include "EEPROM.h"
#include "configWifi.h"

ESP8266WebServer server(80);

//
void setup() {
  Serial.begin(9600);
  readErom();
  WiFi.hostname("Gate-Way-Lora-VKU");
  WiFi.begin(essid, epass);
  WiFi.mode(WIFI_STA);
  if (testWifi()) {
    setupOTA();
    createWebServer();
    server.begin();
    return;
  } else {
    SetupAP();
    WebServer();
  }
}

void loop() {
  ArduinoOTA.handle();
  server.handleClient();




}



void Reset() {
  EEPROM.begin(512);
  for (int i = 0; i < 49; ++i) EEPROM.write(i, 1);
  EEPROM.commit();
  EEPROM.end();
  delay(5000);
  ESP.restart();
}

void readErom() {
  EEPROM.begin(512);
  for (int i = 0; i < 32; ++i) essid += char(EEPROM.read(i));
  for (int i = 32; i < 96; ++i) epass += char(EEPROM.read(i));
  EEPROM.commit();
  EEPROM.end();
  essid.trim();
  epass.trim();
}

void WebServer() {
  while (true) {
    server.handleClient();
  }
}

void SetupAP(void) {
  WiFi.mode(WIFI_STA);
  WiFi.softAP("Gate Lora VKU", "");
  WiFi.disconnect();
  delay(100);
  createWebServer();
  server.begin();
}

void createWebServer() {
  server.on("/",mainPage);
  server.on("/list-wifi", ListWifi);
  server.on("/action",action);
}

void mainPage(){
  server.send(200, "text/html", page_Config_Wifi);
}

void ListWifi(){
  String lsWifi;
  int n = WiFi.scanNetworks();
  if(n == 0) lsWifi = "nonetworks fond";
  else{
    for(int i = 0; i < n; i++){
      lsWifi += String(WiFi.SSID(i))+"|";
    }
  }
  server.send(200, "text/plane", lsWifi);
}

void action(){
    String qssid = server.arg("ssid");
    String qpass = server.arg("pass");
    if (qssid.length() > 0 && qpass.length() > 0) {
      EEPROM.begin(512);
      for (int i = 0; i < 128; ++i) EEPROM.write(i, 0);
      EEPROM.commit();
      for (int i = 0; i < qssid.length(); ++i) EEPROM.write(i, qssid[i]);
      for (int i = 0; i < qpass.length(); ++i) EEPROM.write(32 + i, qpass[i]);
      EEPROM.commit();
      EEPROM.end();
    }
    server.send(200, "text/html", "Restarting.......................");
    delay(5000);
    Serial.println("RESTART");
    ESP.restart();
}

bool testWifi(void) {
  int c = 0;
  while (c < 20) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WL_CONNECTED");
      return true;
    }
    delay(1000);
    //    Serial.print(".");
    c++;
  }
  Serial.println("WL_NOT_CONNECT");
  return false;
}

void setupOTA() {
  ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH) type = "sketch";
    else type = "filesystem";
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
}
