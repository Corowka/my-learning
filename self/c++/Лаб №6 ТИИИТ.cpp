#include <iostream>
#include <cmath>
#include <ctime>
#include <iomanip>

int main()
{
    setlocale(LC_ALL, "Russian");
    srand(time(NULL));
    int buf = 0;
    // Входные данные
    double employee = 15; // Количество работников 
    double waight[5] = { 0.4, 0.1, 0.2, 0.3, 0.0 }; // Распределение в отделе
    int type[5];
    for (int i = 0; i < 5; i++) {
        type[i] = round(employee * waight[i]);
        buf += type[i];
    }
    employee = buf;
    int activity[5] = { 6, 5, 4, 2, 1 };
    double grade = pow(10, 3);
    std::cout << " ======================================================================================================================================" << std::endl;
    std::cout << " |      senior      |      middle      |      junior      |      trainee     |      genius      |       team       |       grade      |" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
    for (int i = 0; i < 5; i++) std::cout << " | " << std::setw(16) << activity[i];
    std::cout << " | " << std::setw(16) << employee << " | " << std::setw(16) << grade << " |" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
    std::cout << " {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}" << std::endl;

    // Начало работы
    std::cout << " ======================================================================================================================================" << std::endl;
    std::cout << " |      senior      |      middle      |      junior      |      trainee     |      genius      |     progress     |       days       |" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
                 
    double progress = 0; 
    double efficiency[5];
    double total_efficiency[5] = { 0 };
    int days = 0;
    while (progress <= 100) {
        days++;
        efficiency[0] = 20 * grade + rand() % (int)((50 - 20) * grade);
        efficiency[1] = 10 * grade + rand() % (int)((30 - 10) * grade);
        efficiency[2] = 5 * grade + rand() % (int)((20 - 5) * grade);
        efficiency[3] = 1 * grade + rand() % (int)((2 - 1) * grade);
        efficiency[4] = 30 * grade + rand() % (int)((75 - 30) * grade);
        for (int i = 0; i < 5; i++) {
            progress += type[i] * efficiency[i] * activity[i] / (grade*pow(10,2));
            total_efficiency[i] += type[i] * efficiency[i] * activity[i] / (grade * pow(10, 2));
        }
        for (int i = 0; i < 5; i++) std::cout << " | " << std::setw(16) << type[i] * efficiency[i] * activity[i] / (grade * pow(10, 2));
        std::cout << " | " << std::setw(16) << progress << " | " << std::setw(16) << days << " |" << std::endl;
        std::cout << " ======================================================================================================================================" << std::endl;
    }
    std::cout << " {}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}{}" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
    std::cout << " |      senior      |      middle      |      junior      |      trainee     |      genius      |    total work    |       days       |" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
    for (int i = 0; i < 5; i++) std::cout << " | " << std::setw(16) << total_efficiency[i];
    std::cout << " | " << std::setw(16) << progress << " | " << std::setw(16) << days << " |" << std::endl;
    std::cout << " ======================================================================================================================================" << std::endl;
}