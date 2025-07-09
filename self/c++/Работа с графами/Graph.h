#pragma once
#include <iostream>
#include <iomanip>
#include <queue>

class Graph {
public:
	int* Vertices;
	int** Matrix;

	struct Branch {
		int start;
		int end;
		int weight;
		Branch(){}
		~Branch(){}
	};

	Graph() {
		std::cout << "Enter the number of graph vertices: ";
		Vertices = new int;
		std::cin >> *Vertices;
		Matrix = new int*[*Vertices];
		std::cout << "Enter the graph incidence matrix: " << std::endl;
		for (int i = 0; i < *Vertices; i++) {
			Matrix[i] = new int[*Vertices];
			for (int j = 0; j < *Vertices; j++)
				std::cin >> Matrix[i][j];
		}
	}
	~Graph() {
		for (int i = 0; i < *Vertices; i++) delete[] Matrix[i];
		delete[] Matrix;
		delete Vertices;
	}

	// Создание массива ребер и их весов
	void CreateBranch(Branch* (&M), int& BranchAmount) {
		int size = 0;
		for (int i = 1; i <= *Vertices; i++) size += i;
		Branch* buf = new Branch[size];
		int l = 0;
		for (int i = 0; i < *Vertices; i++) 
			for (int j = i; j < *Vertices; j++) 
				if (Matrix[i][j] != 0) {
					buf[l].start = i;
					buf[l].end = j;
					buf[l].weight = Matrix[i][j];
					l++;
				}
		BranchAmount = l;
		M = new Branch[l];
		for (int i = 0; i < l; i++) {
			M[i] = buf[i];
			/*std::cout << " #" << i + 1 << " start = " << M[i].start
			<< " end = " << M[i].end << " weight = " << M[i].weight << std::endl;*/
		}
		delete[] buf;
	}

	// Декстра: посик кратчацшего пути от выбранной вершины к остальным
	void Dextra(int A, int* P) {
		int const infinity = 999999;
		A--;
		bool ready = false;
		// Массив ребер
		int BranchAmount;
		Branch* M;
		CreateBranch(M, BranchAmount);
		// Массив пройденых вершин 
		bool* Used = new bool[*Vertices];
		// Неокончательный кратчайший путь 
		int* D = new int[*Vertices];
		// Массив конечных длин путей
		P = new int[*Vertices];

		// Алгоритм
		for (int i = 0; i < *Vertices; i++) {
			Used[i] = false;
			D[i] = infinity;
		}
		D[A] = 0; 
		P[A] = 0;
		int CurVert;
		int Count = 0;
		while (!ready) {
			CurVert = infinity;
			for (int i = 0; i < *Vertices; i++) {
				if (Used[i] == false) {
					if (CurVert == infinity) CurVert = i;
					if (D[CurVert] > D[i]) CurVert = i;
					Count++;
				}
			}
			if (Count == 0) break;
			Count = 0;
			Used[CurVert] = true;
			for (int i = 0; i < *Vertices; i++)
				if (Used[i] == false) {
					for (int j = 0; j < BranchAmount; j++)
						if ((M[j].start == CurVert && M[j].end == i || M[j].end == CurVert && M[j].start == i) && D[i] > D[CurVert] + M[j].weight)
							D[i] = D[CurVert] + M[j].weight;
				}
		}
		A++;
		std::cout << "D'extra: The length of the path from " << A << " to the vertices of the graph is ";
		for (int i = 0; i < *Vertices; i++) {
			P[i] = D[i];
			std::cout << A << "->" << i + 1 << "=" << P[i] << " ";
		}
		std::cout << std::endl << std::endl;
		delete[] M;
		delete[] Used;
		delete[] D;
	}

	// Флойд-Уоршал: поиск кратчайшего пути
	void FloydWarshll(int** dist) {
		int const infinity = 999999;
		dist = new int* [*Vertices];
		for (int i = 0; i < *Vertices; i++) {
			dist[i] = new int[*Vertices];
			for (int j = 0; j < *Vertices; j++)
				dist[i][j] = (Matrix[i][j] != 0) ? Matrix[i][j] : infinity;
		}
		for (int k = 0; k < *Vertices; k++)
			for (int i = 0; i < *Vertices; i++)
				for (int j = 0; j < *Vertices; j++)
					dist[i][j] = std::min(dist[i][j], dist[j][k] + dist[k][j]);
		std::cout << "FloydWarshll: Matrix of shortest path:" << std::endl << "FlW ";
		for (int i = 0; i < *Vertices; i++) std::cout << std::setw(2) << i + 1 << ":";
		for (int i = 0; i < *Vertices; i++) {
			std::cout << std::endl << i + 1 << ": ";
			for (int j = 0; j < *Vertices; j++) {
				if (i == j) dist[i][j] = 0;
				std::cout << std::setw(3) << dist[i][j];
			}
		}
		std::cout << std::endl << std::endl;
		for (int i = 0; i < *Vertices; i++)
			delete[] dist[i];
		delete[] dist;
	}
	
	// Поиск в глубину
	void DFS(int CurrentVertix, int FinishVertix) {
		FinishVertix--;
		bool* Used = new bool[*Vertices];
		int BranchAmount;
		Branch* M;
		CreateBranch(M, BranchAmount);
		if (RunDFS(CurrentVertix, FinishVertix, Used, M))
			std::cout << "DFS: the path exists." << std::endl;
		else 
			std::cout << "DFS: the path doesn't exists." << std::endl;
		delete[] Used;
	}
	bool RunDFS(int CurrentVertix, int FinishVertix, bool* Used, Branch* M) {
		int const infinity = 999999;
		if (CurrentVertix == FinishVertix) 
			return true;
		for (int i = 0; i < *Vertices; i++) 
			if (Used[i] == FinishVertix)
				return true;
		for (int i = 0; i < *Vertices; i++)
			if (M[i].start == CurrentVertix || M[i].end == CurrentVertix)
				for (int i = 0; i < *Vertices; i++)
					if (!Used[i] && RunDFS(i, FinishVertix, Used, M))
						return true;
		return false;
	}

	// Поиск в ширину
	void BFS(int StartVertix, int FinishVertix) {
		StartVertix--;
		FinishVertix--;
		bool* Used = new bool[*Vertices];
		Used[0] = true;
		for (int i = 1; i < *Vertices; i++)
			Used[i] = false;
		std::queue<int> q;
		q.push(StartVertix);
		while (!q.empty()) {
			int cur = q.front();
			q.pop();
			for (int i = 0; i < *Vertices; i++) { 
				if (!Used[i] && Matrix[cur][i]) {
					q.push(i);
					Used[i] = true;
					if (i == FinishVertix) {
						std::cout << "BFS: the path exists." << std::endl;
						delete[] Used;
						return;
					}
				}
			}
		}
		std::cout << "BFS: the path doesn't exists." << std::endl;
		delete[] Used;
	}

	// Крускал: поиск минимального дерева
	void Kruskal() {
		// Создание массива ребер
		int BranchAmount;
		Branch* M;
		CreateBranch(M, BranchAmount);
		// Создание массива посещённых вершин
		bool* Used = new bool[*Vertices];
		for (int i = 0; i < *Vertices; i++) {
			Used[i] = false;
		}
		// Сортировка ребер по весу
		int temp;
		for (int i = 0; i < *Vertices - 1; i++)
			for (int j = 1; j < *Vertices - 1 - i; j++) {
				if (M[j].weight < M[j + 1].weight) {
					temp = M[j].weight;
					M[j].weight = M[j + 1].weight;
					M[j + 1].weight = temp;
				}
			}
		int MinTreeWeight = 0;
		for (int i = 0; i < *Vertices; i++) {
			if ((!Used[M[i].start] || !Used[M[i].end]) && M[i].start != M[i].end) {
				MinTreeWeight += M[i].weight;
				Used[M[i].start] = true;
				Used[M[i].end] = true;
			}
		}
		// Вывод веса минимального дерева
		std::cout << "Kruskal: the weight of the minimum island tree is "
			<< MinTreeWeight << "." << std::endl;
		// Освобождение памяти динамических структур
		delete[] M;
		delete[] Used;
	}

	// Прим: поиск минимального островного дерева
	void Prim() {
		int const infinity = 999999;
		int AmountOfSelectedVertices = 1;
		bool* Used = new bool[*Vertices];
		Used[0] = true;
		for (int i = 1; i < *Vertices; i++)
			Used[i] = false;
		std::cout << "Prim:" << std::endl << " Brances : " 
			<< std::setw(8) << "Weight : " << std::endl;
		int Min, BranchStart, BranchEnd;
		while (AmountOfSelectedVertices < *Vertices) {
			Min = infinity;
			BranchStart = 0;
			BranchEnd = 0;
			for (int i = 0; i < *Vertices; i++)
				if (Used[i]) {
					for (int j = 0; j < *Vertices; j++)
						if (!Used[j] && Matrix[i][j] && Min > Matrix[i][j]) {
							Min = Matrix[i][j];
							BranchStart = i;
							BranchEnd = j;
						}
			}
			if (BranchStart != BranchEnd)
				std::cout << std::setw(3) << BranchStart << "  - " << std::setw(2) << BranchEnd
				<< std::setw(8) << Matrix[BranchStart][BranchEnd] << std::endl;
			Used[BranchEnd] = true;
			AmountOfSelectedVertices++;
		}
		delete[] Used;
	}
};