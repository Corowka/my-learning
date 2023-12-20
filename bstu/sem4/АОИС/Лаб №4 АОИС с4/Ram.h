#pragma once
#include <iostream>
#include <string>
#include <iomanip>
#include <ctime>

using namespace std;

class Ram {

private:

	int mem_size_;
	int* mem_;

public:

	Ram(int mem_size);

	~Ram();

	int LOAD_AMOUNT();

	void STATUS();

	void RANDOM_FILL(int size);

	void INSERT(int data);

	int SEARCH(int data);
		
};

