#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

#include "Header.h"

using namespace std;

// Ввод
void input() {
    int point = 0;
    for (int i = 0; i <= teamsize; i++) if (team[i].active == 0) point = i;
    cout << "============================================" << endl;
    cout << "Введите ФИО: ";
    while (cin.get() != '\n');
    getline(cin, team[point].fio);
    cout << "Введите табельный номер: ";
    bool val = true;
    do {
        cin >> team[point].num;
        for (int i = 0; i < teamsize; i++) if (team[i].num == team[point].num) {
            val = false;
            cout << "Ошибка! Работник с данным табельным номером уде существует. Попробуйсте снова: ";
            break;
        }
    } while (val == false);
    cout << "Введите количество отработанных часов за месяц: ";
    cin >> team[point].uniwage.money.hwage;
    cout << "Введите почасовой тариф: ";
    cin >> team[point].uniwage.money.hours;
    cout << "============================================" << endl;
    team[point].uniwage.month = team[point].uniwage.money.hwage * team[point].uniwage.money.hours;
    team[point].active = 1;
    teamsize++;
}
// Вывод
void output(int number) {
    int point = -1;
    for (int i = 0; i < teamsize; i++) {
        if (team[i].num == number) {
            point = i;
            break;
        }
    }
    cout << "============================================" << endl;
    if (point != -1) {
        cout << "ФИО: ";
        cout << team[point].fio << endl;
        cout << "Табельный номер: ";
        cout << team[point].num << endl;
        cout << "Зарплата за месяц: ";
        cout << team[point].uniwage.month << endl;
    }
    else cout << "Ошибка! Табельного номера нет в базе данных" << endl;
    cout << "============================================" << endl;
}
// Сортировка
void sort() {
    struct employee temp;
    switch (sortset) {
    case 0:
        for (int i = 0; i < teamsize - 1; i++) {
            for (int j = 0; j < teamsize - i - 1; j++) {
                if (team[j].fio[0] > team[j + 1].fio[0]) {
                    temp = team[j];
                    team[j] = team[j + 1];
                    team[j + 1] = temp;
                }
            }
        }
        break;
    case 1:
        for (int i = 0; i < teamsize - 1; i++) {
            for (int j = 0; j < teamsize - i - 1; j++) {
                if (team[j].num > team[j + 1].num) {
                    temp = team[j];
                    team[j] = team[j + 1];
                    team[j + 1] = temp;
                }
            }
        }
        break;
    case 2:
        for (int i = 0; i < teamsize - 1; i++) {
            for (int j = 0; j < teamsize - i - 1; j++) {
                if (team[j].uniwage.month > team[j + 1].uniwage.month) {
                    temp = team[j];
                    team[j] = team[j + 1];
                    team[j + 1] = temp;
                }
            }
        }
        break;
    default: menu();
    }
}

// Удаление 
void unistal(int number) {
    int point = -1;
    cout << "============================================" << endl;
    for (int i = 0; i < teamsize; i++) if (team[i].num == number) point = i;
    if (point != -1) {
        team[point].fio = "";
        team[point].num = 0;
        team[point].uniwage.month = 0;
        team[point].active = 0;
        sortset = 0;
        sort();
        teamsize--;
        cout << "Данные успешно удалены" << endl;
    }
    else cout << "Работника с данным табельным номером нет в базе данных" << endl;
    cout << "============================================" << endl;
}
