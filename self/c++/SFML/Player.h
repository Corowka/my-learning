#pragma once
#include <SFML/Graphics.hpp>
#include <iostream>

class Controler {

};

class Camera : Controler {
	sf::Vector3f cameraPos;
	sf::Vector3f cameraDir;
	unsigned AmountOfRays = 10;

public : 
	Camera() {
		cameraPos;
		cameraDir;
	}
};

class Player : public Camera
{

};

