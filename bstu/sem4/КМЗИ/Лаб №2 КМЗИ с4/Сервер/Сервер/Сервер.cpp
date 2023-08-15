#include <iostream>
#include <string>
#include <fstream>

#include "CBC.h"

int main()
{
    setlocale(LC_ALL, "Russian");

    std::string file_ = "C:/My Drive/my-learning/bstu/sem4/КМЗИ/Лаб №2 КМЗИ с4/server.txt";

    CBC encoder(9, "123456789");

    std::ifstream f(file_); std::string message = "";
    if (f.is_open()) { getline(f, message); }
    f.close();
    std::cout << encoder.DECODE(message) << std::endl;
}