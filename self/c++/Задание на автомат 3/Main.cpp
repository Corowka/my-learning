#include "Header.h"

int main() {

	setlocale(LC_ALL, "Russian");

	// Количество данных
	int const size1 = 141;
	int const size2 = 9;

	// Массив параметров
	double** x = new double*[size1];
	for (int i = 0; i < size1; i++)
		x[i] = new double[5];
	// Массив значений
	int* y = new int[size1];
	int* _y = new int[size1];
	// Чтение файла
	ReadData(x, y, size1, "Iris.txt");

	// Ввод параметров проверяемого цветка
	double** X = new double*[size2];
	for (int i = 0; i < size2; i++)
		X[i] = new double[5];
	
	ReadData(X, y, size2, "Iris_test_data.txt");

	NormalizeData(x, X, size1, size2);

	int k;
	std::cout << "Введите k (количество соседей): ";
	std::cin >> k;

	double* EuclidDist = new double[size1];

	for (int l = 0; l < size2; l++) {
		for (int i = 0; i < size1; i++)
			_y[i] = y[i];
		CalculateDistance(x, _y, EuclidDist, X, size1, l);

		int type1 = 0,
			type2 = 0,
			type3 = 0;
		for (int i = 0; i < k; i++) {
			switch (_y[i]) {
			case 1:
				type1++;
				break;
			case 2:
				type2++;
				break;
			case 3:
				type3++;
				break;
			}
			std::cout << std::setw(3) << "#" << std::setw(2) << i + 1 << std::setw(12) << EuclidDist[i] << std::setw(10) << y[i] << std::endl;
		}
		int flower;
		if (type1 >= type2)
			if (type1 >= type3)
				flower = 1;
			else
				flower = 3;
		else
			if (type2 >= type3)
				flower = 2;
			else
				flower = 3;
		switch (flower) {
		case 1:
			std::cout << "Iris-setosa" << std::endl;
			break;
		case 2:
			std::cout << "Iris-versicolor" << std::endl;
			break;
		case 3:
			std::cout << "Iris-virginica" << std::endl;
			break;
		}
	}
}