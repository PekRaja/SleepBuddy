#include <SoftwareSerial.h>
SoftwareSerial BTSerial(10, 11); // RX | TX
volatile bool con = false;
void setup()
{
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(9600);
  pinMode(3, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(3), concheck, CHANGE);
}
void concheck() // interrupt function
{
  con = !con;
}
void loop()
{
  while(con == false)
  {
    if (Serial.available())
    {
      BTSerial.write(Serial.read());
    }
    if (BTSerial.available())
    {
      String line = BTSerial.readStringUntil('\r');
      Serial.print(line);
      if(line == "+STAT=0")
      {
        Serial.print("Pöö");
      }
    }
  }
  while(con == true)
  {
    if (Serial.available())
    {
      BTSerial.write(Serial.read());
    }
    if (BTSerial.available())
    {
      String line = BTSerial.readStringUntil('\r');
      Serial.println(line);
      if(line == "Start")
      {
        Serial.println("Helou");
      }
      else if(line == "Stop")
      {
        Serial.println("Bye Bye");
      }
    }
  }
}
