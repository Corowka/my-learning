#pragma once
#include<iostream>
#include<string>
#include<vector>
#include<cmath>

class CBC
{
private:

	int block_size_;
	std::string v_init_;
	std::vector<int> encode_matrix_;
	std::vector<int> decode_matrix_;

public:

	CBC();

	CBC(int block_size, std::string v_init);

	void INFO();

	void SET_BLOCK_SIZE(int block_size);

	void SET_VECTOR(std::string v_init);

	std::string ENCODE(std::string message);

	std::string DECODE(std::string message);

	std::string ENCODE_WITH_MATRIX(std::string block);

	std::string DECODE_WITH_MATRIX(std::string block);

	static std::vector<std::string> SPLIT_TO_BLOCKS(std::string message, int block_size);

	static std::string XOR_BLOCKS(std::string v, std::string block);

	static std::vector<int> STRING_TO_INT_VECTOR(std::string str);

	static std::string INT_VECTOR_TO_STRING(std::vector<int> vec);

	static std::vector<int> SQUARE_MATRIX_MULT(std::vector<int> m1, std::vector<int> m2);
};

