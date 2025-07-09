#pragma once

#include <iostream>
#include <cmath>
#include <iomanip>
#include <Windows.h>

using namespace std;

struct Agent {

	Agent() {}

	double m;
	double SC;
	double R;
	double HA;
	double A;

	double RT;
	unsigned State;

	~Agent() {}
};

struct Environment {

	Environment() {}

	double AP;
	double M;
	double T;

	~Environment() {}
};

struct Virus {

	Virus() {}

	double I;
	double DR;

	~Virus() {}
};

// Определение функций
extern double N(double m, double sigma);
extern double U(double c, double d);
extern double E(double lambda);
