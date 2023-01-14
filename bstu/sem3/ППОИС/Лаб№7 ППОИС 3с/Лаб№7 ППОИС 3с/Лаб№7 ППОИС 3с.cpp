#include <iostream>
#include <iomanip>
#include <string>

using std::cout;
using std::endl;
using std::setw;
using std::string;
using std::cerr;

template<typename T>
class STACK {
private:
    T* arr;
    int size;
public:
    STACK(); 
    ~STACK();
    void PUSH(T elem);
    T POP();
    void PRINT();
};

template <typename T>
STACK<T>::STACK() {
    size = 0;
    arr = new T[size];
}
template <typename T>
STACK<T>::~STACK() {
    delete[] arr;
}
template <typename T>
void STACK<T>::PUSH(T elem){
    T* buf = new T[size];
    for (int i = 0; i < size; i++)
        buf[i] = arr[i];
    delete[] arr;
    arr = new T[size + 1];
    for (int i = 0; i < size; i++)
        arr[i] = buf[i];
    size++;
    arr[size - 1] = elem;
}
template <typename T>
T STACK<T>::POP() {
    size--;
    T elem = arr[size];
    T* buf = new T[size];
    for (int i = 0; i < size; i++)
        buf[i] = arr[i];
    delete[] arr;
    arr = new T[size];
    for (int i = 0; i < size; i++)
        arr[i] = buf[i];
    return elem;
}
template <typename T>
void STACK<T>::PRINT() {
    cout << "STACK: ";
    for (int i = 0; i < size; i++)
        cout << arr[i] << ' ';
    cout << endl;
}

template<typename T>
class QUEUE {
private:
    T* arr;
    int size;
public:
    QUEUE();
    ~QUEUE();
    void PUSH(T elem);
    T POP();
    void PRINT();
};

template <typename T>
QUEUE<T>::QUEUE() {
    size = 0;
    arr = new T[size];
}
template <typename T>
QUEUE<T>::~QUEUE() {
    delete[] arr;
}
template <typename T>
void QUEUE<T>::PUSH(T elem) {
    T* buf = new T[size];
    for (int i = 0; i < size; i++)
        buf[i] = arr[i];
    delete[] arr;
    arr = new T[size + 1];
    for (int i = 0; i < size; i++)
        arr[i] = buf[i];
    size++;
    arr[size - 1] = elem;
}
template <typename T>
T QUEUE<T>::POP() {
    size--;
    T elem = arr[0];
    T* buf = new T[size];
    for (int i = 0; i < size; i++)
        buf[i] = arr[i] + 1;
    delete[] arr;
    arr = new T[size];
    for (int i = 0; i < size; i++)
        arr[i] = buf[i];
    return elem;
}
template <typename T>
void QUEUE<T>::PRINT() {
    cout << "QUEUE: ";
    for (int i = 0; i < size; i++)
        cout << arr[i] << ' ';
    cout << endl;
}

template<typename T1, typename T2, typename T3>
class TYPES {
private:
    T1 a;
    T2 b;
    T3 c;
public:
    TYPES(T1 a, T2 b, T3 c);
    void SHOW();
};

template<typename T1, typename T2, typename T3>
TYPES<T1, T2, T3>::TYPES(T1 a, T2 b, T3 c) { this->a = a; this->b = b; this->c = c; }
template<typename T1, typename T2, typename T3>
void TYPES<T1, T2, T3>::SHOW() { cout << a << ' ' << b << ' ' << c << endl; }

int main()
{
    STACK<int> stack;
    for (int i = 0; i < 10; i += 2)
        stack.PUSH(i);
    stack.PRINT();
    stack.POP();
    stack.PRINT();

    QUEUE<int> queue;
    for (int i = 0; i < 10; i += 2)
        queue.PUSH(i);
    queue.PRINT();
    queue.POP();
    queue.PRINT();

    TYPES<int, char, string> types(324, 'a', "hello");
    types.SHOW();
}