#pragma once
#include "Weapon.h"

class Pistol : public Weapon
{
protected:
	bool is_scope;
public:
	// ������������ 
	Pistol();
	Pistol(int damage, float accuracy);
	Pistol(const Pistol& obj);
	// ������;
	void ADD_SCOPE();
	void REMOVE_SCOPE();
	int SHOOT();
};

