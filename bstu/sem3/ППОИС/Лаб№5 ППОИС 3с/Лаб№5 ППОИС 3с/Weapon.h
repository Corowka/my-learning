#pragma once
#include <iostream>
#include <ctime>

using std::cout;
using std::endl;

class Weapon
{
protected:
	int damage;
	float accuracy;
public:
	// Конструкторы 
	Weapon();
	Weapon(int damage, float accuracy);
	Weapon(const Weapon& obj);
	// Методы
	void TO_SET_DAMAGE(int damage);
	void TO_SET_ACCURACY(int accuracy);
	void TO_SET(int damage, float accuracy);
	void TO_SHOW();
	int TO_GET_VAL_DAMAGE();
	int& TO_GET_VAR_DAMAGE();
	float TO_GET_VAL_ACCURACY();
	float& TO_GET_VAR_ACCURACY();
	int SHOOT();
};

