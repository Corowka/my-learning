#include "header.h"

inline void Menu(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3), int* (&_s), int& sort) {

    // Запускаем меню программы 

    for (int i = 0; i < 211; i++) cout << '=';
    cout << LeftSewt("|", 210) << '|';
    cout << LeftSewt("|", 96) << LeftSewt("1) Ввод данных", 114) << '|';
    cout << LeftSewt("|", 96) << LeftSewt("2) Изменение данных", 114) << '|';
    cout << LeftSewt("|", 96) << LeftSewt("3) Поиск данных", 114) << '|';
    cout << LeftSewt("|", 96) << LeftSewt("4) Удаление данных", 114) << '|';
    string SortStationOutput = "5) Сортировка данных по ";
    switch (sort) {
    case 0:
        SortStationOutput += "ФИО";
        break;
    case 1 :
        SortStationOutput += "табельному номеру";
        break;
    case 2:
        SortStationOutput += "зарабной плате";
        break;
    default :
        SortStationOutput = "5) Отсортировать данные";
    }
    cout << LeftSewt("|", 96) << LeftSewt(SortStationOutput, 114) << '|';
    cout << LeftSewt("|", 210) << '|';
    for (int i = 0; i < 211; i++) cout << '=';

    // Вывод базы данных

    int NumOfData = 1;
    if (amount != 0) {
        for (int i = 0; i < amount; i += 5) {
            string spacebar1 = "|", spacebar2 = "|", buffer1 = "|", buffer2 = "|", buffer3 = "|", buffer4 = "|", linebar = "=";
            for (int j = i; j < i + 5 && j < amount; j++) {
                NumOfData++;
                spacebar1 += RightSewt("|", 42);
                buffer1 += LeftSewt(" # " + ConvertToString(j + 1), 41) + "|";
                buffer2 += LeftSewt(" ФИО: " + d[_s[j]].FIO, 41) + "|";
                buffer3 += LeftSewt(" Табельный номер: " + d[_s[j]].Number, 41) + "|";
                buffer4 += LeftSewt(" Зарплата за месяц: " + ConvertToString(d[_s[j]].FullWage.Wage), 41) + "|";
                spacebar2 += RightSewt("|", 42);
                for (int l = 0; l < 42; l++) linebar += '=';
            }
            cout << LeftSewt(spacebar1, 211);
            cout << LeftSewt(buffer1, 211);
            cout << LeftSewt(buffer2, 211);
            cout << LeftSewt(buffer3, 211);
            cout << LeftSewt(buffer4, 211);
            cout << LeftSewt(spacebar2, 211);
            cout << linebar;
        }
        cout << endl;
    }

    // Выбираем пункт меню

    string MenuState;
    cin >> MenuState;
    switch (Parsing(MenuState)) {
    case 1:
        system("cls");
        InputData(d, amount, s1, s2, s3);
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    case 2:
        system("cls");
        ChangeData(d, amount, s1, s2, s3);
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    case 3:
        system("cls");
        FindData(d, amount);
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    case 4:
        system("cls");
        DeleteData(d, amount, s1, s2, s3);
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    case 5:
        sort = ++sort % 4;
        switch (sort) {
        case 0:
            for (int i = 0; i < amount; i++) _s[i] = s1[i];
            break;
        case 1:
            for (int i = 0; i < amount; i++) _s[i] = s2[i];
            break;
        case 2:
            for (int i = 0; i < amount; i++) _s[i] = s3[i];
            break;
        default:
            for (int i = 0; i < amount; i++) _s[i] = i;
        }
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    default:
        system("cls");
        cerr << "Ошибка! Выбран несуществующий пункт меню." << endl;
        system("pause");
        system("cls");
        Menu(d, amount, s1, s2, s3, _s, sort);
        break;
    }
}