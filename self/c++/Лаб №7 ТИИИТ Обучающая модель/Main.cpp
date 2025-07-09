#include "Header.h"

int main() {

	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);
	srand(time(NULL));

	int n = 200;
	double** x = new double*[n];
	for (int i = 0; i < n; i++) x[i] = new double[3];
	double* y = new double[n];

	ReadData(x, y, n);

	double* _y = new double[n];
	double e, OldMSE, NewMSE, random, Num = 0,
		w0 = (double)(rand() % 100 + 1) / 100, 
		w1 = (double)(rand() % 100 + 1) / 100,
		w2 = (double)(rand() % 100 + 1) / 100,
		w3 = (double)(rand() % 100 + 1) / 100;
	do {
		Num++;

		CalculateY(_y, x, w0, w1, w2, w3, n);
		OldMSE = MSE(y, _y, n);

		random = (double)(-500 + rand() % 1000 + 1) / 100;
		CalculateY(_y, x, w0 + random, w1, w2, w3, n);
		if (MSE(y, _y, n) < OldMSE) { w0 += random; NewMSE = MSE(y, _y, n); }
		CalculateY(_y, x, w0, w1 + random, w2, w3, n);
		if (MSE(y, _y, n) < OldMSE) { w1 += random; NewMSE = MSE(y, _y, n); }
		CalculateY(_y, x, w0, w1, w2 + random, w3, n);
		if (MSE(y, _y, n) < OldMSE) { w2 += random; NewMSE = MSE(y, _y, n); }
		CalculateY(_y, x, w0, w1, w2, w3 + random, n);
		if (MSE(y, _y, n) < OldMSE) { w3 += random; NewMSE = MSE(y, _y, n); }

		NewMSE = MSE(y, _y, n);
		
		std::cout << " #" << std::setw(5) << Num
			<< " w0:" << std::setw(10) << w0
			<< " w1:" << std::setw(10) << w1
			<< " w2:" << std::setw(10) << w2
			<< " w3:" << std::setw(10) << w3
			<< " MSE:" << std::setw(10) << NewMSE << std::endl;
	} while (NewMSE >= 100);
		
}