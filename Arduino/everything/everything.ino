#include <SoftwareSerial.h>
//Humidity & Temperature Sensor
#include "DHTesp.h"
SoftwareSerial SIM900(10, 11); 
//Servo 
#include<Servo.h>

//Pin Servo 
#define OUTDOOR_PIN 3
#define INDOOR_PIN 4
#define COFFER_PIN 5
#define TERASSE_PIN 6
#define WINDOW_PIN 7

//Servo declaration
Servo outdoor,indoor,coffer,Terasse,window;

//States 
int inDoorState = 0,outDoorState = 0,cofferState = 0,terasseState = 0,windowState = 0,lightState = 0,windowPositionn = 0;
String cmd;

// Variables capteur d'humidité & temperature
DHTesp dht;
float humidity;
float temperature;
const int dhtSensor = 45 ;

// Potentiometre ( window )
const int pinPotentiometre = A5;
int windowPosition = 0;

// urls to send via serial port (sensors values)
String urlSerialPort1 = "";
String urlSerialPort2 = "";
String urlSerialPort3 = "";

//Variables PIR Sensor
const int PIR = 8;
const int buzz = A12;
// Variables Pluie Sensor
const int pinPluie = A0 ;
int pluieValue;

// Variables Flamme Sensor
const int pinFlamme = A1 ;
int flammeValue ;


void setup() {
   Serial.begin(250000);
 // Arduino communicates with SIM900 GSM shield at a baud rate of 19200
  // Make sure that corresponds to the baud rate of your module
  SIM900.begin(19200);
  // Give time to your GSM shield log on to network
  delay(5000);   
  Serial.println("ready");
  // Send the SMS
  sendSMS();
  // Servos 
  outdoor.attach(OUTDOOR_PIN);
  indoor.attach(INDOOR_PIN);
  coffer.attach(COFFER_PIN);
  Terasse.attach(TERASSE_PIN);
  window.attach(WINDOW_PIN);
  coffer.write(55);//125
   outdoor.write(70);
   indoor.write(30);
   analogWrite(buzz,0);
    analogWrite(9,255); 
  // Potentiometre
  pinMode(pinPotentiometre, OUTPUT);
  Terasse.write(130);
  // Humidity & Temperature Sensor Pin 
  dht.setup(dhtSensor);
  
  // Setting pir output as arduino input
  pinMode(PIR, INPUT);
  digitalWrite(PIR,LOW);

  // Setting pluie sensor as OUTPUT
  pinMode(pinPluie, INPUT);
  
  // Setting pluie sensor as OUTPUT
  pinMode(pinFlamme, INPUT);
}
void sendSMS() {
  // AT command to set SIM900 to SMS mode
  SIM900.print("AT+CMGF=1\r"); 
  delay(100);

  // REPLACE THE X's WITH THE RECIPIENT'S MOBILE NUMBER
  // USE INTERNATIONAL FORMAT CODE FOR MOBILE NUMBERS
  SIM900.println("AT + CMGS = \"+212639284187\""); 
  delay(100);
  
  // REPLACE WITH YOUR OWN SMS MESSAGE CONTENT
  SIM900.println("Hello ! ur home is missing u ! Come back as soon as possible !"); 
  delay(100);

  // End AT command with a ^Z, ASCII code 26
  SIM900.println((char)26); 
  delay(100);
  SIM900.println();
  // Give module time to send SMS
  delay(5000); 
}
void openIndoor(){
  indoor.write(30);
}

void closeIndoor(){
  indoor.write(90);
}

void openOutdoor(){
  outdoor.write(120);
}

void closeOutdoor(){
  outdoor.write(70);
}

void hideCoffer(){
  coffer.write(120);
}

void showCoffer(){
  coffer.write(45);
}

void moveWindow(int dir){
  window.write(dir);
}

void terasseDegre(int positionn){
  Terasse.write(positionn);
}



//Function format URL and send it via Serial Port
void sendDataSerialPort() {
  if(!Serial.available()){
    
  delay(100);
  urlSerialPort1 = "{\"temperature\":" ;
  urlSerialPort1.concat(temperature);
  urlSerialPort1 += ",\"rain\":"; 
  urlSerialPort1.concat(pluieValue);
  urlSerialPort1 += ",\"humidity\":"; 
  urlSerialPort1.concat(humidity);
  urlSerialPort1 += "}";
   Serial.print(urlSerialPort1);
  delay(300);
  urlSerialPort2 = "{\"outdoor\":" ;
  urlSerialPort2.concat(outDoorState) ;
  urlSerialPort2 += ",\"indoor\":" ;
  urlSerialPort2.concat(inDoorState) ;
  urlSerialPort2 += ",\"Terasse\":";
  urlSerialPort2.concat(terasseState);
  urlSerialPort2 +=  "}";
  Serial.print(urlSerialPort2);
  delay(300);
  urlSerialPort3 = "{\"coffer\":";
  urlSerialPort3.concat(cofferState);
  urlSerialPort3 += ",\"light\":";
  urlSerialPort3.concat(lightState); 
  urlSerialPort3 +=",\"window\":";
  urlSerialPort3.concat(windowState) ; 
  urlSerialPort3 += "}";
  Serial.print(urlSerialPort3);
  delay(300);
   }

}

//Function read All Sensors 


//Function Humidity and Temperature Sensor
void Humidity_Temperature (){
  delay(dht.getMinimumSamplingPeriod());
  humidity = dht.getHumidity();
  temperature = dht.getTemperature();
  Serial.print(dht.getStatusString());
  Serial.print("\t");
  Serial.print("Humidity : ");
  Serial.print(humidity, 1);
  Serial.print("\t\t");
  Serial.print("Temperature : ");
  Serial.println(temperature, 1);
}

//Function PIR Sensor
void PIR_Sensor(){
  if(digitalRead(6) == HIGH) {
    Serial.println("motion detected");
    }
  else {
    Serial.println("scanning");
    }
}

// Read from Potentiometre
void readPotentio(){
  windowPositionn = analogRead(pinPotentiometre);
  windowPosition = map(windowPositionn, 0, 1023, 0, 180);
   Serial.print("Potentiometre: ");
  Serial.println(windowPositionn);
}

//Function Pluie Sensor
void PLUIE(){
  pluieValue = analogRead(pinPluie);
  Serial.print("Valeur du sensor Pluie : ");
  Serial.println(pluieValue);
}

//Function Pluie Sensor
void Flamme(){
  flammeValue = analogRead(pinPluie);
  Serial.print("Valeur du sensor Flamme : ");
  Serial.println(flammeValue);
}

void readAllSensors(){
  Flamme();
  PLUIE();
  PIR_Sensor();
  Humidity_Temperature();
  readPotentio();
}

void loop() {

readAllSensors();
sendDataSerialPort();

if(Serial.available()){
    cmd = Serial.readString();
  }
  if (cmd.substring(0, 6) == "WINDOW"){
    int value = cmd.substring(6).toInt();
   if ( windowPosition > value ){
    moveWindow(0);
   }else if ( windowPosition < value){
    moveWindow(180);
   }else ;
  }
  if(cmd == "OPENINDOOR"){
    openIndoor();
    inDoorState = 1;
  }
  if(cmd == "CLOSEINDOOR"){
    closeIndoor();
    inDoorState = 0;
  }
  if(cmd == "OPENOUTDOOR"){
    openOutdoor();
    outDoorState = 1;
  }
  if(cmd == "CLOSEOUTDOOR"){
    closeOutdoor();
    outDoorState = 0;
  }
  if(cmd == "ALARMON"){
       analogWrite(buzz,255);
  }
  if(cmd == "ALARMOFF"){
       analogWrite(buzz,0);
  }
  if(cmd == "HIDE"){
    hideCoffer();
    cofferState = 0;
  }
  if(cmd == "SHOW"){
    showCoffer();
    cofferState = 1;
  }
  if(cmd == "LIGHTON"){
    analogWrite(9,255); 
  }
  if(cmd == "LIGHTOFF"){
    analogWrite(9,0); 
  }
  if(cmd.substring(0, 6) == "TERASS"){
    int value = cmd.substring(6).toInt();
    if (value > 170 ) {
      value = 170;
    }if (value < 130){
      value = 130;
    }
    terasseDegre(value);
  } if (pluieValue < 500 ) {
     terasseDegre(130);
  }

}
