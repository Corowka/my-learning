#pragma once
#include <SFML/Graphics.hpp>
#include <iostream>
#include <fstream>
#include <string>

class Map
{
	unsigned mapWidth;
	unsigned mapLength;
	//unsigned mapHeight;
	unsigned** map;
	std::string mapName;

public: 
	Map() {
		map = new unsigned* [mapWidth];
		for (int i = 0; i < mapLength; i++)
			map[i] = new unsigned[mapLength];
	}
	~Map() {
		for (int i = 0; i < mapWidth; i++)
			delete[] map[i];
		delete[] map;
	}

	// Загрузка карты из файла
	void Load(std::string mapName) {
		std::ifstream LOADING(mapName);
		if (LOADING) {
			for (int i = 0; i < mapWidth; i++)
				for (int j = 0; j < mapLength; j++)
					LOADING >> map[i][j];
		}
		else {
			std::cerr << "Error: map" << mapName << " loading failed!" << std::endl;
			system("pause");
		}
		for (int i = 0; i < mapWidth; i++) {
			std::cout << std::endl; 
			for (int j = 0; j < mapLength; j++)
				std::cout << map[i][j] << " ";
		}
		LOADING.close();
	}

};

