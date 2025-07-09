#include "Header.h"

double Parsing(std::string StrValue) {
	long double value = 0;
	int length = StrValue.size(),
		mantissa = -1,
		PowI = length-2;
	for (int i = 0; i < length; i++) {
		if (mantissa != -1)
			mantissa++;
		if (StrValue[i] == '.')
			mantissa = 0;
		else {
			value += (StrValue[i] - '0') * pow(10, PowI);
			PowI--;
		}
		//std::cout << "value = " << value << " char[i] = " << StrValue[i] << " Converted = " << (StrValue[i] - '0') * pow(10, i) << " mantissa = " << mantissa << std::endl;
	}
	return value / pow(10, mantissa);
}

void ReadData(double** (&x), int* (&y), int size, std::string filename) {
	std::ifstream READ(filename);
	if (READ) {
		std::string flower, NonParsedStr, value;
		for (int i = 0; i < size; i++) {
			getline(READ, NonParsedStr);
			int const length = NonParsedStr.size();
			int Divider = 0;
			for (int j = 0; j < length; j++) {
				if (NonParsedStr[j] != ',') {
					value += NonParsedStr[j];
				}
				else {
					if (Divider < 5) {
						x[i][Divider] = Parsing(value);
						Divider++;
						value = "";
					}
				}
				if (j == length - 1) {
					if (value == "Iris-setosa")
						y[i] = 1;
					if (value == "Iris-versicolor")
						y[i] = 2;
					if (value == "Iris-virginica")
						y[i] = 3;
					value = "";
				}
			}
		}
	}
	else {
		std::cerr << "Ошика: Файл " << filename << " не может быть открыт!" << std::endl;
	}
	READ.close();
}

void NormalizeData(double** (&x), double** (&X), int size1, int size2) {
	// Находим минимумы и максимумы данных
	double maxX1 = x[0][1],
		maxX2 = x[0][2],
		maxX3 = x[0][3],
		maxX4 = x[0][4],
		minX1 = x[0][1],
		minX2 = x[0][2],
		minX3 = x[0][3],
		minX4 = x[0][4];
	for (int i = 1; i < size1; i++) {
		if (x[i][1] > maxX1)
			maxX1 = x[i][1];
		if (x[i][2] > maxX2)
			maxX2 = x[i][2];
		if (x[i][3] > maxX3)
			maxX3 = x[i][3];
		if (x[i][4] > maxX4)
			maxX4 = x[i][4];
		if (x[i][1] < minX1)
			minX1 = x[i][1];
		if (x[i][2] < minX2)
			minX2 = x[i][2];
		if (x[i][3] < minX3)
			minX3 = x[i][3];
		if (x[i][4] < minX4)
			minX4 = x[i][4];
	}
	// Нормируем, чтобы все параметры принимали значение от 0 до 1
	for (int i = 0; i < size1; i++) {
		x[i][1] = (x[i][1] - minX1) / (maxX1 - minX1);
		x[i][2] = (x[i][2] - minX2) / (maxX2 - minX2);
		x[i][3] = (x[i][3] - minX3) / (maxX3 - minX3);
		x[i][4] = (x[i][4] - minX4) / (maxX4 - minX4);
	}
	// Нормируем вдохные данные 
	for (int i = 0; i < size2; i++) {
		X[i][1] = (X[i][1] - minX1) / (maxX1 - minX1);
		X[i][2] = (X[i][2] - minX2) / (maxX2 - minX2);
		X[i][3] = (X[i][3] - minX3) / (maxX3 - minX3);
		X[i][4] = (X[i][4] - minX4) / (maxX4 - minX4);
	}
}

void CalculateDistance(double** (&x), int* (&y), double* (&EuclidDist), double** (&X), int size, int number) {
	for (int i = 0; i < size; i++)
		EuclidDist[i] = sqrt(pow(X[number][1] - x[i][1], 2) + pow(X[number][2] - x[i][2], 2) + pow(X[number][3] - x[i][3], 2) + pow(X[number][4] - x[i][4], 2));
	double TempDbl;
	int TempInt;
	for (int i = 0; i < size; i++)
		for (int j = 0; j < size - i - 1; j++) {
			if (EuclidDist[j] > EuclidDist[j + 1]) {
				TempDbl = EuclidDist[j];
				EuclidDist[j] = EuclidDist[j + 1];
				EuclidDist[j + 1] = TempDbl;

				TempInt = y[j];
				y[j] = y[j + 1];
				y[j + 1] = TempInt;
			}
		}
}