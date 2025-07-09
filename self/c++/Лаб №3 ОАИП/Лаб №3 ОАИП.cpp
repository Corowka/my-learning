#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

#include "Header.h"

using namespace std;

//Информация о сотрудниках фирмы включает ФИО, табельный номер,
//количество отработанных часов за месяц, почасовой тариф.Вывести размер за -
//работной платы каждого сотрудника.

employee team[100];
int sortset = 0;
int teamsize = 0;

int main()
{
    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);

    remind();

    menu();
}