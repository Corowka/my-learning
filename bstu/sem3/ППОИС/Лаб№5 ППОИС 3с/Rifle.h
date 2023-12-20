#pragma once
#include "Pistol.h"

class Rifle : public Pistol
{
private:
	int length;
public:
	// ������������ 
	Rifle();
	Rifle(int damage, float accuracy);
	Rifle(const Rifle& obj);
	// ������
	void ADD_LENGTH(int l);
	void REMOVE_LENGTH(int l);
	int SHOOT();
};

