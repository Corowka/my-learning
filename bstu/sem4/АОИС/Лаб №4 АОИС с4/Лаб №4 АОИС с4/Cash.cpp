#include "Cash.h"

auto start = std::chrono::steady_clock::now();

// BITS

string int2bitstr(int data) {
	return bitset<10>(data).to_string();
}

int bitstr2int(string bits) {
	return (int)bitset<10>(bits).to_ulong();
}

// ARRAY

int search(int item, int arr[], int size) {
	for (int i = 0; i < size; i++)
		if (arr[i] == item)
			return i;
	return -1;
}

int search_min(int arr[], int size) {
	int min_idx = 0;
	for (int i = 1; i < size; i++)
		if (arr[i] < arr[min_idx])
			min_idx = i;
	return min_idx;
}

// CASH

Cash::Cash() {
	n_block_ = 8;
	n_ = 4;
	m_ = 2;
	mem_ = new int** [n_block_];
	flag_ = new int** [n_block_];
	for (int i = 0; i < n_block_; i++) {
		mem_[i] = new int* [n_];
		flag_[i] = new int* [n_];
		for (int j = 0; j < n_; j++) {
			mem_[i][j] = new int [m_];
			flag_[i][j] = new int[m_];
			for (int k = 0; k < m_; k++) {
				mem_[i][j][k] = -1;
				flag_[i][j][k] = -1;
			}
		}
	}
}

Cash::~Cash() {
	for (int i = 0; i < n_block_; i++) {
		for (int j = 0; j < n_; j++) {
			delete[] mem_[i][j];
			delete[] flag_[i][j];
		}
		delete[] mem_[i];
		delete[] flag_[i];
	}
	delete[] mem_;
	delete[] flag_;
}

int Cash::GET_TIME() {
	auto now = chrono::steady_clock::now();
	return (int)chrono::duration_cast<chrono::milliseconds>(now - start).count();
}

void Cash::STATUS() {
	for (int i = 0; i < 6 + m_ * 4; i++) cout << '=';
	cout << endl << setw(4) << "BLK" << setw(2) << ' ';
	for (int i = 0; i < m_; i++)
		cout << setw(4) << i;
	cout << endl;
	for (int i = 0; i < 6 + m_ * 4; i++) cout << '=';
	for (int i = 0; i < n_block_; i++) {
		cout << endl << setw(3) << i << ':' << setw(2) << '|';
		for (int j = 0; j < n_; j++) {
			if (j != 0) cout << "\n" << setw(6) << '|';
			for (int k = 0; k < m_; k++)
				if (mem_[i][j][k] != -1) cout << setw(4) << mem_[i][j][k];
				else cout << setw(4) << ' ';
		}
	}
	cout << endl;
	for (int i = 0; i < 6 + m_ * 4; i++) cout << '=';
}

void Cash::INSERT(int data) {
	if (SEARCH(data) != -1)
		return;
	string bits = int2bitstr(data);
	int tag = bitstr2int(bits.substr(0, 6));
	int blk = bitstr2int(bits.substr(7, 3));
	int pad = bitstr2int(bits.substr(9, 1));
	cout << "INDEX IN RAM: " << data << ' ' << int2bitstr(data) << endl;
	std::cout << "TAG: " << tag << ' ' << bits.substr(0, 6)
		      << " BLK: " << blk << ' ' << bits.substr(7, 3)
		      << " PAD: " << pad << ' ' << bits.substr(9, 1) << std::endl;
	// Ищем пустое место
	for (int i = 0; i < n_; i++) 
		if (mem_[blk][i][pad] == -1) {
			mem_[blk][i][pad] = tag;
			flag_[blk][i][pad] = GET_TIME();
			return;
		}
	// Если не нашли, ищем самые старые данные;
	int str = 0;
	for (int i = 1; i < n_; i++)
		if (flag_[blk][i][pad] < flag_[blk][str][pad])
			str = i;
	mem_[blk][str][pad] = tag;
	flag_[blk][str][pad] = GET_TIME();
}

int Cash::SEARCH(int data) {
	string bits = int2bitstr(data);
	int tag = bitstr2int(bits.substr(0, 6));
	int blk = bitstr2int(bits.substr(8, 2));
	int pad = bitstr2int(bits.substr(9, 1));
	for (int i = 0; i < n_; i++)
		if (mem_[blk][i][pad] == tag)
			return i;
	return -1;
}


