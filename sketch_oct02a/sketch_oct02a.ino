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

float getHeight() {
   digitalWrite(TRIG_PIN, LOW);
   delayMicroseconds(2);
   digitalWrite(TRIG_PIN, HIGH);
   delayMicroseconds(10);
   digitalWrite(TRIG_PIN, LOW);
      
   const unsigned long duration = pulseIn(ECHO_PIN, HIGH);
   return duration/29.1/2;
}

void down() {
  digitalWrite(downPin, 0);
}

void up() {
  digitalWrite(upPin, 0);
}

void release() {
  digitalWrite(upPin, 1);
  digitalWrite(downPin, 1);
}

float getMinHeight() {
  float prevHeight = getHeight();
  float delta = 10;
  down();
  delay(2000);
  
  while (delta >= 1) {
    delay(1500);
    float height = getHeight();
    delta = prevHeight - height;
    prevHeight = height;
  }

  release();
  
  return getHeight();
}

float getMaxHeight() {
  float prevHeight = getHeight();
  float delta = 10;
  up();
  delay(2000);
  
  while (delta >= 1) {
    delay(1500);
    float height = getHeight();
    delta = height - prevHeight;
    prevHeight = height;
    Serial.println(delta);
  }

  release();
  
  return getHeight();
}


bool isCalibration = false;
void loop() {
  if (Serial.available()) {
    char inChar = (char)Serial.read();
    
    if (prevChar != inChar) {
      if (inChar == 'U') {
        up();
        prevChar = 'U';
      } else if (inChar == 'D') {
        down();
        prevChar = 'D';
      } else if (inChar == 'N') {
        release();
        prevChar = 'N';
      } 
    }  
  }

  if (!isCalibration) {
    getMinHeight();
    getMaxHeight();
//    release();
//    Serial.println(getMaxHeight());
//    up();
    
    isCalibration = true;
  }
  
//   float distance = getHeight();
//   Serial.print("distance: ");
//   Serial.println(distance);
//   Serial.print("⌾");

  delay(50); // give the Arduino some breathing room.
}

