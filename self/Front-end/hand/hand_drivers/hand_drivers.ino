class Pos {
  
  private:
  
  int* states;
  int n;
  
  protected:
  
  void FixRange() {
    for (int i = 0; i < this->n; i++) {
      this->states[i] = min(max(this->states[i], 0), 180); 
    }
  }
  
  public:
  
  Pos(int n): n(n), states(new int[n]) {}
  
  void setPos(String newStates) {
    int cur = -1;
    int prev = 0;
    for (int i = 0; i < this->n; i++) {
      cur = newStates.indexOf(',', prev);
      if (cur != -1) {
        this->states[i] = newStates.substring(prev, cur).toInt();
        prev = cur + 1;
      } else {
        this->states[i] = newStates.substring(prev).toInt();
        break;
      }
    }
    FixRange();
  }
  
  void Print() {
    for (int i = 0; i < this->n; i++) {
      Serial.print(String(this->states[i]) + " ");
    }
    Serial.print("\n");
  }
  
  ~Pos(){ delete[] this->states; }
};


bool IS_READING = false;
String STRING;
Pos HAND_POSITIONS(3);


inline void ProtocolSerialRead(char start, char end);


void setup() {
  Serial.begin(9600);
  HAND_POSITIONS.Print();
}

void loop() {
  if (Serial.available()) {
    ProtocolSerialRead('$', ';');
  }
}


void ProtocolSerialRead(char start, char end) {
  char n = Serial.read();
  if (n == '$') { 
    IS_READING = true; 
    STRING = ""; 
  } else if (n == ';' && IS_READING) { 
    IS_READING = false;
    HAND_POSITIONS.setPos(STRING);
    HAND_POSITIONS.Print();
  } else if (IS_READING) {
    STRING += n; 
  }
}
