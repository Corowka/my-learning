#include "Header.h"

int main() {

	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);

	std::cout << std::endl << "����� ���� ������ �������� ��������: " << std::endl;
	std::cout << -3 << " " << 1 << " ";
	recursion1(1, -3, 3);
	std::cout << std::endl << "����� ���� ������ ���������� ��������: " << std::endl;
	recursion2(0, 4);

    std::cout << std::endl << std::endl << "��������� ������������ � ������������������ �������: " << std::endl;
	int* a, Num = 1;
	a = new int[3];
	for (int i = 0; i < 3; i++)
		a[i] = i + 1;
	std::cout << std::setw(3) << Num++ << ": ";
	Print(a, 3);
	while (NextSet(a, 3)) {
		std::cout << std::setw(3) << Num++ << ": ";
		Print(a, 3);
	}

	std::cout << std::endl << "������������, ��������� �� 2 ���������, ��������� 4 ���������: " << std::endl;
	all_combinations(4, 2);
	std::cout << std::endl;
}