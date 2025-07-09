#include <iostream>
#include <Windows.h>

using namespace std;

class Heap {
    static const int SIZE = 100; // максимальный размер кучи
    int* h;         // указатель на массив кучи
    int HeapSize; // размер кучи
public:
    Heap() { // конструктор кучи 
        h = new int[SIZE];
        HeapSize = 0;
    }
    void addelem(int n) {  // добавление элемента кучи
        int i, parent;
        i = HeapSize;
        h[i] = n;
        parent = (i - 1) / 2;
        while (parent >= 0 && i > 0) {
            if (h[i] > h[parent]) {
                int temp = h[i];
                h[i] = h[parent];
                h[parent] = temp;
            }
            i = parent;
            parent = (i - 1) / 2;
        }
        HeapSize++;
    }
    void outHeap() { // вывод элементов кучи в форме кучи
        int i = 0;
        int k = 1;
        while (i < HeapSize) {
            while ((i < k) && (i < HeapSize)) {
                cout << h[i] << " ";
                i++;
            }
            cout << endl;
            k = k * 2 + 1;
        }
    }  
    int getmax() { // удаление вершины (максимального элемента)
        int x;
        x = h[0];
        h[0] = h[HeapSize - 1];
        HeapSize--;
        heapify(0);
        return(x);
    }  
    void heapify(int i) { // упорядочение кучи
        int left, right;
        int temp;
        left = 2 * i + 1;
        right = 2 * i + 2;
        if (left < HeapSize) {
            if (h[i] < h[left]) {
                temp = h[i];
                h[i] = h[left];
                h[left] = temp;
                heapify(left);
            }
        }
        if (right < HeapSize) {
            if (h[i] < h[right]) {
                temp = h[i];
                h[i] = h[right];
                h[right] = temp;
                heapify(right);
            }
        }
    }
};

//Пример
//Создать бинарную кучу из 16 элементов.Определить максимальный элемент.

int main() {

    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);

    Heap heap;
    int k;
    for (int i = 0; i < 16; i++) {
        //cout << "Введите элемент " << i + 1 << ": ";
        //cin >> k;
        
        heap.addelem(i);
    }
    heap.outHeap();
    cout << endl << "Максимальный элемент: " << heap.getmax();
    cout << endl << "Новая куча: " << endl;
    heap.outHeap();
    cout << endl << "Максимальный элемент: " << heap.getmax();
    cout << endl << "Новая куча: " << endl;
    heap.outHeap();
    cin.get(); cin.get();
    return 0;
}