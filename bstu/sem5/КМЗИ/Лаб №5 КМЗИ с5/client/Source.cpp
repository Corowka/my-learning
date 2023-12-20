#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <string>
#include <thread>
#include <mutex>
#include <vector>
#include <bitset>
#include <locale>
#include "RC4.h"
#include "SHA512.h"

#pragma warning(disable: 4996)

using namespace std;

#define PORT 3000
#define IP "127.0.0.1"

SOCKET Connection;
std::mutex g_lock;
std::string filename;

string M;
string ksecr = "62rtry7teiorhyhkjfdsdsatedgruotygkjhlzdcSDzfvdj";
string B = "Голосую за первого кандидата";
string results;

enum ANDOS_STATE_CLIENT {
	getting_M,
	sending_Men,
	sending_Ben,
	sending_ksecr,
	getting_results,
	close
};

ANDOS_STATE_CLIENT state = getting_M;
RC4 rc4;
SHA512 sha512;
const int MESSAGE_SIZE = 256;
char msg[MESSAGE_SIZE];

void in_msg(string str) {
	int mid = min(MESSAGE_SIZE, str.size());
	for (int i = 0; i < mid; i++) { msg[i] = str[i]; }
	for (int i = mid; i < MESSAGE_SIZE; i++) { msg[i] = '\0'; }
}


void ClientRecvHandler() {
	while (true) {
		switch (state) {
		case getting_M: {
			g_lock.lock();

			recv(Connection, msg, sizeof(msg), MSG_WAITALL);
			M = msg;

			state = sending_Men;
			g_lock.unlock();
			break;
		}
		case getting_results: {
			g_lock.lock();

			recv(Connection, msg, sizeof(msg), MSG_WAITALL);
			results = msg;

			state = close;
			g_lock.unlock();
			break;
		}
		default: break;
		}
		if (state == close) {
			cout << "M: " << M << endl;
			cout << "ksecr: " << ksecr << endl;
			cout << "B: " << B << endl;
			cout << "results: " << results << endl;
			break;
		}
	}
}

void ClientSendHandler() {
	while (true) {
		switch (state) {
		case sending_Men: {
			g_lock.lock();

			string Men = rc4.crypt(M, ksecr);
			in_msg(Men);
			send(Connection, msg, sizeof(msg), NULL);

			state = sending_Ben;
			g_lock.unlock();
			break;
		}
		case sending_Ben: {
			g_lock.lock();

			in_msg(ksecr);
			send(Connection, msg, sizeof(msg), NULL);

			state = sending_ksecr;
			g_lock.unlock();
			break;
		}
		case sending_ksecr: {
			g_lock.lock();

			string Ben = rc4.crypt(B, ksecr);
			in_msg(Ben);
			send(Connection, msg, sizeof(msg), NULL);

			state = getting_results;
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
	addr.sin_addr.s_addr = inet_addr(IP);
	addr.sin_port = htons(PORT);
	addr.sin_family = AF_INET;

	Connection = socket(AF_INET, SOCK_STREAM, NULL);
	if (connect(Connection, (SOCKADDR*)&addr, sizeof(addr)) != 0) {
		std::cout << "Error: failed connect to server.\n";
	}
	std::thread thr1(ClientRecvHandler);
	std::thread thr2(ClientSendHandler);
	thr1.join();
	thr2.join();

	while (true) {}
	return 0;
}