#pragma once
#include<iostream>
#include<iomanip>
#include<cmath>
#include<string>
#include<vector>

using std::cout;
using std::endl;
using std::string;
using std::setw;
using std::swap;
using std::vector;

class Graph
{
private:
	bool** matrix;
	int vertices;
	int branches;
	int* weight;
public:
	Graph(int v, int br, string list);
	Graph(int v, int br, string list, int weights[]);
	~Graph();
	void CREATE_BRANCH_LIST(int**& arr, int& size);
	void PRINT_MATRIX();
	void DFS(int*& arr, int& size, int start);
	void BFS(int*& arr, int& size, int start);
	void PRINT_DFS(int start);
	void PRINT_BFS(int start);
	int CALC_COMPONENTS_DFS();
	int CALC_COMPONENTS_BFS();
	void PRINT_AMOUNT_COMPONENTS_DFS();
	void PRINT_AMOUNT_COMPONENTS_BFS();	
	bool HAMILTONIAN_PATH(int*& arr, int& size, int start);
	void PRINT_HAMILTONIAN_PATH(int start);
	bool EULER_PATH(int*& arr, int& size, int start);
	void PRINT_EULER_PATH(int start);
	void KRUSKAL(int*& arr, int& size);
	void PRINT_KRUSCAL();
	void PRIM(int*& arr, int& size);
	void PRINT_PRIM();
};

