#include <SoftwareSerial.h>
SoftwareSerial BTSerial(10, 11); // RX | TX

const int P1 = A0;    //Piezo
const int P2 = A1;    //Piezo
const int vari = 100; 
int PinA[vari] = {0};  //Array to store Piezo P1 measurements
int PinB[vari] = {0};  //Array to store Piezo P2 measurements
int counter = 0;
float MinA = 0.0;
float MaxA = 0.0;
float MinB = 0.0;
float MaxB = 0.0;
int A = 0;
int B = 0;
float DifA = 0.0;
float DifB = 0.0;
float pre = 1234.00; //placeholder for pressure-sensor
bool con = false;

unsigned long previousMillis=0;
unsigned long currentMillis=0;
unsigned long interval = 0;

void setup() 
{
  Serial.begin(9600);
  BTSerial.begin(9600);
  pinMode(P1, INPUT);
  pinMode(P2, INPUT);
}
void calc()
{
  DifA = MaxA-MinA;
  DifB = MaxB-MinB;
  if(DifA > 100)
  {
    DifA = 100;
  }
  if(DifB > 100)
  {
    DifB = 100;
  }
}
void concheck()
{
  if (Serial.available())
  {
    String line = Serial.readStringUntil('\r');
    Serial.println(line);
    BTSerial.println(line);
  }
  if (BTSerial.available())
  {
    //Serial.write(BTSerial.read());
    String line = BTSerial.readStringUntil('\r');
    Serial.print(line);
    if(line == "+CONNECTED")
    {
      Serial.println("On");
      con = true;
    }
    if(line == "+DISCONNECTED")
    {
      Serial.println("Off");
      con = false;
    }
  }
}
void piezo()
{
  for(int i=0; i<vari; i++)
  {
    A = analogRead(P1);
    B = analogRead(P2);
    if(i == 0)
    {
      MaxA = A;
      MinA = A;
      MaxB = B;
      MinB = B;
    }
    PinA[i] = A;
    PinB[i] = B;
    MinA = min(MinA, PinA[i]);
    MaxA = max(MaxA, PinA[i]);
    MinB = min(MinB, PinB[i]);
    MaxB = max(MaxB, PinB[i]);
    delay(10);
  }
}
void loop() 
{  
  while(con == false)
  {
    concheck();
  }
  while(con == true)
  {
    if (counter < 1)
    {
      BTSerial.print("Hello");
      Serial.print("Hello");
      counter++; 
      currentMillis = millis();
    }
    interval = currentMillis-previousMillis;
    previousMillis = currentMillis;
    piezo();
    calc();
    BTSerial.print(DifA);
    BTSerial.print(" ");
    BTSerial.println(DifB);
    Serial.print(DifA);
    Serial.print(" ");
    Serial.println(DifB);
    currentMillis = millis();
    concheck();
  }
}
