#include <SFML/Graphics.hpp>
#include <iostream>
#include <sstream>
#include "Map.h"
#include "Header.h"

extern unsigned WindowWidth = 640;
extern unsigned WindowHeight = 480;
extern unsigned fpsMax = 300;

int main() {
	setlocale(LC_ALL, "Russian");

	sf::RenderWindow window(sf::VideoMode(WindowWidth, WindowHeight), "Ray Casting");
	window.setFramerateLimit(fpsMax);

	sf::RectangleShape Background(sf::Vector2f(WindowWidth, WindowHeight));
	Background.setFillColor(sf::Color(255, 255, 255));

	sf::CircleShape Circle(100);
	sf::Vector3f CircleColor = { 0,0,0 };
	Circle.setFillColor(sf::Color(CircleColor.x, CircleColor.y, CircleColor.z));
	float Radius = 75;
	Circle.setRadius(Radius);
	sf::Vector2f CirclePosition = { WindowWidth / 2 - Radius , WindowHeight / 2 - Radius };
	Circle.setPosition(CirclePosition);
	float SpeedNormalizing = 3000 / fpsMax;
	float Speed = 0.15;
	float ColorChangingSpeed = 0.1;

	// Счётчик fps 
	sf::Font font;
	if (!font.loadFromFile("C:/Users/kopan/source/repos/Уроки С++/SFML/x64/NAMU-PRO.ttf"))
		system("pause");
	sf::Text fpsOut("FPS", font, 20);
	fpsOut.setFillColor(sf::Color::Red);
	fpsOut.setPosition(WindowWidth - 75, 0);

	// Создаём таймер 
	sf::Clock Clock;

	while (window.isOpen())
	{
		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
		}

		// Смена цвета
		CircleColor.x += ColorChangingSpeed * SpeedNormalizing;
		CircleColor.y += ColorChangingSpeed * 0.66 * SpeedNormalizing;
		CircleColor.z += ColorChangingSpeed * 0.33 * SpeedNormalizing;
		Circle.setFillColor(sf::Color(CircleColor.x, CircleColor.y, CircleColor.z));
		
		// Записываем fps
		float time = Clock.getElapsedTime().asMicroseconds();
		Clock.restart();
		unsigned fps = 1000000 / time;
		std::ostringstream Out;
		Out << fps;
		fpsOut.setString(Out.str());

		// Движение 
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::A)) {
			if (CirclePosition.x > 0) {
				CirclePosition.x -= Speed * SpeedNormalizing;
				Circle.setPosition(CirclePosition);
			}
		}
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::W)) {
			if (CirclePosition.y > 0) {
				CirclePosition.y -= Speed * SpeedNormalizing;
				Circle.setPosition(CirclePosition);
			}
		}
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::D)) {
			if (CirclePosition.x + 2 * Radius < WindowWidth) {
				CirclePosition.x += Speed * SpeedNormalizing;
				Circle.setPosition(CirclePosition);
			}
		}
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::S)) {
			if (CirclePosition.y + 2 * Radius < WindowHeight) {
				CirclePosition.y += Speed * SpeedNormalizing;
				Circle.setPosition(CirclePosition);
			}
		}

		window.clear();
		window.draw(Background);
		window.draw(Circle);
		window.draw(fpsOut);
		window.display();
	}
}