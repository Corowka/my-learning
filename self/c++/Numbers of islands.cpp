// Number of Islands

#include <iostream>

using namespace std;

// Прототипы функций 
int num_island(char grid[], int k, int n, int m);
void bypass_graph(char grid[], int k, int n, int m, int i, int j);

int main()
{
    int n, m;
    cin >> n >> m;
    int k = n * m;
    char *grid = new char[k];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) cin >> grid[m*i+j];
    }
    cout << num_island(grid, k, n, m);
    delete[] grid;
}

// Функции 

int num_island(char grid[], int k, int n, int m) {
    int island_count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[m * i + j] == '1') {
                bypass_graph(grid, k, n, m, i, j);
                island_count++;
            }
        }
    }
    return island_count;
}

void bypass_graph(char grid[], int k, int n, int m, int i, int j) {
    if (grid[m * i + j] == '1') {
        grid[m * i + j] = '2';
    }
    else {
        return;
    }
    if (i + 1 < k) {
        bypass_graph(grid, k, n, m, i + 1, j);
    }
    if (j + 1 < k) {
        bypass_graph(grid, k, n, m, i, j + 1);
    }
    if (i - 1 < k) {
        bypass_graph(grid, k, n, m, i - 1, j);
    }
    if (j - 1 < k) {
        bypass_graph(grid, k, n, m, i, j - 1);
    }
}