#include <iostream>
#include <iomanip>
#include <fstream>
#include <string>
#include <ctime>

using namespace std;

class INT {
private:
    int x;
public:
    INT();
    INT(int x);
    INT(const INT& obj);
    void TO_SET(int x);
    int TO_GET_VAL();
    int& TO_GET_VAR();
    void TO_SHOW();
    INT& operator = (const INT& obj);
    INT operator + (const INT& obj);
    INT operator - (const INT& obj);
    bool operator == (const INT& obj);
};

INT::INT() : x(0) {}
INT::INT(int x) { this->x = x; }
INT::INT(const INT& obj) : x(obj.x) {}
void INT::TO_SET(int x) { this->x = x; }
int INT::TO_GET_VAL() { return x; }
int& INT::TO_GET_VAR() { return x; }
void INT::TO_SHOW() { cout << x << endl; }
INT& INT::operator = (const INT& obj) { x = obj.x; return *this; }
INT INT::operator + (const INT& obj) { INT temp(x + obj.x); return temp; }
INT INT::operator - (const INT& obj) { INT temp(x - obj.x); return temp; }
bool INT::operator == (const INT& obj) { return(x == obj.x); }

int main()
{
    srand(time(NULL));

    // cin.getline()
    char str[20];
    cin.getline(str, 20);
    for (int i = 0; i < 20 && str[i] != '\0'; i++)
        cout.put(str[i]);
    cout.put('\n');
    // cin.get() cin.put()
    char chr;
    cin.get(chr);
    cout.put(chr);
    // setprecision() setw()
    cout << endl << 10.2343255 << endl;
    cout << setw(20) << 10.2343255 << endl;
    cout << setprecision(3) << 10.2343255 << endl;
    cout << setw(20) << setprecision(3) << 10.2343255 << endl;
    // create class arr
    const int amount = 10;
    INT classlist[amount];
    cout << "init: ";
    for (int i = 0; i < amount; i++) {
        classlist[i].TO_SET(rand() % 10);
        cout << classlist[i].TO_GET_VAL() << ' ';
    }
    cout << endl;
    // write to file
    ofstream WRITE;
    WRITE.open("classlist.txt", ios::in);
    if (!WRITE)
        cerr << "error" << endl;
    for (int i = 0; i < amount; i++)
        WRITE << classlist[i].TO_GET_VAL() << ' ';
    WRITE.close();
    // read from file
    ifstream READ;
    READ.open("classlist.txt", ios::in);
    if (!READ)
        cerr << "error" << endl;
    string values = "";
        getline(READ, values);
    READ.close();
    // output values
    cout << "read: " << values << endl;
}
