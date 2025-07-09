#pragma once
#include <iostream>
#include <cmath>
#include <iomanip>
#include <Windows.h>
#include <algorithm>


// ������� 2 �������� 
int recursion1(int fst, int snd, int k);
int recursion2(int n, int k);

// ������� 4 ������������
void Print(int* a, int n);
bool NextSet(int* a, int n);

// ������� 5 ������������
int gray_code(int n);
int count_bits(int n);
void all_combinations(int n, int k);