#pragma once
#include <iostream>
#include <iomanip>
#include <string>
#include <cmath>
#include <ctime>
#include <fstream>

// Функции 
double Parsing(std::string StrValue);
void ReadData(double** (&Data), int amount, int columns);
double KNN(double* X, double** x, int amount, int options); 
double MSE(double* y, double* _y, int amount);
double* LinearRegression(double** X, double** x, int data_amount, int amount, int options);