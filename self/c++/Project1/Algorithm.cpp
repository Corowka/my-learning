#include "Algorithm.h"

// Линейный поиск ищет элемент массива. Сложность O(n).
int LinearSearch(double* mass, int const size, int n) {
	for (int i = 0; i < size; i++)
		if (mass[i] == n)
			return i;
	return -1;
}

// Бинарный поиск ищет элемент в предварительно упорядоченом массиве. Сложность O(log2n). 
int BinarySearch(double* mass, int const size, int n) {
	unsigned l = 0;
	unsigned r = size - 1;
	unsigned mid = l + (r - l) / 2;
	while (l <= r) {
		std::cout << mid << std::endl;
		if (mass[mid] == n)
			return mid;
		if (mass[mid] < n)
			l = mid + 1;
		else
			r = mid - 1;
		mid = l + (r - l) / 2;
	}
	return -1;
}

// Сортировка пузырьком. Сложность O(n^2).
void BubbleSort(double* (&mass), int const size) {
	double temp;
	for (int i = 0; i < size - 1; i++)
		for (int j = 0; j < size - 1 - i; j++)
			if (mass[j] > mass[j + 1]) {
				temp = mass[j];
				mass[j] = mass[j + 1];
				mass[j + 1] = temp;
			}
}

// Сортировка вставками. Сложность O(n^2).
void InsertionSort(double* (&mass), int const size) {
	double temp;
	for (int i = 0; i < size; i++)
		for (int j = i; j > 0 && mass[j - 1] > mass[j]; j--) {
			temp = mass[j - 1]; 
			mass[j - 1] = mass[j];
			mass[j] = temp;
		}
}

// Сортировка методом простого выбора. Сложность O(n^2).
void SelectionSort(double* (&mass), int const size) {
	double temp;
	unsigned min;
	for (int i = 0; i < size; i++) {
		min = i;
		for (int j = i; j < size; j++)
			if (mass[j] < mass[min])
				min = j;
		temp = mass[i];
		mass[i] = mass[min];
		mass[min] = temp;
	}
}

// Сортировка Хоара или быстрая сортировка. Сложность O().
void QuickSort(double* (&mass), unsigned LeftBorder, unsigned RightBorder) {
	unsigned LeftMarker = LeftBorder;
	unsigned RightMarker = RightBorder;
	double pivot = mass[(LeftMarker + RightMarker) / 2];
	do {
		while (mass[LeftMarker] < pivot)
			LeftMarker++;
		while (mass[RightMarker] > pivot)
			RightMarker--;
		if (LeftMarker <= RightMarker) {
			if (LeftMarker < RightMarker) {
				double temp = mass[LeftMarker];
				mass[LeftMarker] = mass[RightMarker];
				mass[RightMarker] = temp;
			}
			LeftMarker++;
			RightMarker--;
		}
	} while (LeftMarker <= RightMarker);
	if (LeftMarker < RightBorder)
		QuickSort(mass, LeftMarker, RightBorder);
	if (LeftBorder < RightMarker)
		QuickSort(mass, LeftBorder, RightMarker);
}

// Сортировка шейкерная. Cложность O(n^2).
void CocktailSort(double* (&mass), int const size) {
	unsigned LeftMarker = 0;
	unsigned RightMarker = size - 1;
	double temp;
	do {
		for (int i = LeftMarker; i < RightMarker; i++)
			if (mass[i] > mass[i + 1]) {
				temp = mass[i];
				mass[i] = mass[i + 1];
				mass[i + 1] = temp;
			}
		RightMarker--;
		for (int i = RightMarker; i > LeftMarker; i--)
			if (mass[i - 1] > mass[i]) {
				temp = mass[i - 1];
				mass[i - 1] = mass[i];
				mass[i] = temp;
			}
		LeftMarker++;
	} while (LeftMarker < RightMarker);
}
