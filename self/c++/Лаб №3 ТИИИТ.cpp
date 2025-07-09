#include <iostream>
#include <iomanip>
#include <cmath>
#include <ctime>

using namespace std;

// Прототипы функций
double f(double x, int b);

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

    // Алгоритм
    double y, a, random, c, pre_x, e;
    int n = 0;

    e = 0.01;
    y = f(x, b);
    a = 10;
    c = 0.75 + rand() % (int)((0.99 - 0.75 + 0.01) * pow(10, 2)) / pow(10, 2);
    cout << " ======================================================================================" << endl;
    cout << " |        X0      |        B       |        A       |        C       |        E       |" << endl;
    cout << " ======================================================================================" << endl;
    cout << " | " << setw(14) << x;
    cout << " | " << setw(14) << b;
    cout << " | " << setw(14) << a;
    cout << " | " << setw(14) << c;
    cout << " | " << setw(14) << e << " | " << endl;
    cout << " ======================================================================================" << endl;
    cout << " {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}" << endl;
    cout << " ======================================================================================" << endl;
    cout << " |        #       |        Y       |        X       |        A       |       RAND     |" << endl;
    cout << " ======================================================================================" << endl;

    for (;;) {
        n++;
        pre_x = x;
        random = -1 + rand() % (int)(2 * pow(10, 2) + 1) / pow(10, 2);
        x += a * random;
        y = f(x, b);
        if (y > f(pre_x, b)) {
            x = pre_x;
        }
        else {
            if (fabs(f(pre_x, b) - y) < e) break;
        }
        a *= c;

        cout << " | " << setw(14) << n;
        cout << " | " << setw(14) << y;
        cout << " | " << setw(14) << x;
        cout << " | " << setw(14) << a;
        cout << " | " << setw(14) << random << " | " << endl;

    }

    cout << " ======================================================================================" << endl;
    cout << " | " << setw(14) << n;
    cout << " | " << setw(14) << y;
    cout << " | " << setw(14) << x;
    cout << " | " << setw(14) << a;
    cout << " | " << "     ОТВЕТ    " << " | " << endl;
    cout << " ======================================================================================" << endl;

    return 0;
}

double f(double x, int b) {
    // y = cos(x) + 1/b*cos(8*x+1) + 1/b^2*cos(8^2*b+2) + 1/b^3*cos(8^3*b+3) + 1/b^4*cos(8^4*b+4) 
    int a = 8;
    return (cos(x) + 1 / b * cos(a * x + 1) + 1 / pow(b, 2) * cos(pow(a, 2) * b + 2) + 1 / pow(b, 3) * cos(pow(a, 3) * b + 3) + 1 / pow(b, 4) * cos(pow(a, 4) * b + 4));
}