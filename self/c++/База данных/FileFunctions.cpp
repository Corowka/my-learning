#include "header.h";

inline void StoreData(Data* (&d), int& amount, string filename) {
    ofstream DATA;
    DATA.open(filename, ios::out);
    if (!DATA) {
        cerr << "Ошибка. Файл DATA.txt не может быть открыт!" << endl;
        system("pause");
    }
    DATA << amount << endl;
    for (int i = 0; i < amount; i++) {
        DATA << d[i].FIO << endl;
        DATA << d[i].Number << endl;
        if (i < amount - 1) DATA << d[i].FullWage.Wage << endl;
        else DATA << d[i].FullWage.Wage;
    }
    DATA.close();
}

inline void ReadData(Data* (&d), int& amount, string filename) {
    ifstream DATA;
    DATA.open(filename, ios::out);
    if (!DATA) {
        cerr << "Ошибка. Файл DATA.txt не может быть открыт!" << endl;
        system("pause");
    }
    DATA >> amount;
    d = new Data[amount];
    for (int i = 0; i < amount; i++) {
        string fio = "";
        DATA >> fio;
        d[i].FIO += fio + " ";
        DATA >> fio;
        d[i].FIO += fio + " ";
        DATA >> fio;
        d[i].FIO += fio;
        DATA >> d[i].Number;
        DATA >> d[i].FullWage.Wage;
    }
}

inline void StoreIndex(Data* d, int amount, int* (&s1), int* (&s2), int* (&s3), string filename) {
    if (amount != 0) {
        Data* _d = new Data[amount];
        for (int i = 0; i < amount; i++) {
            _d[i].FIO = d[i].FIO;
            _d[i].Number = d[i].Number;
            _d[i].FullWage.Wage = d[i].FullWage.Wage;
            s1[i] = i;
            s2[i] = i;
            s3[i] = i;
        }
        ofstream INDEX;
        INDEX.open(filename, ios::out);
        if (!INDEX) {
            cerr << "Ошибка. Файл INDEX.txt не может быть открыт!" << endl;
            system("pause");
        }
        string sTemp;
        int iTemp;
        for (int i = 0; i < amount - 1; i++) {
            for (int j = 0; j < amount - i - 1; j++) {
                // Сортировка по Фамилии
                if (_d[j].FIO[0] > _d[j + 1].FIO[0]) {
                    sTemp = _d[j].FIO;
                    _d[j].FIO = _d[j + 1].FIO;
                    _d[j + 1].FIO = sTemp;

                    iTemp = s1[j];
                    s1[j] = s1[j + 1];
                    s1[j + 1] = iTemp;
                }
                // Сортировка по табельному номеру
                if (Parsing(_d[j].Number) > Parsing(_d[j + 1].Number)) {
                    sTemp = _d[j].Number;
                    _d[j].Number = _d[j + 1].Number;
                    _d[j + 1].Number = sTemp;

                    iTemp = s2[j];
                    s2[j] = s2[j + 1];
                    s2[j + 1] = iTemp;
                }
                // Сортировка по зарабной плате
                if (_d[j].FullWage.Wage > _d[j + 1].FullWage.Wage) {
                    iTemp = _d[j].FullWage.Wage;
                    _d[j].FullWage.Wage = _d[j + 1].FullWage.Wage;
                    _d[j + 1].FullWage.Wage = iTemp;

                    iTemp = s3[j];
                    s3[j] = s3[j + 1];
                    s3[j + 1] = iTemp;
                }
            }
        }
        delete[] _d;
        for (int i = 0; i < amount; i++) INDEX << s1[i] << endl;   
        for (int i = 0; i < amount; i++) INDEX << s2[i] << endl;
        for (int i = 0; i < amount; i++) INDEX << s3[i] << endl;
        INDEX.close();
    }
}

inline void ReadIndex(int amount, int* (&s1), int* (&s2), int* (&s3), string filename) {
    ifstream INDEX;
    INDEX.open(filename, ios::out);
    if (!INDEX) {
        cerr << "Ошибка. Файл INDEX.txt не может быть открыт!" << endl;
        system("pause");
    }
    for (int i = 0; i < amount; i++) INDEX >> s1[i];
    for (int i = 0; i < amount; i++) INDEX >> s2[i];
    for (int i = 0; i < amount; i++) INDEX >> s3[i];
    INDEX.close();
}