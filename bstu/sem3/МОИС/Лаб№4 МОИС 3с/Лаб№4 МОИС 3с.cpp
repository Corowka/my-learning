//#include<iostream>
//#include<vector>
//#include<algorithm>
//
//using namespace std;
//
//struct Node {
//	int start;
//	int end;
//	int length;
//	Node(int start, int end, int length) : 
//		start(start),
//		end(end),
//		length(length) {}
//};
//
//bool compare(Node a, Node b) {
//	return a.length < b.length;
//}
//
//void Kruskal(vector<Node>& arr, vector<bool>& visited) {
//	int M, N;
//	M = visited.size();
//	N = arr.size();
//	sort(arr.begin(), arr.end(), compare);
//	int weight = 0;
//	for (int i = 0; i < N; i++)
//		if (!visited[arr[i].start] || !visited[arr[i].end]) {
//			weight += arr[i].length;
//			visited[arr[i].start] = true;
//			visited[arr[i].end] = true;
//		}
//	cout << "Kruskal: min weight = " << weight << endl;
//}
//
//int main() {
//	vector<Node> arr = {
//		Node(1, 2, 5),
//		Node(1, 3, 2),
//		Node(1, 4, 3),
//		Node(2, 4, 3),
//		Node(3, 4, 2),
//		Node(3, 5, 6), 
//		Node(4, 5, 7), 
//		Node(4, 6, 5), 
//		Node(5, 6, 4) 
//	};
//	vector<bool> visited = { 0, 0, 0, 0, 0, 0, 0, 0, 0 };
//	Kruskal(arr, visited);
//}

//int main()
//{
//	int n = 6;
//	vector<vector<int>> matrix = {
//   // a b c d e f 
///*a*/{0,5,2,3,0,0},
///*b*/{5,0,0,3,0,0},
///*c*/{2,0,0,2,6,0},
///*d*/{3,3,2,0,7,5},
///*e*/{0,0,6,7,0,4},
///*f*/{0,0,0,5,4,0}
//	};
//	const int INF = 1000000000; 
//
//	// алгоритм
//	vector<bool> used(n);
//	vector<int> min_e(n, INF), sel_e(n, -1);
//	min_e[0] = 0;
//	int weight = 0;
//	for (int i = 0; i < n; ++i) {
//		int v = -1;
//		for (int j = 0; j < n; ++j)
//			if (!used[j] && (v == -1 || min_e[j] < min_e[v]))
//				v = j;
//		if (min_e[v] == INF) {
//			cout << "No MST!";
//			return 0;
//		}
//
//		used[v] = true;
//		if (sel_e[v] != -1)
//			weight += matrix[i][v];
//
//		for (int to = 0; to < n; ++to)
//			if (matrix[v][to] < min_e[to]) {
//				min_e[to] = matrix[v][to];
//				sel_e[to] = v;
//			}
//	}
//	cout << "Prim: min weight = " << weight << endl;
//}

#include<iostream>
#include<vector>
#include<set>

using namespace std;

void FloydWarshall(vector<vector<int>> matrix, int numberOfVert) {
    for (int k = 0; k < numberOfVert; k++) {
        for (int i = 0; i < numberOfVert; i++) {
            for (int j = 0; j < numberOfVert; j++) {
                min(matrix[i][j], matrix[i][k] + matrix[k][j]);
            }
        }
    }

    return;
}

int main()
{
    int n = 7;
    vector<vector<int>> matrix = {
           // a           b          c          d           e           f           g
        /*a*/{INT_MAX,    5,         INT_MAX,   6,          8,          INT_MAX,    INT_MAX},
        /*b*/{5,          INT_MAX,   6,         3,          INT_MAX,    INT_MAX,    INT_MAX},
        /*c*/{INT_MAX,    6,         INT_MAX,   6,          INT_MAX,    INT_MAX,    INT_MAX},
        /*d*/{6,          3,         6,         INT_MAX,    4,          2,          INT_MAX},
        /*e*/{8,          INT_MAX,   INT_MAX,   4,          INT_MAX,    INT_MAX,    5},
        /*f*/{INT_MAX,    INT_MAX,   INT_MAX,   2,          INT_MAX,    INT_MAX,    3},
        /*g*/{INT_MAX,    INT_MAX,   INT_MAX,   INT_MAX,    5,          3,          INT_MAX}
    };


    FloydWarshall(matrix, n);

    for (int i = 0; i < n; i++)
        cout << "0 -> " << i << " = " << matrix[0][i] << endl;
}

   /* int st = 0;
    bool* visited = new bool[n];
    int* D = new int[n];
    for (int i = 0; i < n; i++)
    {
        D[i] = w[st][i];
        visited[i] = false;
    }
    D[st] = 0;
    int index = 0, u = 0;
    for (int i = 0; i < n; i++)
    {
        int min = INT_MAX;
        for (int j = 0; j < n; j++)
        {
            if (!visited[j] && D[j] < min)
            {
                min = D[j];
                index = j;
            }
        }
        u = index;
        visited[u] = true;
        for (int j = 0; j < n; j++)
        {
            if (!visited[j] && w[u][j] != INT_MAX && D[u] != INT_MAX && (D[u] + w[u][j] < D[j]))
            {
                D[j] = D[u] + w[u][j];
            }
        }
    }
    for (int i = 0; i < n; i++)
    {
        if (D[i] != INT_MAX)
            cout << st << " -> " << i << " = " << D[i] << endl;
        else
            cout << st << " -> " << i << " = " << "маршрут недоступен" << endl;
    }*/
    //matrix - матрица смежности
   
//}
