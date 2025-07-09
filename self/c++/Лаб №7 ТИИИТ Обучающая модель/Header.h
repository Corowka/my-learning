#pragma once
#include <iostream>
#include <fstream>
#include <cmath>
#include <iomanip>
#include <Windows.h>
#include <ctime>

void ReadData(double** (&x), double* (&y), int& n);
void CalculateY(double* (&_y), double** x, double w0, double w1, double w2, double w3, double n);
double MSE(double* y, double* _y, int n);