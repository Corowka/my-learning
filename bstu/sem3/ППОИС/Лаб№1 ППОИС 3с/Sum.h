#pragma once
#include <iostream>
#include <ctime>
using std::cout;
using std::endl;
using std::string;
using std::ostream;

class Sum
{
private:
	int a;
	int b;
	int c;
public:
	Sum();
	Sum(int a, int b, int c);
	Sum(const Sum& sum);
	void TO_SET_A(int a);
	void TO_SET_B(int b);
	void TO_SET_C(int c);
	int TO_GET_A();
	int TO_GET_B();
	int TO_GET_C();
	void TO_SHOW_A();
	void TO_SHOW_B();
	void TO_SHOW_C();
	void TO_SHOW_SUM();
	bool TO_COMPARE();
	bool TO_COMPARE(char fst, char snd);
	bool TO_COMPARE(int fst, int snd);
	Sum operator = (const Sum& other);
	bool operator == (const Sum& other);
	Sum operator+ (const Sum& other);
};

