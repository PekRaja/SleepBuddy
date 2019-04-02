#include <SoftwareSerial.h>
SoftwareSerial BTSerial(10, 11); // RX | TX

const int P1 = A0;    //Piezo
const int P2 = A1;    //Piezo
const int P3 = A2;    //Pressure sensor
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
float pre = 0.0; 
volatile bool con = false;
bool Start = false;

void setup() 
{
  Serial.begin(9600);
  BTSerial.begin(9600);
  pinMode(P1, INPUT);
  pinMode(P2, INPUT);
  pinMode(P3, INPUT);
  pinMode(3, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(3), concheck, CHANGE);
  concheck();
}
void concheck()
{
  con = !con;
  int val = digitalRead(3);
  if(con == false && val == HIGH)
  {
    con = true;
  }
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
void BTserial()
{
  BTSerial.print(pre);
  BTSerial.print(" ");
  BTSerial.print(DifA);
  BTSerial.print(" ");
  BTSerial.println(DifB);
}
void Pres()
{
  pre = analogRead(P3);
}
void Begin()
{
  if (BTSerial.available())
  {
    String line = BTSerial.readStringUntil('\r');
    if(line == "Start")
    {
      Start = true;
    }
    else if(line == "Stop")
    {
      Start = false;
    }
  }
}
void loop()   //Might need to figure out something for when bluetooth is not connected
{
  while(Start == false)
  {
    Begin();
  }
  while(con == true && Start == true)
  {
    piezo();
    calc();
    Pres();
    BTserial();
    Begin();
  }
}
