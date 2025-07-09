#include "Algorithm.h"
#include "StackList.h"
#include "QueueList.h"
#include<ctime>
#include <string>

int main() {
	setlocale(LC_ALL, "ru");
	srand(time(NULL));

	for (int i = 0; true; i = ++i % 16) {
		std::string color_name = "color ";
		color_name += (i < 10) ? (char)(i + '0') : (char)(i % 10 + 'a');
		const int n = 6;
		color_name += (i + n < 10) ? (char)(i + n + '0') : (char)((i + n - 1) % 10 + 'a');
		std::cout << color_name << std::endl;
		system(color_name.c_str());
	}
}
