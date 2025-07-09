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

	std::cout << "Задание:" << std::endl
		<< "Написать программу, которая вводит с клавиатуры список целых чисел," << std::endl
		<< "считает суммы четных и нечетных элементов списка, затем вводит с клавиатуры" << std::endl
		<< "дерево поиска и считает количество узлов, не являющихся листьями." << std::endl << std::endl;

	List list;

	for (int i = 0; i < 10; i++) list.Add(/*rand() % 100*/i);

	std::cout << "Содержимое списка: ";
	list.Show(0);

	int size = list.Size();
	std::cout << "Размер списка: " << size << std::endl;

	int* n = list.CreateArray(n, size); // Создание массива элементов списка

	std::cout << "Сумма чётных элементов списка: " << list.Sum(parity) << std::endl;
	std::cout << "Сумма нечётных элементов списка: " << list.Sum(odd) << std::endl;

	NodeTree* test_tree = NULL;

	for (int i = 0; i < size; i++) test_tree = insert(n[i], test_tree);;

	std::cout << "Количество узлов-родителей: ";
	std::cout << devour(test_tree) << std::endl;

	//Сбалансированное бинарное дерево
	test_tree = BuildBST(n, size);

	delete[] n;

	return 0;
}