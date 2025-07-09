#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

#include "Header.h"

using namespace std;

// ���� 
void menu() {
    cout << "============================================" << endl;
    cout << "1. ���� ������" << endl;
    cout << "2. ����� ������" << endl;
    cout << "3. �������� ������" << endl;
    string sortset_s = (sortset == 0) ? "���" : (sortset == 1) ? "���������� ������" : "�������� ����� �� �����";
    cout << "4. ���������� �� " << sortset_s << endl;
    cout << "5. ���������" << endl;
    cout << "============================================" << endl;
    cout << "������ ����������:" << endl;
    cout << "============================================" << endl;
    for (int i = 0; i < teamsize; i++) {
        if (team[i].active == 1) {
            cout << "���: ";
            cout << team[i].fio << endl;
            cout << "��������� �����: ";
            cout << team[i].num << endl;
            cout << "�������� �� �����: ";
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
        cout << "������� ��������� ����� ���������: ";
        cin >> number;
        output(number);
        system("pause");
        system("cls");
        menu();
    case 3:
        system("cls");
        cout << "������� ��������� ����� ���������: ";
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
