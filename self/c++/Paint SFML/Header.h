#define _USE_MATH_DEFINES

#pragma once
#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>
#include <cmath>

// Window: GLobal Settings
extern short WindowHeight;
extern short WindowWidth;
extern short PaintingBarWidth;
extern short CloseBarWidth;
extern short CanvasHeight;
extern short CanvasWidth;
extern sf::RenderWindow window;
extern short WindowDraw;

// Buttons Process
void ProcessClose(); 
void ProcessBrush(sf::Vector2i MousePosition, short bold, sf::Vector3f color);
void ProcessLine(sf::Vector2i MousePosition, short bold, sf::Vector3f color);
void ProcessClear(sf::RenderWindow& window, sf::RectangleShape& Canvas);
