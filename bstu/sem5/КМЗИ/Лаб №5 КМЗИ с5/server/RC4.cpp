#include "RC4.h"

void RC4::shuffle(int keylen) {
	this->s = new int[256];
	for (int i = 0; i < 256; i++) {
		this->s[i] = i;
	}
	int j = 0;
	for (int i = 0; i < 256; i++) {
		j = (j + this->s[i] + this->keys[i % keylen]) % 256;
		int temp = this->s[i];
		this->s[i] = this->s[j];
		this->s[j] = temp;
	}
}

int RC4::pseudoRandomByte() {
	this->i = (this->i + 1) % 256;
	this->j = (this->j + this->s[this->i]) % 256;
	int temp = this->s[this->i];
	this->s[this->i] = this->s[this->j];
	this->s[this->j] = temp;
	int t = (this->s[this->i] + this->s[this->j]) % 256;
	return this->s[t];
}

string RC4::crypt(string str, string key) {
	this->i = 0;
	this->j = 0;
	this->keys = new int[key.size()];
	for (int i = 0; i < key.size(); i++) {
		this->keys[i] = (int)key[i] - '0';
	}
	this->shuffle(key.size());
	int* message = new int[str.size()];
	for (int i = 0; i < str.size(); i++) {
		int rand = this->pseudoRandomByte();
		message[i] = (int)str[i] ^ rand;
	} 
	string res = "";
	for (int i = 0; i < str.size(); i++) {
		res += (char)message[i];
	}
	return res;
}
