#include "Graph.h"

struct Branch {
	int lv;
	int rv;
	int w;
};

void push_elem(int* (&arr), int& size, const int &elem) {
	int* buf = new int[size];
	for (int i = 0; i < size; i++)
		buf[i] = arr[i];
	delete[] arr;
	arr = new int[size + 1];
	for (int i = 0; i < size; i++)
		arr[i] = buf[i];
	size++;
	arr[size - 1] = elem;
	delete[] buf;
}

int pop_front_elem(int* (&arr), int& size) {
	int res = arr[size - 1];
	int* buf = new int[size - 1];
	size--;
	for (int i = 0; i < size; i++)
		buf[i] = arr[i];
	delete[] arr;
	arr = new int[size];
	for (int i = 0; i < size; i++)
		arr[i] = buf[i];
	delete[] buf;
	return res;
}

int pop_back_elem(int* (&arr), int& size) {
	int res = arr[0];
	size--;
	int* buf = new int[size];
	for (int i = 0; i < size; i++)
		buf[i] = arr[i + 1];
	delete[] arr;
	arr = new int[size];
	for (int i = 0; i < size; i++)
		arr[i] = buf[i];
	delete[] buf;
	return res;
}

int parse_number(std::string str) {
	int len = str.size();
	int val = 0;
	for (int i = 0; i < len; i++)
		val += int((str[i] - '0') * pow(10, len - i - 1));
	return val;
}

void show(int* (&arr), const int& size) {
	for (int i = 0; i < size; i++)
		cout << arr[i] << ' ';
	cout << endl;
}

/* ---public--- */
Graph::Graph(int v, int br, string branch_list) {
	vertices = v;
	branches = br;
	double weight = 1.0;
	std::string value = "";
	int len = branch_list.size();
	int size = 0;
	int* arr = new int[size];
	for (int i = 0; i < len; i++) {
		if ('0' <= branch_list[i] && branch_list[i] <= '9')
			value += branch_list[i];
		else if (value != "") {
			push_elem(arr, size, parse_number(value));
			value = "";
		}
	}
	matrix = new bool* [v];
	for (int i = 0; i < v; i++) {
		matrix[i] = new bool[v];
		for (int j = 0; j < v; j++)
			matrix[i][j] = 0;
	}
	for (int i = 0; i < size; i += 2) {
		matrix[arr[i] - 1][arr[i + 1] - 1] = 1;
		matrix[arr[i + 1] - 1][arr[i] - 1] = 1;
	}
	delete[] arr;
}

Graph::Graph(int v, int br, string list, int weights[]) : Graph(v, br, list) {
	for (int i = 0; i < branches; i++)
		weight[i] = weights[i];
}


Graph::~Graph() {
	for (int i = 0; i < vertices; i++)
		delete[] matrix[i];
	delete[] matrix;
	delete[] weight;
}

void Graph::PRINT_MATRIX() {
	cout << " Ajacency matrix:";
	for (int i = 0; i < vertices; i++) {
		cout << endl;
		for (int j = 0; j < vertices; j++)
			cout << setw(2) << matrix[i][j];
	}
	cout << endl;
}

void Graph::DFS(int*& arr, int& size, int start) {
	int s_size = 0;
	int* stack = new int[s_size];
	bool* used = new bool[vertices];
	for (int i = 0; i < vertices; i++)
		used[i] = 0;
	push_elem(stack, s_size, start - 1);
	used[start - 1] = 1;
	while (s_size > 0) {
		int v = pop_front_elem(stack, s_size);
		push_elem(arr, size, v);
		for (int i = 0; i < vertices; i++)
			if (matrix[v][i] && !used[i]) {
				push_elem(stack, s_size, i);
				used[i] = 1;
				break;
			}
	}
	delete[] stack;
	delete[] used;
}

void Graph::BFS(int* &arr, int& size, int start) {
	int q_size = 0;
	int* queue = new int[q_size];
	bool* used = new bool[vertices];
	for (int i = 0; i < vertices; i++)
		used[i] = 0;
	push_elem(queue, q_size, start - 1);
	used[start - 1] = 1;
	while (q_size > 0) {
		int v = pop_back_elem(queue, q_size);
		push_elem(arr, size, v);
		for (int i = 0; i < vertices; i++)
			if (matrix[v][i] && !used[i]) {
				push_elem(queue, q_size, i);
				used[i] = 1;
			}
	}
	delete[] queue;
	delete[] used;
}

void Graph::PRINT_DFS(int start) {
	int size = 0;
	int* arr = new int[size];
	DFS(arr, size, start);
	cout << " DFS(" << start << "):";
	for (int i = 0; i < size; i++)
		cout << setw(3) << arr[i] + 1;
	cout << endl;
}

void Graph::PRINT_BFS(int start) {
	int size = 0;
	int* arr = new int[size];
	BFS(arr, size, start);
	cout << " BFS(" << start << "):";
	for (int i = 0; i < size; i++)
		cout << setw(3) << arr[i] + 1;
	cout << endl;
}
 
int Graph::CALC_COMPONENTS_DFS() {
	int count = 0;
	bool* used = new bool[vertices];
	for (int i = 0; i < vertices; i++)
		used[i] = 0;
	for (int i = 0; i < vertices; i++) {
		if (used[i])
			continue;
		int size = 0;
		int* arr = new int[size];
		DFS(arr, size, i + 1);
		for (int j = 0; j < size; j++)
			used[arr[j]] = 1;
		delete[] arr;
		count++;
	}
	delete[] used;
	return count;
}

int Graph::CALC_COMPONENTS_BFS() {
	int count = 0;
	bool* used = new bool[vertices];
	for (int i = 0; i < vertices; i++)
		used[i] = 0;
	for (int i = 0; i < vertices; i++) {
		if (used[i])
			continue;
		int size = 0;
		int* arr = new int[size];
		BFS(arr, size, i + 1);
		for (int j = 0; j < size; j++)
			used[arr[j]] = 1;
		delete[] arr;
		count++;
	}
	delete[] used;
	return count;
}

void Graph::PRINT_AMOUNT_COMPONENTS_DFS() { cout << " Amount of components(DFS): " << CALC_COMPONENTS_DFS() << endl; }

void Graph::PRINT_AMOUNT_COMPONENTS_BFS() { cout << " Amount of components(BFS): " << CALC_COMPONENTS_BFS() << endl; }

bool Graph::HAMILTONIAN_PATH(int*& arr, int& size, int start) {
	// is Gamelton ?
	if (vertices < 2) return false;
	if (CALC_COMPONENTS_BFS() > 1) return false;
	if (CALC_COMPONENTS_BFS() > 1) return false;
	for (int i = 0; i < vertices; i++) {
		int P = 0;
		for (int j = 0; j < vertices; j++)
			if (matrix[i][j]) P++;
		if (P < 2) return false;
	}

	// find path
	bool* used = new bool[vertices];
	for (int i = 0; i < vertices; i++)
		used[i] = 0;
	int s_size = 0;
	int* stack = new int[s_size];
	push_elem(stack, s_size, start - 1);
	used[start - 1] = true;
	for (int i = 0; i < vertices; i++)
		for (int j = 0; j < vertices; j++) 
			for (int k = 0; k < vertices; k++)
				if (!used[k] && matrix[j][k]) {
					push_elem(stack, s_size, k);
					used[k] = true;
					break;
				}
	if (matrix[start - 1][stack[s_size - 1]])
		push_elem(stack, s_size, start - 1);
	if (stack[s_size - 1] == start - 1 && s_size == vertices + 1) {
		for (int i = 0; i < s_size; i++)
			push_elem(arr, size, stack[i]);
		delete[] stack;
		delete[] used;
		return true;
	}
	else {
		delete[] stack;
		delete[] used;
		return false;
	}
}

void Graph::PRINT_HAMILTONIAN_PATH(int start) {
	int size = 0;
	int* arr = new int[size];
	cout << " Hameltonian cycle (" << start << "): ";
	if (HAMILTONIAN_PATH(arr, size, start)) {
		for (int i = 0; i < size; i++)
			cout << arr[i] + 1 << ' ';
	}
	else {
		cout << "doesn't exist";
	}
	cout << endl;
}

bool Graph::EULER_PATH(int*& arr, int& size, int start) {
	// is Euler ?
	if (vertices < 2) return false;
	if (CALC_COMPONENTS_BFS() > 1) return false;
	for (int i = 0; i < vertices; i++) {
		int P = 0;
		for (int j = 0; j < vertices; j++)
			if (matrix[i][j]) P++;
		if (P % 2 != 0 || P < 2) return false;
	}

	// find path
	bool** used = new bool*[vertices];
	for (int i = 0; i < vertices; i++) {
		used[i] = new bool[vertices];
		for (int j = 0; j < vertices; j++)
			used[i][j] = (matrix[i][j]) ? 0 : 1;
	}
	int s_size = 0;
	int* stack = new int[s_size];
	push_elem(stack, s_size, start - 1);
	while (s_size != 0) {
		int w = stack[s_size - 1];
		bool found_edge = false;
		for (int i = 0; i < vertices; i++)
			if (!used[w][i]) {
				push_elem(stack, s_size, i);
				used[w][i] = 1;
				used[i][w] = 1;
				found_edge = true;
				break;
			}
		if (!found_edge)
			push_elem(arr, size, pop_back_elem(stack, s_size));
	}
	return ((arr[0] == arr[size - 1]) ? true : false);
}

void Graph::PRINT_EULER_PATH(int start) {
	int size = 0;
	int* arr = new int[size];
	cout << " Euler cycle (" << start << "): ";
	if (EULER_PATH(arr, size, start)) {
		for (int i = 0; i < size; i++)
			cout << arr[i] + 1 << ' ';
	}
	else {
		cout << "doesn't exist";
	}
	cout << endl;
}

void Graph::KRUSKAL(int*& arr, int& size) {
	/* 
	int m;
vector < pair < int, pair<int,int> > > g (m); // вес - вершина 1 - вершина 2

int cost = 0;
vector < pair<int,int> > res;

sort (g.begin(), g.end());
vector<int> tree_id (n);
for (int i=0; i<n; ++i)
	tree_id[i] = i;
for (int i=0; i<m; ++i)
{
	int a = g[i].second.first,  b = g[i].second.second,  l = g[i].first;
	if (tree_id[a] != tree_id[b])
	{
		cost += l;
		res.push_back (make_pair (a, b));
		int old_id = tree_id[b],  new_id = tree_id[a];
		for (int j=0; j<n; ++j)
			if (tree_id[j] == old_id)
				tree_id[j] = new_id;
	}
}
	*/
	
}

void Graph::PRINT_KRUSCAL() {
	int size = 0;
	int* arr = new int[size];
	cout << " Minimal island tree: ";
	KRUSKAL(arr, size);
	for (int i = 0; i < size; i++)
		cout << arr[i] << ' ';
	cout << endl;
}

void Graph::PRIM(int*& arr, int& size) {

}

void Graph::PRINT_PRIM() {
	int size = 0;
	int* arr = new int[size];
	cout << " Minimal island tree: ";
	PRIM(arr, size);
	for (int i = 0; i < size; i++)
		cout << arr[i] << ' ';
	cout << endl;
}

