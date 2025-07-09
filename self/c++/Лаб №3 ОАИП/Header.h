#include <iostream>
#include <string>
#include <cmath>
#include <windows.h>
#include <fstream>

using namespace std;

struct wage {
    int hours;
    int hwage;
};

union wageu {
    struct wage money;
    int month;
};

struct employee {
    string fio;
    int num;
    union wageu uniwage;
    unsigned active : 1;
};

extern employee team[100];
extern int sortset;
extern int teamsize;

#pragma once
// Прототипы функций =============================================================================
void menu();
void input();
void output(int number);
void unistal(int number);
void sort();
void remind();
void store();
int parsing(string value, int size);
