#include "Line.h"

// Конструкторы	
Line::Line() { l = 0; }
Line::Line(int l) { this->l = l; }
Line::Line(const Line& obj) { this->l = obj.l; }
// Методы
void Line::TO_SET(int l) { this->l = l; }
void Line::TO_SHOW() { cout << l << endl; }
int Line::TO_GET_VAL() { return l; }
int& Line::TO_GET_VAR() { return l; }
Line& Line::operator = (const Line& obj) { this->l = obj.l; return *this; }
// Friend 
void EXPAND(Line& obj, int n) { obj.l *= n; }
void SHORTEN(Line& obj, int n) { obj.l /= n; }
void STACK_LINES(Line& obj1, Line& obj2) { obj1.l = obj1.l + obj2.l; }
