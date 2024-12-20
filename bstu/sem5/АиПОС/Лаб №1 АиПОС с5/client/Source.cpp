#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <fstream>
#include <chrono>
#include <string>
#include <thread>
#include <mutex>
#include <stdio.h>
#include <string.h>

#pragma warning(disable: 4996)

#define PORT 3000
#define IP "127.0.0.1"

SOCKET Connection;
std::mutex g_lock;
std::string filename;

void ClientRecvHandler() {
	char msg[32768];
	while (true) {
		recv(Connection, msg, sizeof(msg), NULL);
		g_lock.lock();

		long long currentTimeMillis = std::chrono::duration_cast<std::chrono::milliseconds>(
			std::chrono::system_clock::now().time_since_epoch()
		).count();
		std::ofstream file(filename, std::ios::app);
		if (file.is_open()) {
			file << "Server: " << msg << " at: " << std::to_string(currentTimeMillis) << std::endl;
			file.close();
		}
		else { std::cerr << "������ ��� �������� ��� �������� �����." << std::endl; }

		g_lock.unlock();
		if (strstr("code1", msg)) {
			std::cerr << "Server interrupted connection." << std::endl;
			exit(0);
		}
		else {
			std::cout << "Server: " << msg << std::endl;
		}
	}
}

void ClientSendHandler() {
	bool HomeKeyState = !GetKeyState(VK_HOME);
	bool isMessageEntered = false;
	bool isCommandDisconect = false;
	char msg[32768];
	while (true) {
		if (!isMessageEntered) {
			std::cin.getline(msg, sizeof(msg));
			std::cout << "Press HOME to sent it." << std::endl;
			isMessageEntered = true;
			HomeKeyState = !GetKeyState(VK_HOME);
			char* ptr = strstr(msg, "disconnect");
			if (ptr) {
				isCommandDisconect = true;
			}
		}
		if (isCommandDisconect) {
			std::string command(msg);
			std::string test = "disconnect " + std::to_string(PORT) + ' ' + IP;
			if (command == test) {
				std::cout << "Connection interrupted.\n";
				g_lock.lock();

				long long currentTimeMillis = std::chrono::duration_cast<std::chrono::milliseconds>(
					std::chrono::system_clock::now().time_since_epoch()
				).count();
				std::ofstream file(filename, std::ios::app);
				if (file.is_open()) {
					file << "Connection interrupted at: " << std::to_string(currentTimeMillis) << std::endl;
					file.close();
				}
				else { std::cerr << "������ ��� �������� ��� �������� �����." << std::endl; }

				g_lock.unlock();
				exit(0);
			}
			isCommandDisconect = false;
			isMessageEntered = false;
		}
		if (isMessageEntered && HomeKeyState == GetKeyState(VK_HOME)) {
			std::cout << "Massage was sended." << std::endl;
			send(Connection, msg, sizeof(msg), NULL);
			isMessageEntered = false;
			g_lock.lock();

			long long currentTimeMillis = std::chrono::duration_cast<std::chrono::milliseconds>(
				std::chrono::system_clock::now().time_since_epoch()
			).count();
			std::ofstream file(filename, std::ios::app);
			if (file.is_open()) {
				file << "Client: " << msg << " at: " << std::to_string(currentTimeMillis) << std::endl;
				file.close();
			}
			else { std::cerr << "������ ��� �������� ��� �������� �����." << std::endl; }

			g_lock.unlock();
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
	addr.sin_addr.s_addr = inet_addr(IP);
	addr.sin_port = htons(PORT);
	addr.sin_family = AF_INET;

	Connection = socket(AF_INET, SOCK_STREAM, NULL);
	if (connect(Connection, (SOCKADDR*)&addr, sizeof(addr)) != 0) {
		std::cout << "Error: failed connect to server.\n";
	}

	long long currentTimeMillis = std::chrono::duration_cast<std::chrono::milliseconds>(
		std::chrono::system_clock::now().time_since_epoch()
	).count();
	filename = "conection_id" + std::to_string(currentTimeMillis) + ".txt";
	std::ofstream file(filename);
	if (file.is_open()) {
		file << "Client connected at: " << std::to_string(currentTimeMillis) << std::endl;
		std::cout << "Client connected at: " << std::to_string(currentTimeMillis) << std::endl;
		file.close();
	}
	else { std::cerr << "������ ��� �������� ��� �������� �����." << std::endl; }

	std::thread thr1(ClientRecvHandler);
	std::thread thr2(ClientSendHandler);
	thr1.join();
	thr2.join();

	while (true) {}
	return 0;
}	