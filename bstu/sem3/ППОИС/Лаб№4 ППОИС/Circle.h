#pragma once
#include <iostream>
#include <cmath>
#define pi 3.1415

using std::cout;
using std::endl;

class Circle
{
private:
	int r;
public:
	// Конструкторы	
	Circle();
	Circle(int r);
	Circle(const Circle& obj);
	// Методы
	void TO_SET(int r);
	void TO_SHOW();
	int TO_GET_VAL();
	int& TO_GET_VAR();
	float SQUARE();
	float LENGTH();
	Circle& operator = (const Circle& obj);
	friend float SECTOR(Circle& obj, int n);
	friend float SEGMENT(Circle& obj, int n);
	friend void DOUBLE(Circle& obj);
};