#include <iostream>

using namespace std;

// Прототипы функций
void a(double a0, double a1, int n);
void b(int mass[], int n, int k);

// Глобальные переменные 

int main()
{
	// Задание №5
	int n = 5, k = 0;
	int* A = new int[100];
	for (int i = 0; i < n; i++) A[i] = i + 1;
	b(A, n, k);
	return 0;
}

// Построение подмножеств
void b(int mass[], int n, int k) {

}