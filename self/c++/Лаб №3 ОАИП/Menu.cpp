#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

#include "Header.h"

using namespace std;

// Меню 
void menu() {
    cout << "============================================" << endl;
    cout << "1. Ввод данных" << endl;
    cout << "2. Вывод данных" << endl;
    cout << "3. Удаление данных" << endl;
    string sortset_s = (sortset == 0) ? "ФИО" : (sortset == 1) ? "табельному номеру" : "зарабной плате за месяц";
    cout << "4. Сортировка по " << sortset_s << endl;
    cout << "5. Сохранить" << endl;
    cout << "============================================" << endl;
    cout << "Список работников:" << endl;
    cout << "============================================" << endl;
    for (int i = 0; i < teamsize; i++) {
        if (team[i].active == 1) {
            cout << "ФИО: ";
            cout << team[i].fio << endl;
            cout << "Табельный номер: ";
            cout << team[i].num << endl;
            cout << "Зарплата за месяц: ";
            cout << team[i].uniwage.month << endl;
            cout << "============================================" << endl;
        }
    }
    int swapmenu;
    cin >> swapmenu;
    int number;
    switch (swapmenu) {
    case 1:
        system("cls");
        input();
        system("pause");
        system("cls");
        menu();
    case 2:
        system("cls");
        cout << "Введите табельный номер работника: ";
        cin >> number;
        output(number);
        system("pause");
        system("cls");
        menu();
    case 3:
        system("cls");
        cout << "Введите табельный номер работника: ";
        cin >> number;
        unistal(number);
        system("pause");
        system("cls");
        menu();
    case 4:
        system("cls");
        sortset = (sortset + 1) % 3;
        if (teamsize > 1) sort();
        menu();
    case 5:
        system("cls");
        store();
        system("pause");
        system("cls");
    default:
        system("cls");
        menu();
    }
    system("cls");
}
