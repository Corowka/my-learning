#pragma once
#include <iostream>

int LinearSearch(double* mass, int const size, int n);
int BinarySearch(double* mass, int const size, int n);
void BubbleSort(double* (&mass), int const size);
void InsertionSort(double* (&mass), int const size);
void SelectionSort(double* (&mass), int const size);
void QuickSort(double* (&mass), unsigned LeftMarker, unsigned RightMarker);
void CocktailSort(double* (&mass), int const size);