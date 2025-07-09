#include "Header.h"

void ReadData(double** (&x), double* (&y), int& n) {
    std::ifstream READx;
    READx.open("x.txt", std::ios::out);
    if (!READx) {
        std::cerr << "Ошибка. Файл x.txt не может быть открыт!" << std::endl;
        system("pause");
    }
    for (int i = 0; i < n; i++) for (int j = 0; j < 3; j++) READx >> x[i][j];
    READx.close();

    std::ifstream READy;
    READy.open("y.txt", std::ios::out);
    if (!READy) {
        std::cerr << "Ошибка. Файл y.txt не может быть открыт!" << std::endl;
        system("pause");
    }
    for (int i = 0; i < n; i++) READy >> y[i];
    READy.close();
}

double MSE(double* y, double* _y, int n) {
    double mse = 0;
    for (int i = 0; i < n; i++) {
        mse += pow(y[i] - _y[i], 2);
    }
    return mse /= n;
}

void CalculateY(double* (&_y), double** x, double w0, double w1, double w2, double w3, double n) {
    for (int i = 0; i < n; i++) {
        _y[i] = w0 + w1 * x[i][1] + w2 * x[i][2] + w3 * x[i][3];
    }
}