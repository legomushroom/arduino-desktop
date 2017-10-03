// LED vars
const int upPin = 13;
const int downPin = 12;
  
void setup() {
  // initialize serial
  Serial.begin(9600);
  pinMode(upPin,OUTPUT);
  pinMode(downPin,OUTPUT);
  digitalWrite(upPin, 1);
  digitalWrite(downPin, 1);
}

char prevChar = 'A';

// N - neutral
// U - up
// D - down

void loop() {
  if (Serial.available()) {
    char inChar = (char)Serial.read();
    
    if (prevChar != inChar) {
      if (inChar == 'U') {
        digitalWrite(upPin, 0);
        prevChar = 'U';
      } else if (inChar == 'D') {
        digitalWrite(downPin, 0);
        prevChar = 'D';
      } else if (inChar == 'N') {
        digitalWrite(upPin, 1);
        digitalWrite(downPin, 1);
        prevChar = 'N';
      } 
    }
  }

  delay(16); // give the Arduino some breathing room.
}

