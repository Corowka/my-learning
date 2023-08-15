#pragma once
#include <boost/multiprecision/cpp_int.hpp>
#include <iostream>
#include <iomanip>
#include <string>
#include <map>

using namespace boost::multiprecision;

class AdditiveGenerator 
{
private:

	int n_;

public:

	AdditiveGenerator(const int& n);

	int f(const int& x_prev, const int& x_cur);

	cpp_int generate(int init1, int init2, unsigned long long size);

	int calc_period();

	float hist(const int& size);
};

