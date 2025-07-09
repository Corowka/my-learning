#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

#include "Header.h"

using namespace std;

// Считывание информации из файла
void remind() {
    for (int i = 0; i < 100; i++) team[i].active = 0;
    ifstream database;
    database.open("database.txt", ios::out);
    if (!database) {
        cerr << "Ошибка. Файл database.txt не может быть открыт!" << endl;
        system("pause");
    }
    string buf = "";
    getline(database, buf);
    cout << buf << endl;
    buf += '\n';
    string buf_s = "";
    string buf_t = "";
    string buf_f = "";
    string buf_n = "";
    string buf_w = "";
    int i = 1;
    while (buf[i] != 's' && buf[i] != '\n') {
        if (buf[i] >= '0' && buf[i] <= '9') buf_t += buf[i];
        i++;
    }
    teamsize = parsing(buf_t, buf_t.size());
    int count = 0;
    if (teamsize != 0) {
        while (buf[i] != 'f' && buf[i] != '\n') {
            if (buf[i] >= '0' && buf[i] <= '9') buf_s += buf[i];
            i++;
        }
        sortset = parsing(buf_s, buf_s.size());
        while (buf[i] != '\n') {
            if (buf[i] == 'f') {
                i++;
                while (buf[i] != 'n') {
                    buf_f += buf[i];
                    i++;
                }
            }
            team[count].fio = buf_f;
            buf_f = "";
            if (buf[i] == 'n') {
                i++;
                while (buf[i] != 'w') {
                    if (buf[i] >= '0' && buf[i] <= '9') buf_n += buf[i];
                    i++;
                }
            }
            team[count].num = parsing(buf_n, buf_n.size());
            buf_n = "";
            if (buf[i] == 'w') {
                i++;
                while (buf[i] != 'f' && buf[i] != '\n') {
                    if (buf[i] >= '0' && buf[i] <= '9') buf_w += buf[i];
                    i++;
                }
            }
            team[count].uniwage.month = parsing(buf_w, buf_w.size());
            buf_w = "";
            team[count].active = 1;
            count++;
        }
    }

    ifstream index;
    index.open("index.txt", ios::out);
    if (!index) {
        cerr << "Ошибка. Файл database.txt не может быть открыт!" << endl;
        system("pause");
    }
    buf = "";
    getline(index, buf);
    cout << buf << endl;
    buf += '\n';
    system("pause");
    system("cls");
}

// Запись информации в файл 
void store() {
    ofstream database;
    database.open("database.txt", ios::out);
    if (!database) {
        cerr << "Ошибка. Файл database.txt не может быть открыт!" << endl;
        system("pause");
    }
    database << 't' << teamsize << 's' << sortset;
    for (int i = 0; i < teamsize; i++) {
        if (team[i].active != 0) {
            database << "f" << team[i].fio << "n" << team[i].num << "w" << team[i].uniwage.month;
        }
    }
    database.close();

    ofstream index;
    index.open("index.txt", ios::out);
    if (!index) {
        cerr << "Ошибка. Файл database.txt не может быть открыт!" << endl;
        system("pause");
    }
    for (int j = 0; j < 3; j++) {
        index << 's' << sortset << " ";
        for (int i = 0; i < teamsize; i++) index << team[i].num << " ";
        sortset = (sortset + 1) % 3;
        sort();
    }
    index.close();
    menu();
}

int parsing(string value, int size) {
    int d = 0;
    int integer = 0;
    for (int i = size - 1; i >= 0; i--) {
        integer += (value[i] - '0') * pow(10, d);
        d++;
    }
    return integer;
}