#include <iostream>
#include <string>
#include <cmath>

using std::cout;
using std::endl;
using std::string;

class Boots {
private:
	int left_boot;
	int& right_boot = left_boot;
public:	
	// Конструкторы
	Boots();
	Boots(int boot);
	Boots(const Boots& obj);
	// Методы 
	void TEST(int boot);
	int& TO_GET_VAR();
	void TO_SET_VAR(int& boot);
};

// Конструкторы
Boots::Boots() { left_boot = 41; }
Boots::Boots(int boot) { left_boot = boot; }
Boots::Boots(const Boots& obj) { left_boot = obj.left_boot; }
// Методы
void Boots::TEST(int boot) {
	left_boot += boot;
	cout << left_boot << ' ' << right_boot << endl;
	if (left_boot == right_boot) cout << "no difference" << endl;
	else cout << "they are different" << endl;
	right_boot -= boot;
	cout << left_boot << ' ' << right_boot << endl;
	if (left_boot == right_boot) cout << "no difference" << endl;
	else cout << "they are different" << endl;
}
int& Boots::TO_GET_VAR() { return left_boot; }
void Boots::TO_SET_VAR(int& boot) { right_boot = boot; }

class Gloves {
private:
	string left_glove;
	string& right_glove = left_glove;
public:
	// Конструкторы
	Gloves();
	Gloves(string glove);
	Gloves(const Gloves& obj);
	// Методы 
	void TEST(string glove);
	string& TO_GET_VAR();
	void TO_SET_VAR(string& glove);
};

// Конструкторы
Gloves::Gloves() { left_glove = "M"; }
Gloves::Gloves(string glove) { left_glove = glove; }
Gloves::Gloves(const Gloves& obj) { left_glove = obj.left_glove; }
// Методы
void Gloves::TEST(string glove) {
	left_glove = glove;
	cout << left_glove << ' ' << right_glove << endl;
	if (left_glove == right_glove) cout << "no difference" << endl;
	else cout << "they are different" << endl;
	right_glove = "XL";
	cout << left_glove << ' ' << right_glove << endl;
	if (left_glove == right_glove) cout << "no difference" << endl;
	else cout << "they are different" << endl;
}
string& Gloves::TO_GET_VAR() { return left_glove; }
void Gloves::TO_SET_VAR(string& glove) { right_glove = glove; }

class Twix {
private:
	unsigned long long int leftStickOfTwix;
	unsigned long long int& rightStickOfTwix = leftStickOfTwix;
public:
	// Конструкторы
	Twix();
	Twix(unsigned long long int bar);
	Twix(const Twix& obj);
	// Методы 
	int WHICH_IS_BETTER();
	unsigned long long int& TO_GET_VAR();
	void TO_SET_VAR(unsigned long long int& bar);
};

// Конструкторы
Twix::Twix() { leftStickOfTwix = 2348832478923479; }
Twix::Twix(unsigned long long int bar) { leftStickOfTwix = bar; }
Twix::Twix(const Twix& obj) { leftStickOfTwix = obj.leftStickOfTwix; }
// Методы 
int Twix::WHICH_IS_BETTER() { return ((leftStickOfTwix == rightStickOfTwix) ? 0 : (leftStickOfTwix > rightStickOfTwix) ? 1 : 2); }
unsigned long long int& Twix::TO_GET_VAR() { return leftStickOfTwix; }
void Twix::TO_SET_VAR(unsigned long long int &bar) { rightStickOfTwix = bar; }

int main() {
	Boots Adidas(42);
	int Adidas_boot = 1;
	Adidas.TO_SET_VAR(Adidas_boot);
	Adidas_boot = Adidas.TO_GET_VAR();
	Adidas.TEST(45);

	Gloves Gucci;
	string Gucci_gloves = "S";
	Gucci.TO_SET_VAR(Gucci_gloves);
	Gucci_gloves = Gucci.TO_GET_VAR();
	Gucci.TEST("M");

	Twix test(3405940358390583405);
	unsigned long long int Twix_bar = 2343214135245426321;
	test.TO_SET_VAR(Twix_bar);
	Twix_bar = test.TO_GET_VAR();
	test.WHICH_IS_BETTER();
}