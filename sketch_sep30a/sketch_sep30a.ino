//String counter="0";
//unsigned long ta=0;
//int inicio=0;
//
//
//void setup() {
//Serial.begin(9600);
//}
//
//void loop() {
//  
//while(Serial.available()>0){
//  counter=Serial.readString();
//  while(counter=="si"){
//    Serial.println(inicio++);
//    delay(500);
//  }
//  
//}
//  
//
//}
//
int inicio=0;


void setup() {
Serial.begin(9600);
}

void loop() {
  
    digitalWrite(13 , HIGH);
    Serial.println(inicio++);
    delay(500);
  }
