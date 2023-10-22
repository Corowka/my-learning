#pragma comment(lib, "ws2_32.lib")
#include <winsock2.h>
#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <vector>
#include <sstream>
#include <thread>

#pragma warning(disable: 4996)

SOCKET ServerSocket;
SOCKADDR_IN clientAddr;
int clientAddrSize;

#define ServerPORT 3000
#define ServerIP "127.0.0.1"
#define ClientPORT 3001
#define ClientIP "127.0.0.1"

void ServerRecvHandler() {
    char msg[256];

    while (true) {
        sockaddr_in clientAddr;
        int clientAddrSize = sizeof(clientAddr);

        int bytesReceived = recvfrom(ServerSocket, msg, sizeof(msg), 0, (SOCKADDR*)&clientAddr, &clientAddrSize);
        if (bytesReceived != SOCKET_ERROR) {

            char* ptr = strstr(msg, "create");
            if (ptr) {
                std::cout << "Received: " << msg << std::endl;
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

                if (tokens.size() < 2 || tokens[1].find(".txt") == std::string::npos) {
                    const char* err = "code1";
                    sendto(ServerSocket, err, sizeof(err), 0, (SOCKADDR*)&clientAddr, sizeof(clientAddr));
                }
                else {
                    std::ofstream file(tokens[1]);
                    if (file.is_open()) {
                        file << rest << std::endl;
                        file.close();
                    }
                    else {
                        std::cerr << "Ошибка при создании или открытии файла." << std::endl;
                    }

                    std::ifstream filebin(tokens[1], std::ios::binary);
                    filebin.seekg(0, std::ios::end);
                    std::streamsize fileSize = filebin.tellg();
                    filebin.close();
                    std::string fileSizeString = std::to_string(static_cast<long long>(fileSize)).c_str();

                    sendto(ServerSocket, fileSizeString.c_str(), sizeof(fileSizeString), 0, (SOCKADDR*)&clientAddr, sizeof(clientAddr));
                }
            }
            else {
                std::cout << "Received from client: " << msg << std::endl;
            }
        }
    }
}

void ServerSendHandler() {
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
            sendto(ServerSocket, msg, sizeof(msg), 0, (SOCKADDR*)&clientAddr, sizeof(clientAddr));
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

    SOCKADDR_IN serverAddr;
    int sizeofServerAddr = sizeof(serverAddr);
    serverAddr.sin_addr.s_addr = inet_addr(ServerIP);
    serverAddr.sin_port = htons(ServerPORT);
    serverAddr.sin_family = AF_INET;

    ServerSocket = socket(AF_INET, SOCK_DGRAM, 0);
    bind(ServerSocket, (SOCKADDR*)&serverAddr, sizeofServerAddr);

    clientAddr.sin_addr.s_addr = inet_addr(ClientIP);
    clientAddr.sin_port = htons(ClientPORT);
    clientAddr.sin_family = AF_INET;
    int clientAddrSize = sizeof(clientAddr);

    std::cout << "UDP Server is running...\n";

    std::thread thr1(ServerRecvHandler);
    std::thread thr2(ServerSendHandler);
    thr1.join();
    thr2.join();

    closesocket(ServerSocket);
    WSACleanup();

    return 0;
}
