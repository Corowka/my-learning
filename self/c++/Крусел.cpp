#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
struct Node // Сохранить график как структуру данных
{
	int start;
	int end;
	int length;
};
bool compare(Node a, Node b)
{
	return a.length < b.length;
}
void Kruskal(vector<Node>& arr, vector<bool>& visited)
{
	int M, N;
	M = visited.size();
	N = arr.size();
	for (int i = 0; i < N; i++)
	{
		cin >> arr[i].start >> arr[i].end >> arr[i].length;
	}
	sort(arr.begin(), arr.end(), compare);
	/*int weight = 0;
	for (int i = 0; i < N; i++)
	{
		if (!visited[arr[i].start] || !visited[arr[i].end])
		{
			weight += arr[i].length;
			visited[arr[i].start] = true;
			visited[arr[i].end] = true;
		}
	}
	cout << "Минимальный вес связующего дерева:";
	cout << weight << endl;*/
}
int main()
{
	int M, N;
	cin >> M >> N;
	vector<Node> arr(N);
	vector<bool> visited(M);
	Kruskal(arr, visited);
}