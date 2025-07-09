#include "Header.h"

// Задание 2 Рекурсия 
int recursion1(int fst, int snd, int k) {
	int a = 2 * fst - snd;
	std::cout << a << " ";
	if (k != 1) {
		k--;
		return recursion1(a, fst, k);
	}
}

int recursion2(int n, int k) {
	std::cout << -3 + 4 * n << " ";
	if (n != k) {
		n++;
		return recursion2(n, k);
	}
}

// Задание 4 Перестановки
void swap(int* a, int i, int j) {
	int s = a[i];
	a[i] = a[j];
	a[j] = s;
}
bool NextSet(int* a, int n) {
	int j = n - 2;
	while (j != -1 && a[j] >= a[j + 1]) j--;
	if (j == -1)
		return false; // больше перестановок нет
	int k = n - 1;
	while (a[j] >= a[k]) k--;
	swap(a, j, k);
	int l = j + 1, r = n - 1; // сортируем оставшуюся часть последовательности
	while (l < r)
		swap(a, l++, r--);
	return true;
}
void Print(int* a, int n) {
	for (int i = 0; i < n; i++)
		std::cout << a[i] << " ";
	std::cout << std::endl;
}

// Задание 5 Подмножества
int gray_code(int n) {
	return n ^ (n >> 1);
}

int count_bits(int n) {
	int res = 0;
	for (; n; n >>= 1)
		res += n & 1;
	return res;
}

void all_combinations(int n, int k) {
	int Num = 0;
	for (int i = 0; i < (1 << n); ++i) {
		int cur = gray_code(i);
		if (count_bits(cur) == k) {
			Num++;
			std::cout << std::endl << std::setw(3) << Num << ":";
			for (int j = 0; j < n; ++j)
				if (cur & (1 << j))
					std::cout << " " << j + 1;
		}
	}
}