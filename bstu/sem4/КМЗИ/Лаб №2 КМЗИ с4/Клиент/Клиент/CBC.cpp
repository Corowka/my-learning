#include "CBC.h"

CBC::CBC() {
	block_size_ = 0;
	v_init_ = "";
	encode_matrix_ = {  2,  1,  3,  2  };
	decode_matrix_ = {  2, -1, -3,  2  };
}

CBC::CBC(int block_size, std::string v_init) : CBC() {
	SET_BLOCK_SIZE(block_size);
	SET_VECTOR(v_init);
}

void CBC::SET_BLOCK_SIZE(int block_size) {
	block_size_ = block_size;
}

void CBC::SET_VECTOR(std::string v_init) {
	if (v_init.size() == block_size_)
		v_init_ = v_init;
}

void CBC::INFO() {
	std::cout << "BLOCK SIZE:  " << block_size_ << std::endl;
	std::cout << "INIT VECTOR: " << v_init_ << std::endl;
	std::cout << "ENCODE MATRIX:";
	for (int i = 0; i < 4; i++) {
		if (i % 2 == 0)
			std::cout << std::endl;
		std::cout << encode_matrix_[i] << ' ';
	}
	std::cout << "\nDECODE MATRIX:";
	for (int i = 0; i < 4; i++) {
		if (i % 2 == 0)
			std::cout << std::endl;
		std::cout << decode_matrix_[i] << ' ';
	}
	std::cout << std::endl;
}

std::string CBC::ENCODE(std::string message) {
	std::string encoded_message = "";
	std::vector<std::string> blocks = SPLIT_TO_BLOCKS(message, block_size_);
	int n = blocks.size();
	std::string encoded_prev = v_init_;
 	for (int i = 0; i < n; i++) {
		std::string xor_res = XOR_BLOCKS(encoded_prev, blocks[i]);
		std::string encode_res = ENCODE_WITH_MATRIX(xor_res);
		encoded_prev = encode_res;
		encoded_message += encode_res;
	}
	return encoded_message;
}

std::string CBC::DECODE(std::string message) {
	std::string decoded_message = "";
	std::vector<std::string> blocks = SPLIT_TO_BLOCKS(message, block_size_);
	int n = blocks.size();
	std::string encoded_prev = v_init_;
	for (int i = 0; i < n; i++) {
		std::string decode_res = DECODE_WITH_MATRIX(blocks[i]);
		std::string xor_res = XOR_BLOCKS(encoded_prev, decode_res);
		encoded_prev = blocks[i];
		decoded_message += xor_res;
	}
	return decoded_message;
}

std::string CBC::ENCODE_WITH_MATRIX(std::string block) {
	std::vector<int> v_block = STRING_TO_INT_VECTOR(block);
	std::vector<int> m1; std::copy(v_block.begin(), v_block.begin() + 4, std::back_inserter(m1));
	std::vector<int> m2; std::copy(v_block.begin() + 4, v_block.end() - 1, std::back_inserter(m2));
	m1 = SQUARE_MATRIX_MULT(encode_matrix_, m1);
	m2 = SQUARE_MATRIX_MULT(encode_matrix_, m2);
	std::vector<int> encoded_v_block = m1; 
	std::copy(m2.begin(), m2.end(), std::back_inserter(encoded_v_block));
	encoded_v_block.push_back(v_block[block_size_ - 1]);
	return INT_VECTOR_TO_STRING(encoded_v_block);
}

std::string CBC::DECODE_WITH_MATRIX(std::string block) {
	std::vector<int> v_block = STRING_TO_INT_VECTOR(block);
	std::vector<int> m1; std::copy(v_block.begin(), v_block.begin() + 4, std::back_inserter(m1));
	std::vector<int> m2; std::copy(v_block.begin() + 4, v_block.end() - 1, std::back_inserter(m2));
	m1 = SQUARE_MATRIX_MULT(decode_matrix_, m1);
	m2 = SQUARE_MATRIX_MULT(decode_matrix_, m2);
	std::vector<int> decoded_v_block = m1;
	std::copy(m2.begin(), m2.end(), std::back_inserter(decoded_v_block));
	decoded_v_block.push_back(v_block[block_size_ - 1]);
	return INT_VECTOR_TO_STRING(decoded_v_block);
}

std::vector<std::string> CBC::SPLIT_TO_BLOCKS(std::string message, int block_size) {
	while (message.size() % block_size != 0) message += (char)0;
	std::vector<std::string> blocks(message.size() / block_size);
	for (int i = 0; i < blocks.size(); i++)
		blocks[i] = message.substr(i * block_size, block_size);
	return blocks;
}

std::string CBC::XOR_BLOCKS(std::string v, std::string block) {
	std::string temp = "";
	for (int i = 0; i < block.size(); i++)
		temp += (char)((int)v[i] ^ (int)block[i]);
	return temp;
}

std::vector<int> CBC::STRING_TO_INT_VECTOR(std::string str) {
	int size = str.size();
	std::vector<int> res(size);
	for (int i = 0; i < size; i++) 
		res[i] = (int)str[i];
	return res;
}

std::string CBC::INT_VECTOR_TO_STRING(std::vector<int> vec) {
	int size = vec.size();
	std::string res = "";
	for (int i = 0; i < size; i++)
		res += (char)vec[i];
	return res;
}

std::vector<int> CBC::SQUARE_MATRIX_MULT(std::vector<int> m1, std::vector<int> m2) {
	std::vector<int> res(4); 
	for(int i = 0; i < 2; i++) 
		for (int j = 0; j < 2; j++) 
			for (int k = 0; k < 2; k++) 
				res[i * 2 + j] += m1[i * 2 + k] * m2[k * 2 + j];
	return res;
}