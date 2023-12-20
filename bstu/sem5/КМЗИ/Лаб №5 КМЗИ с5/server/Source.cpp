#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <string>
#include <thread>
#include <mutex>
#include <algorithm>
#include <vector>
#include <locale>
#include "RC4.h"
#include "SHA512.h"

#pragma warning(disable: 4996)

using namespace std;

SOCKET Connection;
std::mutex g_lock;

string Men;
string Ben;
string ksecr;

enum ANDOS_STATE_SERVER {
	sending_M,
	getting_Men,
	getting_Ben,
	getting_ksecr,
	sending_results,
	close
};

ANDOS_STATE_SERVER state = sending_M;
RC4 rc4;
SHA512 sha512;
const int MESSAGE_SIZE = 256;
char msg[MESSAGE_SIZE];

string generate_M() {
	static unsigned long long M = 425345346345346346;
	int encrypted_M = (M << 3) | (M >> (8 - 3));
	string encrypted_M_str = bitset<64>(M).to_string();
	return encrypted_M_str;
}

void in_msg(string str) {
	int mid = min(MESSAGE_SIZE, str.size());
	for (int i = 0; i < mid; i++) { msg[i] = str[i]; }
	for (int i = mid; i < MESSAGE_SIZE; i++) { msg[i] = '\0'; }
}

void ClientRecvHandler() {
	while (true) {
		switch (state) {
		case getting_Men: {
			g_lock.lock();

			recv(Connection, msg, sizeof(msg), NULL);
			Men = msg;

			state = getting_Ben;
			g_lock.unlock();
			break;
		}
		case getting_Ben: {
			g_lock.lock();

			recv(Connection, msg, sizeof(msg), NULL);
			ksecr = msg;

			state = getting_ksecr;
			g_lock.unlock();
			break;
		}
		case getting_ksecr: {
			g_lock.lock();

			recv(Connection, msg, sizeof(msg), NULL);
			Ben = msg;

			state = sending_results;
			g_lock.unlock();
			break;
		}
		default: break;
		}
		if (state == close) {
			break;
		}
	}
}

void ClientSendHandler() {
	while (true) {
		switch (state) {
			case sending_M: {
				g_lock.lock();
				
				string M = generate_M();
				in_msg(M);
				send(Connection, msg, sizeof(msg), NULL);

				state = getting_Men;
				g_lock.unlock();
				break;
			}
			case sending_results: {
				g_lock.lock();

				string B = rc4.crypt(Ben, ksecr);
				in_msg(B);
				send(Connection, msg, sizeof(msg), NULL);

				state = close;
				g_lock.unlock();
				break;
			}
			default: break;
		}
		if (state == close) {
			cout << "Men: " << Men << endl;
			cout << "Ben: " << Ben << endl;
			cout << "ksecr: " << ksecr << endl;
			break;
		}
	}
}

int main(int argc, char* argv[]) {
	std::locale russianLocale("Russian_Russia.1251");
	std::locale::global(russianLocale);

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