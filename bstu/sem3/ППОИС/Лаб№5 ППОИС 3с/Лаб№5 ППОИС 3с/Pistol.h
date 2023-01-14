#pragma once
#include "Weapon.h"

class Pistol : public Weapon
{
protected:
	bool is_scope;
public:
	// Конструкторы 
	Pistol();
	Pistol(int damage, float accuracy);
	Pistol(const Pistol& obj);
	// Методы;
	void ADD_SCOPE();
	void REMOVE_SCOPE();
	int SHOOT();
};

