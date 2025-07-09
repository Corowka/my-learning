#include "List.h"
#include "BinaryTree.h"
#include <ctime>
#include <Windows.h>

bool parity(int value) {
	if (value % 2 == 0) return true;
	return false;
}

bool odd(int value) {
	if (value % 2 == 1) return true;
	return false;
}

int main() {

	srand(time(NULL));
	setlocale(LC_ALL, "Russian");

	std::cout << "�������:" << std::endl
		<< "�������� ���������, ������� ������ � ���������� ������ ����� �����," << std::endl
		<< "������� ����� ������ � �������� ��������� ������, ����� ������ � ����������" << std::endl
		<< "������ ������ � ������� ���������� �����, �� ���������� ��������." << std::endl << std::endl;

	List list;

	for (int i = 0; i < 10; i++) list.Add(/*rand() % 100*/i);

	std::cout << "���������� ������: ";
	list.Show(0);

	int size = list.Size();
	std::cout << "������ ������: " << size << std::endl;

	int* n = list.CreateArray(n, size); // �������� ������� ��������� ������

	std::cout << "����� ������ ��������� ������: " << list.Sum(parity) << std::endl;
	std::cout << "����� �������� ��������� ������: " << list.Sum(odd) << std::endl;

	NodeTree* test_tree = NULL;

	for (int i = 0; i < size; i++) test_tree = insert(n[i], test_tree);;

	std::cout << "���������� �����-���������: ";
	std::cout << devour(test_tree) << std::endl;

	//���������������� �������� ������
	test_tree = BuildBST(n, size);

	delete[] n;

	return 0;
}