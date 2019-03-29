#include <SoftwareSerial.h>
SoftwareSerial BTSerial(10, 11); // RX | TX
bool con = false;
int count = 0;
void setup()
{
  Serial.begin(9600);
  Serial.println("Enter AT commands:");
  BTSerial.begin(9600);
}

void loop()
{
  if (Serial.available())
  {
    BTSerial.write(Serial.read());
  }
  if (BTSerial.available())
  {
    String line = BTSerial.readStringUntil('\r');
    Serial.print(line);
  }
}
