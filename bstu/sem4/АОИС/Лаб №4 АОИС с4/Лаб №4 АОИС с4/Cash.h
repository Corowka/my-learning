#pragma once
#include <iostream>
#include <string>
#include <iomanip>
#include <bitset>
#include <ctime>
#include <chrono>
#include <Windows.h>

using namespace std;

string int2bitstr(int data);
int bitstr2int(string bits);
int search(int item, int arr[], int size);

class Cash {

private:

	int n_block_;
	int n_;
	int m_;
	int*** mem_;
	int*** flag_;

public:

	Cash();

	~Cash();

	int GET_TIME();

	void STATUS();

	void INSERT(int data);

	int SEARCH(int data);

};

