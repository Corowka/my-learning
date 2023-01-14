#include "User.h"
User::User() {
	name = "guest";
	balance = 0;
	options[0] = 90;
	options[1] = 60;
	options[2] = 90;
}
User::User(string name) {
	this->name = name;
	balance = 0;
	options[0] = 90;
	options[1] = 60;
	options[2] = 90;
}
User::User(string name, double balance, int* options) {
	this->name = name;
	this->balance = balance;
	this->options[0] = options[0];
	this->options[1] = options[1];
	this->options[2] = options[2];
}
User::User(const User& user) {
	this->name = user.name;
	this->balance = user.balance;
	this->options[0] = user.options[0];
	this->options[1] = user.options[1];
	this->options[2] = user.options[2];
}
void User::TO_SET_NAME(string name) {
	this->name = name;
}
void User::TO_SET_BALANCE(double balance) {
	this->balance = balance;
}
void User::TO_SET_OPTIONS(int* options) {
	this->options[0] = options[0];
	this->options[1] = options[1];
	this->options[2] = options[2];
}
string User::TO_GET_NAME() { return name; }
double User::TO_GET_BALANCE() { return balance; }
int* User::TO_GET_OPTIONS() { return options; }
void User::TO_SHOW_NAME() { cout << name << endl; }
void User::TO_SHOW_BALANCE() { cout << balance << endl; }
void User::TO_SHOW_OPTIONS() { cout << options[0] << ' ' << options[1] << ' ' << options[2] << endl; }
void User::EARN(int cost) { balance += cost; }
void User::EARN(double cost) { balance += cost; }
void User::EARN(double cost, int incr) { balance += cost * incr; }
User User::operator = (const User& other) {
	this->name = other.name;
	this->balance = other.balance;
	this->options[0] = other.options[0];
	this->options[1] = other.options[1];
	this->options[2] = other.options[2];
	return *this;
}
bool User::operator == (const User& other) {
	if (this->name != other.name ||
		this->balance != other.balance ||
		this->options[0] != other.options[0] ||
		this->options[1] != other.options[1] ||
		this->options[2] != other.options[2])
		return false;
	return true;
}
User User::operator + (const User& other) {
	this->options[0] = (this->options[0] + other.options[0]) / 2;
	this->options[1] = (this->options[1] + other.options[1]) / 2;
	this->options[2] = (this->options[2] + other.options[2]) / 2;
	return *this;
}
