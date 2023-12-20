#include "Square.h"

// Конструкторы	
Square::Square() { a = 0; }
Square::Square(int l) { this->a = l; }
Square::Square(const Square& obj) { this->a = obj.a; }
// Методы
void Square::TO_SET(int a) { this->a = a; }
void Square::TO_SHOW() { cout << a << endl; }
int Square::TO_GET_VAL() { return a; }
int& Square::TO_GET_VAR() { return a; }
float Square::SQUARE() { return a * a; }
float Square::PERIMETER() { return a * 4; }
Square& Square::operator = (const Square& obj) { this->a = obj.a; return *this; }
// Friend 
void INCREASE(Square& obj, int n) { obj.a *= n; }
void DECREASE(Square& obj, int n) { obj.a /= n; }
void STACK_SQUARES(Square& obj1, Square& obj2) { obj1.a = sqrt(obj1.SQUARE() + obj2.SQUARE()); }
