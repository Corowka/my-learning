#include "Weapon.h"

// Конструкторы 
Weapon::Weapon() { damage = 10; accuracy = 0.33; }
Weapon::Weapon(int damage, float accuracy) { this->damage = damage; this->accuracy = accuracy; }
Weapon::Weapon(const Weapon& obj) { this->damage = obj.damage; this->accuracy = obj.accuracy; }
// Методы
void Weapon::TO_SET_DAMAGE(int damage) { this->damage = damage; }
void Weapon::TO_SET_ACCURACY(int accuracy) { this->accuracy = accuracy; }
void Weapon::TO_SET(int damage, float accuracy) { this->damage = damage; this->accuracy = accuracy; }
void Weapon::TO_SHOW() { cout << damage << ' ' << accuracy; }
int Weapon::TO_GET_VAL_DAMAGE() { return damage; }
int& Weapon::TO_GET_VAR_DAMAGE() { return damage; }
float Weapon::TO_GET_VAL_ACCURACY() { return accuracy; }
float& Weapon::TO_GET_VAR_ACCURACY() { return accuracy; }
int Weapon::SHOOT() { if (float(rand() % 100) / 100 >= accuracy) return damage; }