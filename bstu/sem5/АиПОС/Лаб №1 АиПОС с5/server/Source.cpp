#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <fstream>
#include <chrono>
#include <string>
#include <thread>
#include <mutex>
#include <algorithm>
#include <vector>
#include <sstream>

#pragma warning(disable: 4996)

SOCKET Connection;
std::mutex g_lock;

void ClientRecvHandler() {
	char msg[256];
	while (true) {
		recv(Connection, msg, sizeof(msg), NULL);
		char* ptr = strstr(msg, "create");
		if (ptr) {

			g_lock.lock();

			std::cout << msg << std::endl;
			std::istringstream iss(msg);
			std::vector<std::string> tokens;
			std::string token;
			while (iss >> token) {
				tokens.push_back(token);
				if (tokens.size() > 1) {
					break;
				}
			}
			std::string rest;
			std::getline(iss, rest);

			if (tokens.size() < 2) {
				const char* err = "code1";
				send(Connection, err, sizeof(err), NULL);
				g_lock.unlock();
				exit(0);
			}

			if (tokens[1].find(".txt") == -1) {
				const char* err = "code1";
				send(Connection, err, sizeof(err), NULL);
				g_lock.unlock();
				exit(0);
			}

			std::ofstream file(tokens[1]);
			if (file.is_open()) {
				file << rest << std::endl;
				file.close();
			}
			else { std::cerr << "Ошибка при создании или открытии файла." << std::endl; }

			std::ifstream filebin(tokens[1], std::ios::binary);
			filebin.seekg(0, std::ios::end);
			std::streamsize fileSize = filebin.tellg();
			filebin.close();
			std::string fileSizeString = std::to_string(static_cast<long long>(fileSize)).c_str();

			send(Connection, fileSizeString.c_str(), sizeof(fileSizeString.c_str()), NULL);

			g_lock.unlock();
		}
		else {
			std::cout << "Server: " << msg << std::endl;
		}
	}
}

void ClientSendHandler() {
	bool HomeKeyState = !GetKeyState(VK_HOME);
	bool isMessageEntered = false;
	char msg[256];
	while (true) {
		if (!isMessageEntered) {
			std::cin.getline(msg, sizeof(msg));
			std::cout << "Press HOME to sent it." << std::endl;
			isMessageEntered = true;
			HomeKeyState = !GetKeyState(VK_HOME);
		}
		if (isMessageEntered && HomeKeyState == GetKeyState(VK_HOME)) {
			std::cout << "Massage was sended." << std::endl;
			send(Connection, msg, sizeof(msg), NULL);
			isMessageEntered = false;
		}
	}
}
int main(int argc, char* argv[]) {
	WSAData wsaData;
	WORD DLLVersion = MAKEWORD(2, 1);
	if (WSAStartup(DLLVersion, &wsaData)) {
		std::cout << "Error\n";
		exit(1);
	}

	SOCKADDR_IN addr;
	int sizeofaddr = sizeof(addr);
	addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	addr.sin_port = htons(3000);
	addr.sin_family = AF_INET;

	SOCKET sListen = socket(AF_INET, SOCK_STREAM, NULL);
	bind(sListen, (SOCKADDR*)&addr, sizeof(addr));
	listen(sListen, SOMAXCONN);

	Connection = accept(sListen, (SOCKADDR*)&addr, &sizeofaddr);
	std::cout << "Client Connected:\n";

	std::thread thr1(ClientRecvHandler);
	std::thread thr2(ClientSendHandler);
	thr1.join();
	thr2.join();

	while (true) {}
	return 0;
}