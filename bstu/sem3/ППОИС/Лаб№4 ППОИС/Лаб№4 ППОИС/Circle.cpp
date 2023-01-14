#include "Circle.h"

// Конструкторы	
Circle::Circle() { r = 1; }
Circle::Circle(int r) { this->r = r; }
Circle::Circle(const Circle& obj) { this->r = obj.r; }
// Методы
void Circle::TO_SET(int r) { this->r = r; }
void Circle::TO_SHOW() { cout << r << endl; }
int Circle::TO_GET_VAL() { return r; }
int& Circle::TO_GET_VAR() { return r; }
float Circle::SQUARE() { return pi * r * r; }
float Circle::LENGTH() { return 2 * pi * r; }
Circle& Circle::operator = (const Circle& obj) { this->r = obj.r; return* this; }
// Friend
float SECTOR(Circle& obj, int n) { return pi * pow(obj.r, 2) * n / 180; }
float SEGMENT(Circle& obj, int n) { return 0.5 * obj.r * (pi * n / 180 - sin(180 / pi * n)); }
void DOUBLE(Circle& obj) { obj.r *= sqrt(2); }