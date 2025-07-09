#include "header.h"


int main()
{

    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);

    int amount = 0;
    int sort = 3;

    // Создаём массив структур
    Data* d = new Data[amount];

    // Считываем информацию из файла
    ReadData(d, amount, "DATA.txt");

    // Создаём массив для индексов
    int* s1 = new int[amount];
    int* s2 = new int[amount];
    int* s3 = new int[amount];
    int* _s = new int[amount];
    for (int i = 0; i < amount; i++) _s[i] = i;

    // Считываем индексы из файла
    ReadIndex(amount, s1, s2, s3, "INDEX.txt");

    Menu(d, amount, s1, s2, s3, _s, sort);
}