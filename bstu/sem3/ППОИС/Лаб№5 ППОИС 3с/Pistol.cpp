#include "Pistol.h"

// Конструкторы
Pistol::Pistol() : Weapon() { is_scope = false; }
Pistol::Pistol(int damage, float accuracy) : Weapon(damage, accuracy) { is_scope = false; }
Pistol::Pistol(const Pistol& obj) : Weapon(obj) { this->is_scope = obj.is_scope; }
// Методы
void Pistol::ADD_SCOPE() { is_scope = true; }
void Pistol::REMOVE_SCOPE() { is_scope = false; }
int Pistol::SHOOT() {
	double r = double(rand() % 100) / 100;
	r += (is_scope) ? 0.1 : 0; 
	cout << "Pistol shot " << r << ' ' << accuracy << endl;
	if (r >= accuracy)
		return damage;
	return 0;
}