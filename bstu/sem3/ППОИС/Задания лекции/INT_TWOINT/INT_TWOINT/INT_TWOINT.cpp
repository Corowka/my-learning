#include <iostream>

using std::cout;
using std::endl;

class INT {
private:
    int x;
public:
    INT() : x(0) {}
    INT(int x) : x(x) {}
    INT(const INT& obj) : x(obj.x) {}
    void TO_SET_X(int x) { this->x = x; }
    int TO_GET_VAL_X() { return x; }
    int& TO_GET_VAR_X() { return x; }
    void TO_SHOW_X() { cout << x << endl; }
};

class TWO_INT_1 : public INT {
private:
    int y;
public:
    TWO_INT_1() : INT() { y = 0; }
    TWO_INT_1(int x, int y) : INT(x), y(y) {}
    TWO_INT_1(const TWO_INT_1& obj) : INT(obj), y(obj.y) {}
    void TO_SET_Y(int y) { this->y = y; }
    int TO_GET_VAL_Y() { return y; }
    int& TO_GET_VAR_Y() { return y; }
    void TO_SHOW_X_Y() { cout << TO_GET_VAL_X() << ' ' << y << endl; }
};

class TWO_INT_2 {
private:
    INT x;
    int y;
public:
    TWO_INT_2() { x.TO_SET_X(0); y = 0; }
    TWO_INT_2(int x, int y) : y(y) { this->x.TO_SET_X(x); }
    TWO_INT_2(const TWO_INT_2& obj) : y(obj.y) { this->x.TO_SET_X(TO_GET_VAL_X()); }
    void TO_SET_X(int x) { this->x.TO_SET_X(x); }
    void TO_SET_Y(int y) { this->y = y; }
    int TO_GET_VAL_X() { return x.TO_GET_VAL_X(); }
    int& TO_GET_VAR_X() { return x.TO_GET_VAR_X(); }
    int TO_GET_VAL_Y() { return y; }
    int& TO_GET_VAR_Y() { return y; }
    void TO_SHOW_X_Y() { cout << TO_GET_VAL_X() << ' ' << y << endl; }
};

#include <ctime>
#include <iostream>
#include <cmath>

using std::cout;
using std::cin;
using std::cerr;
using std::endl;


namespace my {

    template<class T>
    int find(const T* arr, const int& size, const T& item)
    {
        for (int i = 0; i < size; i++)
        {
            if (arr[i] == item)
            {
                return i;
            }
        }
        return -1;
    }

    template<class T1, class T2>
    void show(const T1& a, const T2& b)
    {
        cout << "item1 = " << a << endl; 
        cout << "item2 = " << b << endl;
    }
}
#include <ctime>
#include <iostream>
#include <cmath>
using std::cout;
using std::cin;
using std::cerr;
using std::endl;

template <typename T1, typename T2>
void TO_SHOW(T1 a, T2 b) {
    std::cout << "a = " << a << std::endl
        << "b = " << b << std::endl;
}


template <typename T>
T SEARCH(T arr[],T a) {
    int i = 0;
    while (a != arr[i]) { i++; }
    if (a == arr[i]) return i;
    else return -1;
}
int main()
{
    TO_SHOW("hello from zuppy and suppy they feel good in the next world", 6.5);
    int arr[] = { 1, 2, 5, 6, 8, 3 };
    std::cout << SEARCH(arr, 8);
}


/*
int main()
{























    bool isWrite = true;
    while (isWrite)
    {
        float x;
        float y;
        try
        {
            cout << "Write A (float): ";
            cin >> x;
            cout << "Write B (float): ";
            cin >> y;
            if (x * y < 0)
            {
                throw("A or B less than zero!");
            }
            cout << sqrt(x * y) << endl;
        }
        catch (const char* error)
        {
            cerr << error << endl;
        }
        cout << "Do you want continue? (y/n): ";
        char answer;
        cin >> answer;
        if (answer == 'n')
        {
            isWrite = false;
        }
    }
}*/





    /*srand(time(NULL));
    const int size = 10;
    int* arr = new int[size];
    for (int i = 0; i < size; i++)
    {
        arr[i] = rand() % 10;
        cout << arr[i] << ' ';
    }
    cout << endl;
    int index = my::find(arr, size, 3);
    my::show(arr[index], index);*/



    /*INT i(23);
    i.TO_SHOW_X();
    i.TO_SET_X(32);
    i.TO_SHOW_X();

    TWO_INT_1 two_i1(12, 21);
    two_i1.TO_SHOW_X_Y();
    two_i1.TO_SET_X(1);
    two_i1.TO_SET_Y(2);
    two_i1.TO_SHOW_X_Y();

    TWO_INT_2 two_i2(34, 55);
    two_i2.TO_SHOW_X_Y();
    two_i2.TO_SET_X(3);
    two_i2.TO_SET_Y(5);
    two_i2.TO_SHOW_X_Y();*/


