#pragma once
 
#include <windows.h>
#include<iomanip>
#include<iostream>
#include<cmath>
#include<fstream>
#include<string>

using namespace std;

/*
	Информация о сотрудниках фирмы включает ФИО, табельный номер,
	количество отработанных часов за месяц, почасовой тариф.Вывести размер за -
	работной платы каждого сотрудника.
*/

struct Data {

	Data() {

	}

	string FIO;
	string Number;
	union FullWageStats {

		FullWageStats() {

		}

		struct Wage {

			Wage() {

			}

			int Hours;
			int WagePerHour;

			~Wage() {

			}

		}Work;

		int Wage;

		~FullWageStats() {

		}

	}FullWage;

	~Data() {

	}
};

// Помощь...
extern string RightSewt(string value, int size);
extern string LeftSewt(string value, int size);
extern int Parsing(string value);
extern bool IsWord(string value);
extern string ConvertToString(int value);
extern bool IsFullFIO(string value);

// База данных
extern void Menu(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3), int* (&_s), int& sort);
extern void InputData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3));
extern void ChangeData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3));
extern void FindData(Data* (&d), int& amount);
extern void DeleteData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3));
extern void StoreData(Data* (&d), int& amount, string filename);
extern void ReadData(Data* (&d), int& amount, string filename);
extern void StoreIndex(Data* d, int amount, int* (&s1), int* (&s2), int* (&s3), string filename);
extern void ReadIndex(int amount, int* (&s1), int* (&s2), int* (&s3), string filename);