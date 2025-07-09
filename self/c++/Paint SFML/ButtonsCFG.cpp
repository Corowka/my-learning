#include "Header.h"

void ProcessClose() {
	window.close();
}

void ProcessBrush(sf::Vector2i MousePosition, short bold, sf::Vector3f color) {
	if (sf::Mouse::isButtonPressed(sf::Mouse::Left))
		if (CloseBarWidth + PaintingBarWidth <= MousePosition.x &&
			MousePosition.x <= WindowWidth &&
			0 <= MousePosition.y &&
			MousePosition.y <= WindowHeight) {
			sf::CircleShape circle(bold);
			circle.setPosition(sf::Vector2f(MousePosition.x - bold, MousePosition.y - bold));
			circle.setFillColor(sf::Color(color.x, color.y, color.z));
			window.draw(circle);
			window.draw(circle);
		}
}

void ProcessLine(sf::Vector2i MousePosition, short bold, sf::Vector3f color) {
	if (sf::Mouse::isButtonPressed(sf::Mouse::Left)) {
		bool isPoint1Unnkown = true;
		bool isPoint2Unnkown = true;
		sf::Vector2f Point1;
		sf::Vector2f Point2;
		// 1 point 
		while (isPoint1Unnkown) {
			MousePosition = sf::Mouse::getPosition();
			if (sf::Mouse::isButtonPressed(sf::Mouse::Left)) {
				if (CloseBarWidth + PaintingBarWidth <= MousePosition.x &&
					MousePosition.x <= WindowWidth &&
					0 <= MousePosition.y &&
					MousePosition.y <= WindowHeight) {

					Point1.x = MousePosition.x;
					Point1.y = MousePosition.y;

					sf::CircleShape circle(bold);
					circle.setPosition(sf::Vector2f(MousePosition.x - bold, MousePosition.y - bold));
					circle.setFillColor(sf::Color(color.x, color.y, color.z));
					window.draw(circle);
					window.display();

					isPoint1Unnkown = false;
				}
				else
					return;
			}
		}
		while (sf::Mouse::isButtonPressed(sf::Mouse::Left));
		// 2 point 
		while (isPoint2Unnkown) {
			MousePosition = sf::Mouse::getPosition();
			if (sf::Mouse::isButtonPressed(sf::Mouse::Left)) {
				if (CloseBarWidth + PaintingBarWidth <= MousePosition.x &&
					MousePosition.x <= WindowWidth &&
					0 <= MousePosition.y &&
					MousePosition.y <= WindowHeight) {

					Point2.x = MousePosition.x;
					Point2.y = MousePosition.y;

					sf::CircleShape circle(bold);
					circle.setPosition(sf::Vector2f(MousePosition.x - bold, MousePosition.y - bold));
					circle.setFillColor(sf::Color(color.x, color.y, color.z));
					window.draw(circle);
					window.display();

					isPoint2Unnkown = false;
				}
				else
					return;
			}
		}
		// rectangle
		float width = (Point2.x - Point1.x);
		float height = (Point2.y - Point1.y);
		float angle = (Point1.x < Point2.x) ? atan(height / width) * 180 / M_PI : atan(height / width) * 180 / M_PI + 180;
		float length = sqrt(pow(width, 2) + pow(height, 2));
		sf::RectangleShape rectangle(sf::Vector2f(length, 2 * bold));
		rectangle.setFillColor(sf::Color(color.x, color.y, color.z));
		rectangle.setPosition(sf::Vector2f(Point1.x + bold * sin(-angle), Point1.y + bold * cos(-angle)));
		rectangle.setRotation(angle);
		std::cout << "angle = " << angle << std::endl;
		std::cout << "cos = " << cos(angle) << std::endl;
		std::cout << "sin = " << sin(angle) << std::endl;
		while (sf::Mouse::isButtonPressed(sf::Mouse::Left)) {
			window.draw(rectangle);
			window.display();
		}
	}
}

void ProcessClear(sf::RenderWindow& window, sf::RectangleShape &Canvas) {
	WindowDraw = 0;
}