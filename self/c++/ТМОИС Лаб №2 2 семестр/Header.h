#pragma once
#include <iostream>
#include <cmath>
#include <iomanip>
#include <Windows.h>
#include <algorithm>


// Задание 2 Рекурсия 
int recursion1(int fst, int snd, int k);
int recursion2(int n, int k);

// Задание 4 Перестановки
void Print(int* a, int n);
bool NextSet(int* a, int n);

// Задание 5 Подмножества
int gray_code(int n);
int count_bits(int n);
void all_combinations(int n, int k);