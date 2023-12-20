#pragma once

#include <iostream>
using std::cout;
using std::endl;
using std::string;
using std::ostream;

class User
{
private:
	string name;
	double balance;
	int options[3];
public: 
	User();
	User(string name);
	User(string name, double balance, int* options);
	User(const User& user);
	void TO_SET_NAME(string name);
	void TO_SET_BALANCE(double balance);
	void TO_SET_OPTIONS(int* options);
	string TO_GET_NAME();
	double TO_GET_BALANCE();
	int* TO_GET_OPTIONS();
	void TO_SHOW_NAME();
	void TO_SHOW_BALANCE();
	void TO_SHOW_OPTIONS();
	void EARN(int cost);
	void EARN(double cost);
	void EARN(double cost, int incr);
	User operator = (const User& other);
	bool operator == (const User& other);
	User operator+ (const User& other);
};


