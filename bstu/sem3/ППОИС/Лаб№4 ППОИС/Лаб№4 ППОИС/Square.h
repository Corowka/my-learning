#pragma once
#include <iostream>
#include <cmath>

using std::cout;
using std::endl;

class Square
{
private:
	int a;
public:
	// Конструкторы	
	Square();
	Square(int r);
	Square(const Square& obj);
	// Методы
	void TO_SET(int r);
	void TO_SHOW();
	int TO_GET_VAL();
	int& TO_GET_VAR();
	float SQUARE();
	float PERIMETER();
	Square& operator = (const Square& obj);
	friend void INCREASE(Square& obj, int n);
	friend void DECREASE(Square& obj, int n);
	friend void STACK_SQUARES(Square& obj1, Square& obj2);
};


