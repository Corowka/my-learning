#include <iostream>
#include <cmath>
#include <ctime>
#include <string>
#include <iomanip>

using namespace std;

// Прототипы фуекций

double f(double x, double y, double z);

int main()
{
    setlocale(LC_ALL, "Russian");

    srand(time(NULL));

    // Генерация точки начала 
    double x = -100 + rand()%201, y = -100 + rand() % 201, z = -100 + rand() % 201;
    
    // Генерация направления поиска
    int dir = rand()%2;

    // Точность
    double e = 0.01;

    // Шаг 
    double h = 0.001;
    
    // Алгоритм
    double dx, dy, dz, pre_x, pre_y, pre_z;

    cout << " ======================================================================================" << endl;
    cout << " |        X0      |        Y0      |        Z0      |        E       |     min/max    |" << endl;
    cout << " ======================================================================================" << endl;

    cout << " | " << setw(14) << x;
    cout << " | " << setw(14) << y;
    cout << " | " << setw(14) << z;
    cout << " | " << setw(14) << e;
    cout << " | " << ((dir == 0) ? "      MIN     " : "      MAX     ") << " | " << endl;

    cout << " ======================================================================================" << endl << endl;

    cout << " ======================================================================================" << endl;
    cout << " |        X       |        Y       |        Z       |     F(x,y,z)   |        H       |" << endl;
    cout << " ======================================================================================" << endl;

    if (dir == 1) {

        do {
            // 2*x+y*z*cos(x)
            dx = 2 * x + y * z * cos(x);
            // z*sin(x)+z+1
            dy = z * sin(x) + z + 1;
            // y* sin(x) + y + 2 * z + 1
            dz = y * sin(x) + y + 2 * z + 1;

            pre_x = x;
            pre_y = y;
            pre_z = z;

            x -= h * dx;
            y -= h * dy;
            z -= h * dz;

            h = (f(pre_x, pre_y, pre_z) > f(x, y, z)) ? h / 2 : h;

            cout << " | " << setw(14) << x;
            cout << " | " << setw(14) << y;
            cout << " | " << setw(14) << z;
            cout << " | " << setw(14) << f(z, y, z);
            cout << " | " << setw(14) << h << " | " << endl;

        } while (fabs(f(pre_x, pre_y, pre_z) - f(x, y, z)) >= e);
    }
    else {

        do {
            // 2*x+y*z*cos(x)
            dx = 2 * x + y * z * cos(x);
            // z*sin(x)+z+1
            dy = z * sin(x) + z + 1;
            // y* sin(x) + y + 2 * z + 1
            dz = y * sin(x) + y + 2 * z + 1;

            pre_x = x;
            pre_y = y;
            pre_z = z;

            x += h * dx;
            y += h * dy;
            z += h * dz;

            h = (f(pre_x, pre_y, pre_z) > f(x, y, z)) ? h / 2 : h;

            cout << " | " << setw(14) << x;
            cout << " | " << setw(14) << y;
            cout << " | " << setw(14) << z;
            cout << " | " << setw(14) << f(z, y, z);
            cout << " | " << setw(14) << h << " | " << endl;

        } while (fabs(pre_x - x) >= e);
    }
    cout << " ======================================================================================" << endl;
    cout << " | " << setw(14) << x;
    cout << " | " << setw(14) << y;
    cout << " | " << setw(14) << z;
    cout << " | " << setw(14) << f(z, y, z);
    cout << " | " << setw(14) << h << " | " << endl;
    cout << " ======================================================================================" << endl;
    return 0;
}

// Функции

double f(double x, double y, double z) {
    // x^2+z*y*sin(x)+(y+z)*(z+1)
    return (x * x + z * y * sin(x) + (y + z) * (z + 1));
}