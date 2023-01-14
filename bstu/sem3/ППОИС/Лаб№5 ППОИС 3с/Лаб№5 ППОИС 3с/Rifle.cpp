#include "Rifle.h"

// Конструкторы
Rifle::Rifle() : Pistol() { length = 0; }
Rifle::Rifle(int damage, float accuracy) : Pistol(damage, accuracy) { length = 0; }
Rifle::Rifle(const Rifle& obj) : Pistol(obj) { length = 0; }
// Методы
void Rifle::ADD_LENGTH(int l) { length = l; }
void Rifle::REMOVE_LENGTH(int l) { length = l; }
int Rifle::SHOOT() {
	double r = double(rand() % 100) / 100;
	r += (is_scope) ? 0.1 : 0;
	r += length * 0.001;
	cout << "Rifle shot " << r << ' ' << accuracy << endl;
	if (r >= accuracy)
		return damage;
	return 0;
}