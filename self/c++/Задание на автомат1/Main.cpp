#include "Header.h"

int main() {

	setlocale(LC_ALL, "Russian");
	srand(time(NULL));

	int amount;
	std::cout << "¬ведите количество строк: ";
	std::cin >> amount;

	system("cls");

	int const data_amount = 395,
		columns = 33;

	double** Data = new double*[data_amount];
	for (int i = 0; i < data_amount; i++)
		Data[i] = new double[columns];

	ReadData(Data, data_amount, columns);

	/*for (int i = 0; i < amount; i++) {
		std::cout << std::endl;
		for (int j = 0; j < columns; j++)
			std::cout << std::setw(6) << Data[i][j];
	}
	std::cout << std::endl;*/

	double** X = new double*[data_amount - amount];
	for (int i = 0; i < data_amount - amount; i++)
		X[i] = new double[32];

	int count = 0;
	for (int i = amount; i < data_amount; i++) {
		for (int j = 0; j < 32; j++)
			X[count][j] = Data[i][j];
		count++;
	}

	/*for (int i = 0; i < data_amount - amount; i++) {
		for (int j = 0; j < 32; j++)
			std::cout << X[i][j] << " ";
		std::cout << std::endl;
	}*/

	double* test = LinearRegression(X, Data, data_amount, amount, 32);
}