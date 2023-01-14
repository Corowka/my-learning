#pragma once
#include <iostream>
#include <cmath>

using std::cout;
using std::endl;

class Line
{
private:
	int l;
public:
	// Конструкторы	
	Line();
	Line(int l);
	Line(const Line& obj);
	// Методы
	void TO_SET(int l);
	void TO_SHOW();
	int TO_GET_VAL();
	int& TO_GET_VAR();
	Line& operator = (const Line& obj);
	friend void EXPAND(Line& obj, int n);
	friend void SHORTEN(Line& obj, int n);
	friend void STACK_LINES(Line& obj1, Line& obj2);
};
