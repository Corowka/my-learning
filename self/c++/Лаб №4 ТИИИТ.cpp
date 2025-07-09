#include "func.h"
#include <iostream>
#include <iomanip>
#include <cmath>
#include <ctime>

using namespace std;

int main()
{
    setlocale(LC_ALL, "Russian");

    srand(time(NULL));

    // Входные данные 
    double x;
    int b;

    cout << "Введите множитель b (от 2 до 10):";
    cin >> b;
    if (b < 2) b = 2;
    if (b > 10) b = 10;
    b = 2;
    x = -100 + rand() % 200 + 1;
    double population[1000];

    alg(x, b, population);
    return 0;
}