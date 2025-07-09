#pragma once
#include <iostream>
#include <iostream>

struct NodeTree {
	int value;
	NodeTree* left;
	NodeTree* right;
	NodeTree() {}
	~NodeTree() {}
};

// Добавление узла
NodeTree* insert(int value, NodeTree* tree) {
	if (tree == NULL) {
		tree = new NodeTree;
		tree->value = value;
		tree->left = NULL;
		tree->right = NULL;
		//std::cout << "BynaryTree: The node with value <" << value << "> has been successfully created." << std::endl;
	}
	else
		if (value < tree->value)
			tree->left = insert(value, tree->left);
		else
			tree->right = insert(value, tree->right);
	return tree;
}

// Обход дерева 
int devour(NodeTree* tree) {
	static int Count = 0;
	if (tree != NULL) {
		//std::cout << "node = " << & tree << " tree->left = " << tree->left << " tree->right = " << tree->right << " value = " << tree->value << std::endl;
		if (tree->left != NULL || tree->right != NULL) 
			Count++;
		devour(tree->left);
		devour(tree->right);
	}
	return Count;
}

// Создание Сбалансированного бинарного дерева
NodeTree* RunBuildBST(int* mass, int start, int end) {
	if (start > end)
		return NULL;
	int mid = start + (end - start + 1) / 2;
	NodeTree* root = new NodeTree;
	root->value = mass[mid];
	root->left = RunBuildBST(mass, start, mid - 1);
	root->right = RunBuildBST(mass, mid + 1, end);
	return root;
}
NodeTree* BuildBST(int* (&mass), int size) {
	int temp;
	for (int i = 0; i < size; i++)
		for (int j = 1; j < size - 1 - i; j++){
			if (mass[j] < mass[j + 1]) {
				temp = mass[j];
				mass[j] = mass[j + 1];
				mass[j + 1] = temp;
			}
		}
	if (mass == NULL || size == 0)
		return NULL;
	return RunBuildBST(mass, 0, size - 1);
}

