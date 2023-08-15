#include <iostream>
#include <string>
#include <fstream>

#include "CBC.h"

int main()
{
    setlocale(LC_ALL, "Russian");

    std::string file_ = "C:/My Drive/my-learning/bstu/sem4/КМЗИ/Лаб №2 КМЗИ с4/server.txt";

    CBC encider(9, "123456789");

    std::string message;
    std::cout << "write message: ";
    std::getline(std::cin, message);
    std::ofstream f(file_, std::ios::trunc);
    if (f.is_open()) f << encider.ENCODE(message);
    f.close();
}