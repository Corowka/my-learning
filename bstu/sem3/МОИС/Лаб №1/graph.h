#pragma once
#include <iostream>
#include <queue>

class Graph {
private:
	int* amountOfVertices;
	int* amountOfBranches;
	bool** branches;
public:
	Graph(int nV, int nBr, int** listOfBr) {
		amountOfVertices = new int;
		*amountOfVertices = nV;
		amountOfBranches = new int;
		*amountOfBranches = nBr;
		branches = new bool*[nV];
		for (int i = 0; i < *amountOfVertices; i++) {
			branches[i] = new bool[nV];
			for (int j = 0; j < *amountOfVertices; j++)
				branches[i][j] = false;
		}
		for (int i = 0; i < *amountOfBranches; i++) {
			branches[listOfBr[i][0] - 1][listOfBr[i][1] - 1] = true;
			branches[listOfBr[i][1] - 1][listOfBr[i][0] - 1] = true;
		}
	}
	~Graph() {
		for (int i = 0; i < *amountOfVertices; i++)
			delete[] branches[i];
		delete[] branches;
		delete amountOfVertices;
		delete amountOfBranches;
	}
	void printMatrix() {
		for (int i = 0; i < *amountOfVertices; i++) {
			std::cout << std::endl;
			for (int j = 0; j < *amountOfVertices; j++) {
				std::cout << branches[i][j] << ' ';
			}
		}
		std::cout << std::endl;
	}
	void printBranches() {
		for (int i = 0; i < *amountOfVertices; i++) {
			std::cout << i + 1 << " - ";
			for (int j = 0; j < *amountOfVertices; j++)
				if (branches[i][j] == true && i != j)
					std::cout << j + 1 << ' ';
			std::cout << std::endl;
		}
	}
	int calcComponentBFS() {
		int amountOfComponents = 0;
		bool* used = new bool[*amountOfVertices];
		for (int i = 0; i < *amountOfVertices; i++)
			used[i] = 0;
		std::queue<int> q;
		int fstUnusedVertice;

		while (true) {
			// is all used?
			for (int i = 0; i < *amountOfVertices; i++)
				if (used[i] == false) {
					fstUnusedVertice = i;
					break;
				}
			if (fstUnusedVertice == -1)
				return amountOfComponents;
			// BFS
			q.push(fstUnusedVertice);
			used[fstUnusedVertice] = true;
			while (!q.empty()) {
				int curent = q.front();
				q.pop();
				for (int neighbor = 0; neighbor < *amountOfVertices; neighbor++)
					if (branches[curent][neighbor] && !used[neighbor]) {
						q.push(neighbor);
						used[neighbor] = true;
					}
			}
			// add
			fstUnusedVertice = -1;
			amountOfComponents++;
		}
	}
	int calcComponentDFS() {
		int amountOfComponents = 0;
		bool* used = new bool[*amountOfVertices];
		for (int i = 0; i < *amountOfVertices; i++)
			used[i] = 0;
		int fstUnusedVertice;

		while (true) {
			// is all used?
			for (int i = 0; i < *amountOfVertices; i++) {
				if (!used[i]) {
					fstUnusedVertice = i;
					break;
				}
			}
			if (fstUnusedVertice == -1)
				return amountOfComponents;
			// DFS
			int curent = fstUnusedVertice;
			used[curent] = true;
			while (curent != -1) {
				for (int neighbor = 0; neighbor < *amountOfVertices; neighbor++) {
					if (branches[curent][neighbor] && !used[neighbor]) {
						curent = neighbor;
						used[neighbor] = true;
						break;
					}
					if (neighbor == *amountOfVertices - 1)
						curent = -1;
				}
			}
			// add
			fstUnusedVertice = -1;
			amountOfComponents++;
		}
	}
};