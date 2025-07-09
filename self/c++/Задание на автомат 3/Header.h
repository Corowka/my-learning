#pragma once

#include <iostream>
#include <iomanip>
#include <cmath>
#include <string>
#include <fstream>

// Функции
void ReadData(double** (&x), int* (&y), int size, std::string filename);
double Parsing(std::string StrValue);
void NormalizeData(double** (&x), double** (&X), int size1, int size2);
void CalculateDistance(double** (&x), int* (&y), double* (&EuclidDist), double** (&X), int size, int number);

