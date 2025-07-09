#include "header.h"

inline void InputData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3)) {
	cout << "��� ����������� �������� ������� 1, ��� ������ ������� 0: ";
	int Back;
	cin >> Back;
	if (Back == 0)  return;
	int const NewAmount = amount + 1;
	if (amount == 0) {
		d = new Data[NewAmount];
	}
	else {
		Data* _d = new Data[amount];
		for (int i = 0; i < amount; i++) {
			_d[i].FIO = d[i].FIO;
			_d[i].Number = d[i].Number;
			_d[i].FullWage.Wage = d[i].FullWage.Wage;
		}
		d = new Data[NewAmount];
		for (int i = 0; i < amount; i++) {
			d[i].FIO = _d[i].FIO;
			d[i].Number = _d[i].Number;
			d[i].FullWage.Wage = _d[i].FullWage.Wage;
		}
	}
	cout << "������� ���: ";
	string fio;
	do {
		while (cin.get() != '\n');
		getline(cin, fio);
	} while (!IsWord(fio) && IsFullFIO);
	d[amount].FIO = fio;
	cout << "������� ��������� �����: ";
	string number;
	do {
		cin >> number;
	} while (IsWord(number));
	d[amount].Number = number;
	cout << "������� ���������� ����������� ����� �� �����: ";
	string hours;
	do {
		cin >> hours;
	} while (IsWord(hours));
	d[amount].FullWage.Work.Hours = Parsing(hours);
	cout << "������� ��������� �������� �����: ";
	string wage;
	do {
		cin >> wage;
	} while (IsWord(wage));
	d[amount].FullWage.Work.WagePerHour = Parsing(wage);
	d[amount].FullWage.Wage = d[amount].FullWage.Work.Hours * d[amount].FullWage.Work.WagePerHour;
	amount = NewAmount;
	StoreData(d, amount, "DATA.txt");
	StoreIndex(d, amount, s1, s2, s3, "INDEX.txt");
}

inline void ChangeData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3)) {
	if (amount != 0) {
		int Number;
		do {
			cout << "������� ����� ������, ������� ������ �������� (�� 1 �� " << amount << ") ��� 0 ��� ������ ��������: ";
			cin >> Number;
			if (Number == 0)  return;
			if (Number < 1 && amount < Number) {
				system("cls");
				cerr << "������: ������ � ����� ������� ������������! ���������� �����." << endl;
				system("pause");
				system("cls");
				continue;
			}
			cout << "������� ���: ";
			string fio;
			do {
				while (cin.get() != '\n');
				getline(cin, fio);
			} while (!IsWord(fio) && IsFullFIO);
			d[Number - 1].FIO = fio;
			cout << "������� ��������� �����: ";
			string number;
			do {
				cin >> number;
			} while (IsWord(number));
			d[Number - 1].Number = number;
			cout << "������� ���������� ����������� ����� �� �����: ";
			string hours;
			do {
				cin >> hours;
			} while (IsWord(hours));
			d[Number - 1].FullWage.Work.Hours = Parsing(hours);
			cout << "������� ��������� �������� �����: ";
			string wage;
			do {
				cin >> wage;
			} while (IsWord(wage));
			d[Number - 1].FullWage.Work.WagePerHour = Parsing(wage);
			d[Number - 1].FullWage.Wage = d[Number - 1].FullWage.Work.Hours * d[Number - 1].FullWage.Work.WagePerHour;
			StoreData(d, amount, "DATA.txt");
			StoreIndex(d, amount, s1, s2, s3, "INDEX.txt");
			break;
		} while (true);
	}
}

inline void FindData(Data* (&d), int& amount) {
	if (amount != 0) {
		int FindMark;
		do {
			cout << "1) ���." << endl;
			cout << "2) ��������� �����." << endl;
			cout << "3) �������� ����� �� �����." << endl;
			cout << "�������� ���� �� ����������������� ��������� ������ (�� 1 �� 3) ��� 0 ��� ������ ��������: ";
			cin >> FindMark;
			if (FindMark == 0)  return;
			if (1 <= FindMark && FindMark <= 3) break;
			cerr << "������: ������� ������ ���� �� ����������! ���������� ��� ���.";
			system("pause");
			system("cls");
		} while (true);
		string buf;
		int Number = -1;
		switch (FindMark) {
		case 1:
			cout << "������� ��� �������� ���������: ";
			cin >> buf;
			for (int i = 0; i < amount; i++) {
				cout << d[i].FIO << endl;
				if (d[i].FIO == buf) {
					Number = i;
					break;
				}
			}
			break;
		case 2:
			cout << "������� ��������� ����� �������� ���������: ";
			cin >> buf;
			for (int i = 0; i < amount; i++) {
				if (d[i].Number == buf) {
					Number = i;
					break;
				}
			}
			break;
		default:
			cout << "������� �������� ����� �������� ���������: ";
			cin >> buf;
			for (int i = 0; i < amount; i++) {
				if (d[i].FullWage.Wage == Parsing(buf)) {
					Number = i;
					break;
				}
			}
		}
		if (Number != -1) {
			cout << "���: " << d[Number].FIO << endl;
			cout << "��������� �����: " << d[Number].Number << endl;
			cout << "�������� �����: " << d[Number].FullWage.Wage << endl;
		}
		else cout << "��������� � ������ ������� �� ����������." << endl;
		system("pause");
	}
}

inline void DeleteData(Data* (&d), int& amount, int* (&s1), int* (&s2), int* (&s3)) {
	if (amount != 0) {
		int Number;
		do {
			cout << "������� ����� ��������� ������ (�� 1 �� " << amount << ") ��� 0 ��� ������ ��������: " << endl;
			cin >> Number;
			if (Number == 0) return;
			if (Number <= 1 && amount <= Number) {
				cerr << "������! ������� ������ �� ����������. ���������� �����." << endl;
				system("pause");
				system("cls");
			}
		} while (Number <= 1 && amount <= Number);
		int NewAmount = amount - 1;
		Data* _d = new Data[amount];
		for (int i = 0; i < amount; i++) {
			_d[i].FIO = d[i].FIO;
			_d[i].Number = d[i].Number;
			_d[i].FullWage.Wage = d[i].FullWage.Wage;
		}
		d = new Data[NewAmount];
		for (int i = 0, l = 0; i < amount; i++) {
			if (i + 1 != Number) {
				d[l].FIO = _d[l].FIO;
				d[l].Number = _d[l].Number;
				d[l].FullWage.Wage = _d[l].FullWage.Wage;
				l++;
			}
		}
		amount--;
		StoreData(d, amount, "DATA.txt");
		StoreIndex(d, amount, s1, s2, s3, "INDEX.txt");
		cout << "������ ������� �������." << endl;
	}
	else cout << "���� ������ �����." << endl;
	system("pause");
}