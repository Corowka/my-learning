#include <iostream>
#include <string>
#include <cmath>

using namespace std;

struct workers {
    struct tag_fio {
        union fio_un {
            char unknown;
            string str;
        };
        union fio_un last;
        union fio_un first;
        union fio_un otch;
    }fio;
    union num_un {
        char unknown;
        unsigned num;
        string str;
    };
    union num_un number;
    union num_un hours;
    union num_un wage;
    struct holder{
        unsigned l : 1;
        unsigned f : 1;
        unsigned o : 1;
        unsigned n : 1;
        unsigned h : 1;
        unsigned w : 1;
    }bit;
}worker[100];

// Прототипы функций
void input(int i);
void output(int i);

int main()
{
    setlocale(LC_ALL, "Russian");

    /*int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        input(i);
    }*/
    int i = 3;
    input(i);
    //output(i);
    return 0;
}

// Фукнции 

// Меню
void menu() {

}

void input(int i) {
    worker[0].fio.last.str = "Копанчук";//
    worker[0].fio.last.str = "Евгений";//
    worker[0].fio.last.str = "Романович";//
    cout << "Введите фамилию: ";
    cin >> worker[i].fio.last.str;
    worker[i].bit.l = 1;
    if (worker[i].fio.last.str == "-") {
        worker[i].fio.last.unknown = '-';
        worker[i].bit.l = 0;
    }
    cout << "Введите имя: ";
    cin >> worker[i].fio.first.str;
    worker[i].bit.f = 1;
    if (worker[i].fio.last.str == "-") {
        worker[i].fio.first.unknown = '-';
        worker[i].bit.f = 0;
    }
    cout << "Введите отчество: ";
    cin >> worker[i].fio.otch.str;
    worker[i].bit.o = 1;
    if (worker[i].fio.last.str == "-") {
        worker[i].fio.first.unknown = '-';
        worker[i].bit.f = 0;
    }
    cout << "Введите табельный номер: ";
    worker[i].number.str = i * 10;//
    cin >> worker[i].number.str;
    worker[i].bit.n = 1;
    if (worker[i].number.str == "-") {
        worker[i].number.unknown = '-';
        worker[i].bit.n = 0;
    }
    else {
        string s = worker[i].fio.last.str;
        int len = s.size();
        for (int i = len, de = 0; i >= 0; i--) {
            worker[i].number.num += (s[i] - '0') * pow(10, de);
        }
    }
    cout << "Введите количество отработанных часов за месяц: ";
    worker[i].hours.str = i * 100;//
    cin >> worker[i].hours.str;
    worker[i].bit.h = 1;
    if (worker[i].hours.str == "-") {
        worker[i].hours.unknown = '-';
        worker[i].bit.h = 0;
    }
    else {
        string s = worker[i].hours.str;
        int len = s.size();
        for (int i = len, de = 0; i >= 0; i--) {
            worker[i].hours.num += (s[i] - '0') * pow(10, de);
        }
    }
    cout << "Введите почасовой тариф: ";
    worker[i].wage.str = i;//
    cin >> worker[i].wage.str;
    worker[i].bit.w = 1;
    if (worker[i].wage.str == "-") {
        worker[i].wage.unknown = '-';
        worker[i].bit.w = 0;
    }
    else {
        string s = worker[i].wage.str;
        int len = s.size();
        for (int i = len, de = 0; i >= 0; i--) {
            worker[i].wage.num += (s[i] - '0') * pow(10, de);
        }
    }
    system("cls"); 
}

//void output(int i) {
//    enum { ФИО, Номер, Часы, Тариф, Всё };
//    unsigned settings;
//    settings = Всё;
//    cout << "-----------------------------------------" << endl;
//    switch (settings) {
//    case (4):
//        cout << "ФИО: " << worker[0].fio.last << " ";
//        cout << worker[0].fio.first << " ";
//        cout << worker[0].fio.otch << " " << endl;
//        cout << "Табельный номер: " << worker[i].num.number << endl;
//        cout << "Количество отработаных часов за месяц: " << worker[i].num.hours << endl;
//        cout << "Почасовой тариф: " << worker[i].num.wage << endl;
//        break;
//    default:
//        cout << "!Error: non-existing item";
//        break;
//    }
//    cout << "-----------------------------------------" << endl;
//}

// Сортировка и вывод
void sort();