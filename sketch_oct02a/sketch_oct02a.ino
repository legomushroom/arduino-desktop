#define SERIAL_BUFFER_SIZE 8

const unsigned int TRIG_PIN=8;
const unsigned int ECHO_PIN=7;
const unsigned int BAUD_RATE=9600;

// LED vars
const int upPin = 13;
const int downPin = 12;
  
void setup() {
  // initialize serial
  Serial.begin(BAUD_RATE);
  pinMode(upPin,OUTPUT);
  pinMode(downPin,OUTPUT);
  digitalWrite(upPin, 1);
  digitalWrite(downPin, 1);

  // echo setup
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
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

  /* DISTANCE */
   digitalWrite(TRIG_PIN, LOW);
   delayMicroseconds(2);
   digitalWrite(TRIG_PIN, HIGH);
   delayMicroseconds(10);
   digitalWrite(TRIG_PIN, LOW);
      
   const unsigned long duration= pulseIn(ECHO_PIN, HIGH);
   int distance = duration/29.1/2;
   if(duration==0){
     Serial.println("Warning: no pulse from sensor");
   } else {
    Serial.write(distance);
    Serial.flush();
  }

  delay(50); // give the Arduino some breathing room.
}

