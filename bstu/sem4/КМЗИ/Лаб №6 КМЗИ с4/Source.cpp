#include <iostream>
#include <bitset>
#include <string>
#include <Windows.h>

using namespace std;

string CRC(string message, string polynom) {

    string temp = "";
    for (int i = 0; i < message.size(); i++)
        temp += bitset<8>(message[i]).to_string();
    message = temp;

    for (int i = 0; i < polynom.size() - 1; i++)
        message += '0';

    for (int i = 0; i < message.size() - polynom.size() + 1; i++)
        if (message[i] - '0')
            for (int j = 0; j < polynom.size(); j++)
                message[i + j] = (char)((message[i + j] - '0') ^ (polynom[j] - '0') + '0');

    int i = 0;
    for (i; i < message.size() && message[i] == '0'; i++);
    return message.substr(i, message.size() - i);
}

int main() {

    SetConsoleOutputCP(1251);
    SetConsoleCP(1251);

	string message = "κμηθ";
        
    cout << message << endl;

	string polynom = bitset<8>((int)message[0] + (int)message[1] + (int)message[4]).to_string();

    cout << CRC(message, polynom) << endl;

	return 0;
}