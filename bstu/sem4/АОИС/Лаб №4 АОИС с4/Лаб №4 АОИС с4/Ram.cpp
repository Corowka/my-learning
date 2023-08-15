#include "Ram.h"

Ram::Ram(int mem_size) {
	mem_size_ = mem_size;
	mem_ = new int[mem_size_];
	for (int i = 0; i < mem_size_; i++)
		mem_[i] = -1;
}

Ram::~Ram() {
	delete[] mem_;
}

int Ram::LOAD_AMOUNT() {
	int bytes = 0;
	for (int i = 0; i < mem_size_; i++)
		if (mem_[i] != 0)
			bytes++;
	return bytes;
}

void Ram::STATUS() {
	for (int i = 0; i < 134; i++) cout << '=';
	cout << endl << setw(4) << "RAM" << setw(5) << ' ';
	for (int i = 0; i < (int)LOAD_AMOUNT() * 126 / mem_size_ - 1; i++)
		cout << '#';
	cout << endl;
	for (int i = 0; i < 134; i++) cout << '=';
	for (int i = 0; i < mem_size_; i++) {
		if (i % 16 == 0) cout << endl << setw(6) << ' ';
		if (mem_[i] != -1) cout << setw(8) << mem_[i];
		else cout << setw(8) << ' ';
	}
	cout << endl;
	for (int i = 0; i < 134; i++) cout << '=';
	cout << endl;
}

void Ram::RANDOM_FILL(int size) {
	size = (size > mem_size_) ? mem_size_ : size;
	for (int i = 0; i < size; i++)
		mem_[i] = rand() % (1024 - 32) + 32;
}

void Ram::INSERT(int data) {
	if (SEARCH(data) != -1)
		return;
	for (int i = 0; i < mem_size_; i++)
		if (mem_[i] == -1) {
			mem_[i] = data;
			return;
		}
}

int Ram::SEARCH(int data) {
	for (int i = 0; i < mem_size_; i++)
		if (mem_[i] == data)
			return i;
	return -1;
}