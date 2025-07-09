#include "Header.h" 

double Parsing(std::string StrValue) {
	long double value = 0;
	int length = StrValue.size(),
		mantissa = -1,
		PowI = length - 2;
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

void ReadData(double** (&Data), int amount, int columns) {
	std::ifstream READ("student-mat.txt");
	if (READ) {
		std::string OneLine,
			value = "";
		for (int i = 0; i < amount; i++) {
			READ >> OneLine;
			int length = OneLine.size(),
				Divider = 0;
			for (int j = 0; j < length; j++) {
				// Считывание строки между запятыми
				if (OneLine[j] != ',') {
					if (OneLine[j] != '"')
						value += OneLine[j];
				}
				// Запись строки в матрицу данных
				else {
					switch (Divider) {

						// Параметры студентов 

					case 0: // school
						if (value == "GP") { Data[i][0] = 0; break; }
						if (value == "MS") { Data[i][0] = 1; break; }
					case 1: // sex 
						if (value == "F") { Data[i][1] = 0; break; }
						if (value == "M") { Data[i][1] = 1; break; }
					case 2: // age
						Data[i][2] = Parsing(value); break;
					case 3: // address
						if (value == "U") { Data[i][3] = 0; break; }
						if (value == "R") { Data[i][3] = 1; break; }
					case 4: // femsize
						if (value == "LE3") { Data[i][4] = 0; break; }
						if (value == "GT3") { Data[i][4] = 1; break; }
					case 5: // Pstatus 
						if (value == "T") { Data[i][5] = 0; break; }
						if (value == "A") { Data[i][5] = 1; break; }
					case 6: // Medu 
						if (value == "0") { Data[i][6] = 0; break; }
						if (value == "1") { Data[i][6] = 1; break; }
						if (value == "2") { Data[i][6] = 2; break; }
						if (value == "3") { Data[i][6] = 3; break; }
						if (value == "4") { Data[i][6] = 4; break; }
					case 7: // Fedu
						if (value == "0") { Data[i][7] = 0; break; }
						if (value == "1") { Data[i][7] = 1; break; }
						if (value == "2") { Data[i][7] = 2; break; }
						if (value == "3") { Data[i][7] = 3; break; }
						if (value == "4") { Data[i][7] = 4; break; }
					case 8: // Mjob
						if (value == "teacher") { Data[i][8] = 0; break; }
						if (value == "health") { Data[i][8] = 1; break; }
						if (value == "services") { Data[i][8] = 2; break; }
						if (value == "at_home") { Data[i][8] = 3; break; }
						if (value == "other") { Data[i][8] = 4; break; }
					case 9: // Fjob
						if (value == "teacher") { Data[i][9] = 0; break; }
						if (value == "health") { Data[i][9] = 1; break; }
						if (value == "services") { Data[i][9] = 2; break; }
						if (value == "at_home") { Data[i][9] = 3; break; }
						if (value == "other") { Data[i][9] = 4; break; }
					case 10: // reason 
						if (value == "home") { Data[i][10] = 0; break; }
						if (value == "reputation") { Data[i][10] = 1; break; }
						if (value == "course") { Data[i][10] = 2; break; }
						if (value == "other") { Data[i][10] = 3; break; }
					case 11: // guardian 
						if (value == "mother") { Data[i][11] = 0; break; } 
						if (value == "father") { Data[i][11] = 1; break; }
						if (value == "other") { Data[i][11] = 2; break; }
					case 12: // traveltime
						if (value == "1") { Data[i][12] = 1; break; }
						if (value == "2") { Data[i][12] = 2; break; }
						if (value == "3") { Data[i][12] = 3; break; }
						if (value == "4") { Data[i][12] = 4; break; }
					case 13: // studytime 
						if (value == "1") { Data[i][13] = 1; break; }
						if (value == "2") { Data[i][13] = 2; break; }
						if (value == "3") { Data[i][13] = 3; break; }
						if (value == "4") { Data[i][13] = 4; break; }
					case 14: // failures
						if (value == "0") { Data[i][14] = 0; break; }
						if (value == "1") { Data[i][14] = 1; break; }
						if (value == "2") { Data[i][14] = 2; break; }
						if (value == "3") { Data[i][14] = 3; break; }
					case 15: // schoolsup
						if (value == "0") { Data[i][15] = 0; break; }
						if (value == "1") { Data[i][15] = 1; break; }
					case 16: // famsup
						if (value == "0") { Data[i][16] = 0; break; }
						if (value == "1") { Data[i][16] = 1; break; }
					case 17: // paid
						if (value == "0") { Data[i][17] = 0; break; }
						if (value == "1") { Data[i][17] = 1; break; }
					case 18: // activities
						if (value == "0") { Data[i][18] = 0; break; }
						if (value == "1") { Data[i][18] = 1; break; }
					case 19: // nursery
						if (value == "0") { Data[i][19] = 0; break; }
						if (value == "1") { Data[i][19] = 1; break; }
					case 20: // higher
						if (value == "0") { Data[i][20] = 0; break; }
						if (value == "1") { Data[i][20] = 1; break; }
					case 21: // internet
						if (value == "0") { Data[i][21] = 0; break; }
						if (value == "1") { Data[i][21] = 1; break; }
					case 22: // romantic
						if (value == "0") { Data[i][22] = 0; break; }
						if (value == "1") { Data[i][22] = 1; break; }
					case 23: // famrel
						if (value == "1") { Data[i][23] = 1; break; }
						if (value == "2") { Data[i][23] = 2; break; }
						if (value == "3") { Data[i][23] = 3; break; }
						if (value == "4") { Data[i][23] = 4; break; }
						if (value == "5") { Data[i][23] = 5; break; }
					case 24: // freetime
						if (value == "1") { Data[i][24] = 1; break; }
						if (value == "2") { Data[i][24] = 2; break; }
						if (value == "3") { Data[i][24] = 3; break; }
						if (value == "4") { Data[i][24] = 4; break; }
						if (value == "5") { Data[i][24] = 5; break; }
					case 25: // goout
						if (value == "1") { Data[i][25] = 1; break; }
						if (value == "2") { Data[i][25] = 2; break; }
						if (value == "3") { Data[i][25] = 3; break; }
						if (value == "4") { Data[i][25] = 4; break; }
						if (value == "5") { Data[i][25] = 5; break; }
					case 26: // Dalc 
						if (value == "1") { Data[i][26] = 1; break; }
						if (value == "2") { Data[i][26] = 2; break; }
						if (value == "3") { Data[i][26] = 3; break; }
						if (value == "4") { Data[i][26] = 4; break; }
						if (value == "5") { Data[i][26] = 5; break; }
					case 27: // Walc
						if (value == "1") { Data[i][27] = 1; break; }
						if (value == "2") { Data[i][27] = 2; break; }
						if (value == "3") { Data[i][27] = 3; break; }
						if (value == "4") { Data[i][27] = 4; break; }
						if (value == "5") { Data[i][27] = 5; break; }
					case 28: // health
						if (value == "1") { Data[i][28] = 1; break; }
						if (value == "2") { Data[i][28] = 2; break; }
						if (value == "3") { Data[i][28] = 3; break; }
						if (value == "4") { Data[i][28] = 4; break; }
						if (value == "5") { Data[i][28] = 5; break; }
					case 29: // absences
						Data[i][29] = Parsing(value); break;

						// Оценки за год

					case 30: // G1
						Data[i][30] = Parsing(value); break;
					case 31: // G2
						Data[i][31] = Parsing(value); break;
					}
					value = "";
					Divider++;
				}
				if (j == length - 1) { // G3
					Data[i][32] = Parsing(value);
					value = "";
				}
			}
			std::cout << "Loading data: " << round((double)i * 100 / amount) << "%" << std::endl;
			system("cls");
		}
	}
	else
		std::cerr << "Ошибка: файл student-mat.txt не удалось открыть" << std::endl;
	READ.close();
}

//double KNN(double* X, double** x, int amount, int options) {
//
//	// Подсчёт Евклидового расстояния
//	double* EuclidDist = new double[amount];
//	int* y = new int[amount];
//	for (int i = 0; i < amount; i++)
//		y[i] = x[i][options];
//
//	for (int i = 0; i < amount; i++) {
//		EuclidDist[i] = 0;
//		for (int j = 0; j < options; j++)
//			EuclidDist[i] += pow(X[j] - x[i][j], 2);
//		EuclidDist[i] = sqrt(EuclidDist[i]);
//	}
//
//	// Сортировка дистанций
//	double TempDbl;
//	int TempInt;
//	for (int i = 0; i < amount; i++)
//		for (int j = 0; j < amount - i - 1; j++) {
//			if (EuclidDist[j] > EuclidDist[j + 1]) {
//				TempDbl = EuclidDist[j];
//				EuclidDist[j] = EuclidDist[j + 1];
//				EuclidDist[j + 1] = TempDbl;
//
//				TempInt = y[j];
//				y[j] = y[j + 1];
//				y[j + 1] = TempInt;
//			}
//		}
//	// Нахождения значения с помощью K соседий
//	int k = 20;
//	double value = 0;
//	for (int i = 0; i < k; i++) {
//		value += y[i];
//		std::cout << " #" << std::setw(3) << i + 1 << "  dist = " << std::setw(6) << EuclidDist[i] << "  y = " << y[i] << std::endl;
//	}
//	value = round(value / k);
//	return value;
//}

double* LinearRegression(double** X, double** x, int data_amount, int amount, int options) {

	// Создание массивов
	double* y = new double[amount];
	for (int i = 0; i < amount; i++)
		y[i] = x[i][options];
	double* _y = new double[amount];
	double* w = new double[options + 1];
	double* W = new double[options + 1];
	for (int i = 0; i < options + 1; i++)
		w[i] = (double) (rand() % 100 + 1) / 100;

	double OldMSE,
		random,
		a = 5,
		c = 0.8645,
		NewMSE;

	std::cout << " --= MSE =-- " << std::endl;

	int num = 0;
	do {
		random = (-100 + (double)(rand() % 201)) / 100;

		for (int i = 0; i < options + 1; i++) {
			W[i] = w[i] + a * random;
		}

		OldMSE = 0;

		for (int i = 0; i < amount; i++) {
			_y[i] = 0;
			for (int j = 0; j < options + 1; j++)
				_y[i] += w[j] * x[i][j];
			_y[i] += w[options];
			OldMSE += pow(y[i] - _y[i], 2);
		}
		OldMSE /= amount;

		NewMSE = 0;

		for (int i = 0; i < amount; i++) {
			_y[i] = 0;
			for (int j = 0; j < options; j++)
				_y[i] += W[j] * x[i][j];
			_y[i] += W[options];
			NewMSE += pow(y[i] - _y[i], 2);
		}
		NewMSE /= amount;

		if (OldMSE > NewMSE) {
			for (int i = 0; i < options + 1; i++)
				w[i] = W[i];
		}

		num++;
		std::cout << "#" << std::setw(3) << num << std::setw(13) << NewMSE << std::endl;

		a *= c;

	} while (a > 0.0000001);

	std::cout << " --= W[] =-- " << std::endl;

	for (int i = 0; i < options + 1; i++)
		std::cout << w[i] << std::endl;
	std::cout << std::endl;

	// Нахождение y
	double* Y = new double[data_amount - amount];

	for (int i = 0; i < data_amount - amount; i++) {
		Y[i] = 0;
		for (int j = 0; j < options; j++)
			Y[i] += X[i][j] * w[j];
		Y[i] += w[options];
	}

	std::cout << std::endl;

	for (int i = 0; i < data_amount - amount; i++)
		std::cout << "Y предсказанное = " << std::setw(3) << round(Y[i]) << " Y ожидаемое = " << std::setw(3) << x[amount + i][32] << std::endl;
	std::cout << std::endl;

	return Y;
}
