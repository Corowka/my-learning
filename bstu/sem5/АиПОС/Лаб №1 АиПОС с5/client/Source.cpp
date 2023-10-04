#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <conio.h>

#pragma warning(disable: 4996)

SOCKET Connection;

void ClientHandler() {
	char msg[256];
	while (true) {
		recv(Connection, msg, sizeof(msg), NULL);
		std::cout << msg << std::endl;
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

	Connection = socket(AF_INET, SOCK_STREAM, NULL);
	if (connect(Connection, (SOCKADDR*)&addr, sizeof(addr)) != 0) {
		std::cout << "Error: failed connect to server.\n";
	}
	std::cout << "Connected!\n";

	CreateThread(NULL, NULL, (LPTHREAD_START_ROUTINE)ClientHandler, NULL, NULL, NULL);

	bool isMsgEntered = false;
	bool HomeKeyStartState = GetKeyState(VK_HOME);

	std::cout << isMsgEntered << " <-- flag" << std::endl;
	char msg[256];
	while (true) { 
		if (HomeKeyStartState != GetKeyState(VK_HOME) && !isMsgEntered) {
			std::cout << "Enter new massage: ";
			std::cin.getline(msg, sizeof(msg));
			std::cout << (GetKeyState(VK_HOME) == 1) << ' ' << isMsgEntered << " <-- input" << std::endl;
			std::cout << "Your msg: " << msg << ".\nPress HOME again to sent it." << std::endl;
			isMsgEntered = true;
		}
		if (HomeKeyStartState == GetKeyState(VK_HOME) && isMsgEntered) {
			std::cout << "Msg was sended." << std::endl;
			std::cout << (GetKeyState(VK_HOME) == 1) << ' ' << isMsgEntered << " <-- send" << std::endl;
			send(Connection, msg, sizeof(msg), NULL);
			isMsgEntered = false;
		}
	}

	system("pause");
	return 0;
}