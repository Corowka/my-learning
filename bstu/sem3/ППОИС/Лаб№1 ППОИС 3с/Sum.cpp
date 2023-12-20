#include "Sum.h"

Sum::Sum() : a(0), b(0) {}
Sum::Sum(int a, int b, int c) : a(a), b(b), c(c) {}
Sum::Sum(const Sum& sum) : a(sum.a), b(sum.b) {}
void Sum::TO_SET_A(int a) { this->a = a; }
void Sum::TO_SET_B(int b) { this->b = b; }
void Sum::TO_SET_C(int c) { this->c = c; }
int Sum::TO_GET_A() { return a; }
int Sum::TO_GET_B() { return b; }
int Sum::TO_GET_C() { return c; }
void Sum::TO_SHOW_A() { cout << a << endl; }
void Sum::TO_SHOW_B() { cout << b << endl; }
void Sum::TO_SHOW_C() { cout << c << endl; }
void Sum::TO_SHOW_SUM() { cout << a + b << endl; }
bool Sum::TO_COMPARE() { return a == b && b == c; }
bool Sum::TO_COMPARE(char fst, char snd) {
	if (fst == 'a' && snd == 'b') return a == b;
	if (fst == 'a' && snd == 'c') return a == c;
	if (fst == 'b' && snd == 'c') return b == c;
}
bool Sum::TO_COMPARE(int fst, int snd) {
	if (fst == 1 && snd == 2) return a == b;
	if (fst == 1 && snd == 3) return a == c;
	if (fst == 2 && snd == 3) return b == c;
}
Sum Sum::operator = (const Sum& other) { this->a = other.a; this->b = other.b; return *this; }
bool Sum::operator == (const Sum& other) { if (this->a + this->b == other.a + other.b) return 1; return 0; }
Sum Sum::operator + (const Sum& other) { this->a += other.a; this->b += other.b; return *this; }