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
		std::cout << "BynaryTree: The node with value <" << value << "> has been successfully created." << std::endl;
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
		//std::cout << "tree->left = " << tree->left << " tree->right = " << tree->right << " value = " << tree->value << std::endl;
		if (tree->left != NULL || tree->right != NULL) Count++;
		devour(tree->left);
		devour(tree->right);
	}
	return Count;
}
