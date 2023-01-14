
#include "Header.h"
#include "graph.h"

int main()
{

    int amountOfVertices = 6;
    int amountOfBranches = 8;
    int** branchesList = new int*[8];
    for (int i = 0; i < amountOfBranches; i++)
        branchesList[i] = new int[2];
    branchesList[0][0] = 1;
    branchesList[0][1] = 2;
    branchesList[1][0] = 1;
    branchesList[1][1] = 4;
    branchesList[2][0] = 2;
    branchesList[2][1] = 3;
    branchesList[3][0] = 2;
    branchesList[3][1] = 4;
    branchesList[4][0] = 3;
    branchesList[4][1] = 4;
    branchesList[5][0] = 3;
    branchesList[5][1] = 6;
    branchesList[6][0] = 4;
    branchesList[6][1] = 5;
    branchesList[7][0] = 5;
    branchesList[7][1] = 6;

    Graph* graph = new Graph(amountOfVertices, amountOfBranches, branchesList);
    std::cout << "List of conected vertices:" << std::endl;
    graph->printBranches();
    std::cout << "Amount of components is " << graph->calcComponentBFS() << "(calculated with BFS)." << std::endl;
    std::cout << "Amount of components is " << graph->calcComponentDFS() << "(calculated with DFS)." << std::endl;
}
