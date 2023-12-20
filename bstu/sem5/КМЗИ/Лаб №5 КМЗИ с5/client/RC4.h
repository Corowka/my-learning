#pragma once
#include <string>
#include <iostream>

using namespace std;
 
class RC4
{
private:

	int* s;
	int* keys;
	int i;
	int j;

	void shuffle(int keylen);

	int pseudoRandomByte();

public: 

	string crypt(string str, string key);

};