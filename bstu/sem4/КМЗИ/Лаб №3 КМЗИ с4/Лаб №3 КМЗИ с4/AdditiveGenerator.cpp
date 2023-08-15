#include "AdditiveGenerator.h"

AdditiveGenerator::AdditiveGenerator(const int& n) : n_(n) {}

int AdditiveGenerator::f(const int& x_prev, const int& x_cur) {
	return (x_cur + x_prev) % n_;
}

cpp_int AdditiveGenerator::generate(int init1, int init2, unsigned long long size) {
	std::string temp = "";
	int prev = init1;
	int cur = init2;
	while (temp.size() < size) {
		int next = f(prev, cur);
		prev = cur;
		cur = next;
		temp += std::to_string(next);
	}
	return(cpp_int(temp.substr(0, size)));
}

int AdditiveGenerator::calc_period() {
	int a = 1;
	int b = 2;
	int start = f(a, b);
	int lenght = 0;
	int prev = b;
	int cur = start;
	do {
		int next = f(prev, cur);
		prev = cur;
		cur = next;
		lenght++;
	} while (start != cur);
	return lenght;
}

float AdditiveGenerator::hist(const int& size) {
	int* nums = new int[size];
	int prev = 1;
	int cur = 2;
	for (int i = 0; i < size; i++) {
		int next = f(prev, cur);
		prev = cur;
		cur = next;
		nums[i] = next;
	}
	std::map<int, int> histogram;
	for (int i = 0; i < size; i++) {
		histogram[nums[i]]++;
	}
	float mean = 0;
	for (auto it = histogram.begin(); it != histogram.end(); ++it) {
		std::cout << std::setw(3) << it->first << ":" << std::setw(std::to_string(size).size()) << it->second << ' ';
		for (int i = 0; i < it->second; i++)
			std::cout << '#';
		std::cout << std::endl;
		mean += it->second;
	}
	mean /= histogram.size();
	return mean;
}

