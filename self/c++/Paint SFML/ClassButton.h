#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>

class InteractiveZone {
protected:
	bool isStroke;
	bool isText;
	float X;
	float Y;
	float Width;
	float Height;
	sf::Vector3i BGColor;
	sf::Vector3i TextColor;
	sf::RectangleShape Bar;
	sf::Text Text;
	sf::VertexArray Stroke;
public:
	InteractiveZone() {
		isStroke = false;
		isText = false;
	}
	~InteractiveZone() {}
	void setSize(float x, float y) {
		Bar.setSize(sf::Vector2f(x, y));
		Width = x;
		Height = y;
	}
	void setPosition(float x, float y) {
		Bar.setPosition(sf::Vector2f(x, y));
		X = x;
		Y = y;
	}
	void setFillColor(short r, short g, short b) {
		Bar.setFillColor(sf::Color(r, g, b));
		BGColor.x = r;
		BGColor.y = g;
		BGColor.z = b;
	}
	void setTextString(std::string text) {
		Text.setString(text);
	}
	void setTextPosition(float x, float y) {
		Text.setPosition(sf::Vector2f(x, y));
	}
	void setText(std::string text, sf::Font &font, unsigned size, short r, short g, short b) {
		isText = true;
		Text.setString(text);
		Text.setFont(font);
		Text.setCharacterSize(size);
		Text.setFillColor(sf::Color(r, g, b));
		TextColor.x = r;
		TextColor.y = g;
		TextColor.z = b;
		Text.setPosition(sf::Vector2f(X + Height / 2, Y + Height / 4 - 2));
	}
	void setStroke(short r, short g, short b) {
		isStroke = true;
		Stroke.setPrimitiveType(sf::Lines);
		Stroke.resize(8);
		Stroke[0].position = sf::Vector2f(X + 1, Y + 1);
		Stroke[1].position = sf::Vector2f(X + Width - 1, Y + 1);
		Stroke[2].position = sf::Vector2f(X + Width - 1, Y + 1);
		Stroke[3].position = sf::Vector2f(X + Width - 1, Y + Height - 1);
		Stroke[4].position = sf::Vector2f(X + Width - 1, Y + Height - 1);
		Stroke[5].position = sf::Vector2f(X + 1, Y + Height - 1);
		Stroke[6].position = sf::Vector2f(X + 1, Y + Height - 1);
		Stroke[7].position = sf::Vector2f(X + 1, Y + 1);
		for (int i = 0; i < 5; i++)
			Stroke[i].color = sf::Color(r, g, b);
	}
	bool isMouseOn(sf::Vector2i MsPos) {
		if ((X <= MsPos.x && MsPos.x <= X + Width) && (Y <= MsPos.y && MsPos.y <= Y + Height))
			return true;
		return false;
	}
	void draw(sf::RenderWindow &window) {
		window.draw(Bar);
		window.draw(Bar);
		if (isText) {
			window.draw(Text);
			window.draw(Text);
		}
		if (isStroke) {
			window.draw(Stroke);
			window.draw(Stroke);
		}
	}
};

class Button : public InteractiveZone {
private:
	sf::Vector3i BGColor_pressed;
	sf::Vector3i TextColor_pressed;
	short PressLevel;
	bool isPress;
public:
	Button() {
		PressLevel = 50;
		isPress = false;
	}
	~Button() {}
	void setFillColor(short r, short g, short b) {
		Bar.setFillColor(sf::Color(r, g, b));
		BGColor.x = r;
		BGColor.y = g;
		BGColor.z = b;
		BGColor_pressed.x = (BGColor.x - PressLevel < 0) ? 0 : BGColor.x - PressLevel;
		BGColor_pressed.y = (BGColor.y - PressLevel < 0) ? 0 : BGColor.y - PressLevel;
		BGColor_pressed.z = (BGColor.z - PressLevel < 0) ? 0 : BGColor.z - PressLevel;
	}
	void setText(std::string text, sf::Font& font, unsigned size, short r, short g, short b) {
		isText = true;
		Text.setString(text);
		Text.setFont(font);
		Text.setCharacterSize(size);
		Text.setFillColor(sf::Color(r, g, b));
		TextColor.x = r;
		TextColor.y = g;
		TextColor.z = b;
		TextColor_pressed.x = (TextColor.x - PressLevel < 0) ? 0 : TextColor.x - PressLevel;
		TextColor_pressed.y = (TextColor.y - PressLevel < 0) ? 0 : TextColor.y - PressLevel;
		TextColor_pressed.z = (TextColor.z - PressLevel < 0) ? 0 : TextColor.z - PressLevel;
		Text.setPosition(sf::Vector2f(X + Height / 2, Y + Height / 4 - 2));
	}
	void Press(sf::RenderWindow& window) {
		isPress = true;
		Bar.setFillColor(sf::Color(BGColor_pressed.x, BGColor_pressed.y, BGColor_pressed.z));
		Text.setFillColor(sf::Color(TextColor_pressed.x, TextColor_pressed.y, TextColor_pressed.z));
		draw(window);
	}
	void Return(sf::RenderWindow& window) {
		isPress = false;
		Bar.setFillColor(sf::Color(BGColor.x, BGColor.y, BGColor.z));
		Text.setFillColor(sf::Color(TextColor.x, TextColor.y, TextColor.z));
		draw(window);
	}
	bool isPressed() {
		return isPress;
	}
};

class Slider : public InteractiveZone {
private:
	float ScrollSpeed;
	short MinValue;
	short MaxValue;
	float Value;

	std::string ConvertFloatToString(short n) {
		std::string str = "";
		short i;
		while (n != 0) {
			i = n % 10;
			n /= 10;
			str = char(i + '0') + str;
		}
		if (str == "")
			str = "0";
		return str;
	}
public:
	Slider() {
		ScrollSpeed = 0.1;
	}
	~Slider() {}
	void setScrollSpeed(float speed) {
		ScrollSpeed = speed;
	}
	void setBoundaries(short min, short max) {
		MinValue = Value = min;
		MaxValue = max;
		Text.setString(ConvertFloatToString(short (Value)));
	}
	void setValue(short value) {
		Value = value;
		Text.setString(ConvertFloatToString(short(Value)));
	}
	short getValue() {
		return Value;
	}
	void increase(sf::RenderWindow& window) {
		if (Value < MaxValue) {
			Value += ScrollSpeed;
			Text.setString(ConvertFloatToString(short(Value)));
			draw(window);
		}
	}
	void decrease(sf::RenderWindow& window) {
		if (Value > MinValue) {
			Value -= ScrollSpeed;
			Text.setString(ConvertFloatToString(short(Value)));
			draw(window);
		}
	}
};