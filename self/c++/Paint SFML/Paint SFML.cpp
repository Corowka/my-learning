#include "Header.h"
#include "ClassButton.h"

// Window: GLobal Settings
extern short WindowHeight = 0;
extern short WindowWidth = 0;
extern short PaintingBarWidth = 0;
extern short CloseBarWidth = 0;
extern short CanvasHeight = 0;
extern short CanvasWidth = 0;
extern sf::RenderWindow window(sf::VideoMode(WindowWidth, WindowHeight), "Snake beta");
extern short WindowDraw = 0;

int main()
{
	// Window: Locale Settings
	sf::Font font;
	if (!font.loadFromFile("C:/WINDOWS/Fonts/arial.ttf"))
		return 1;

	// Window: Preparing
	window.create(sf::VideoMode::getDesktopMode(), "Snake beta", sf::Style::None);
	WindowHeight = window.getSize().y;
	WindowWidth = window.getSize().x;

	CanvasHeight = WindowHeight;
	CanvasWidth = WindowHeight * 4 / 3;
	PaintingBarWidth = (WindowWidth - CanvasWidth) * 9 / 10;
	CloseBarWidth = PaintingBarWidth / 9;

	sf::RectangleShape CloseBar(sf::Vector2f(CloseBarWidth, WindowHeight));
	CloseBar.setFillColor(sf::Color(50, 0, 50));
	CloseBar.setPosition(0, 0);

	sf::RectangleShape PaintingBar(sf::Vector2f(PaintingBarWidth, WindowHeight));
	PaintingBar.setFillColor(sf::Color(75, 0, 75));
	PaintingBar.setPosition(CloseBarWidth, 0);

	sf::RectangleShape Canvas(sf::Vector2f(CanvasWidth, WindowHeight));
	Canvas.setFillColor(sf::Color(255, 255, 255));
	Canvas.setPosition(CloseBarWidth + PaintingBarWidth, 0);

	// Buttons 
	short CurrentPressedButton = 1;
	short PreviousPressedButton = 0;

	Button Close;
	Close.setSize(CloseBarWidth, CloseBarWidth);
	Close.setFillColor(50, 0, 50);
	Close.setPosition(0, 0);
	Close.setText("", font, CloseBarWidth / 2, 235, 235, 235);
	Close.setStroke(235, 235, 235);

	Button Brush;
	Brush.setSize(CloseBarWidth * 8, CloseBarWidth);
	Brush.setFillColor(110, 0, 110);
	Brush.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 0.5);
	Brush.setText("BRUSH", font, CloseBarWidth / 2, 235, 235, 235);
	Brush.setStroke(235, 235, 235);
	Brush.Press(window);

	Button Line;
	Line.setSize(CloseBarWidth * 8, CloseBarWidth);
	Line.setFillColor(110, 0, 110);
	Line.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 2);
	Line.setText("LINE", font, CloseBarWidth / 2, 235, 235, 235);
	Line.setStroke(235, 235, 235);

	Button Rectangle;
	Rectangle.setSize(CloseBarWidth * 8, CloseBarWidth);
	Rectangle.setFillColor(110, 0, 110);
	Rectangle.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 3.5);
	Rectangle.setText("RECTANGLE", font, CloseBarWidth / 2, 235, 235, 235);
	Rectangle.setStroke(235, 235, 235);

	Button Ellipse;
	Ellipse.setSize(CloseBarWidth * 8, CloseBarWidth);
	Ellipse.setFillColor(110, 0, 110);
	Ellipse.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 5);
	Ellipse.setText("ELLIPSE", font, CloseBarWidth / 2, 235, 235, 235);
	Ellipse.setStroke(235, 235, 235);

	Button Filling;
	Filling.setSize(CloseBarWidth * 8, CloseBarWidth);
	Filling.setFillColor(110, 0, 110);
	Filling.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 6.5);
	Filling.setText("FILLING", font, CloseBarWidth / 2, 235, 235, 235);
	Filling.setStroke(235, 235, 235);

	Button Clear; // Не нажимается (PressAnimation)
	Clear.setSize(CloseBarWidth * 8, CloseBarWidth);
	Clear.setFillColor(110, 0, 110);
	Clear.setPosition(CloseBarWidth * 1.5, WindowHeight - CloseBarWidth * 1.5);
	Clear.setText("CLEAR", font, CloseBarWidth / 2, 235, 235, 235);
	Clear.setStroke(235, 235, 235);

	// Sliders 
	Button BoldText;
	BoldText.setSize(CloseBarWidth * 6, CloseBarWidth);
	BoldText.setFillColor(110, 0, 110);
	BoldText.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 8);
	BoldText.setText("BOLD", font, CloseBarWidth / 2, 235, 235, 235);
	BoldText.setStroke(235, 235, 235);
	Slider Bold;
	Bold.setScrollSpeed(0.05);
	Bold.setSize(CloseBarWidth * 2, CloseBarWidth);
	Bold.setFillColor(185, 150, 185);
	Bold.setPosition(CloseBarWidth * 7.5, CloseBarWidth * 8);
	Bold.setText("100", font, CloseBarWidth / 2, 50, 0, 50);
	Bold.setStroke(235, 235, 235);
	Bold.setBoundaries(0, 100);
	Bold.setValue(10);

	Slider R;
	R.setSize(CloseBarWidth * 2, CloseBarWidth);
	R.setFillColor(185, 150, 185);
	R.setPosition(CloseBarWidth * 1.5, CloseBarWidth * 9.5);
	R.setText("0", font, CloseBarWidth / 2, 50, 0, 50);
	R.setStroke(235, 235, 235);
	R.setBoundaries(0, 255);

	Slider G;
	G.setSize(CloseBarWidth * 2, CloseBarWidth);
	G.setFillColor(185, 150, 185);
	G.setPosition(CloseBarWidth * 3.83, CloseBarWidth * 9.5);
	G.setText("0", font, CloseBarWidth / 2, 50, 0, 50);
	G.setStroke(235, 235, 235);
	G.setBoundaries(0, 255);

	Slider B;
	B.setSize(CloseBarWidth * 2, CloseBarWidth);
	B.setFillColor(185, 150, 185);
	B.setPosition(CloseBarWidth * 6.16, CloseBarWidth * 9.5);
	B.setText("0", font, CloseBarWidth / 2, 50, 0, 50);
	B.setStroke(235, 235, 235);
	B.setBoundaries(0, 255);

	Button Color;
	Color.setSize(CloseBarWidth, CloseBarWidth);
	Color.setFillColor(0, 0, 0);
	Color.setPosition(CloseBarWidth * 8.5, CloseBarWidth * 9.5);
	Color.setStroke(235, 235, 235);

	// Mouse 
	sf::Vector2i MousePosition = { WindowWidth / 2, WindowHeight / 2 };
	bool isLBMPressed = false;
	short MouseWheelDelta;

	// Drawing
	while (window.isOpen())
	{

		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
		}

		// Get Mouse Position
		MousePosition = sf::Mouse::getPosition();

		// Mouse Left Button
		if (sf::Mouse::isButtonPressed(sf::Mouse::Left)) {

			isLBMPressed = true;

			if (Close.isMouseOn(MousePosition)) {
				if (!Close.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 0;
				}
			}
			if (Brush.isMouseOn(MousePosition)) {
				if (!Brush.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 1;
				}
			}
			if (Line.isMouseOn(MousePosition)) {
				if (!Line.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 2;
				}
			}
			if (Rectangle.isMouseOn(MousePosition)) {
				if (!Rectangle.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 3;
				}
			}
			if (Ellipse.isMouseOn(MousePosition)) {
				if (!Ellipse.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 4;
				}
			}
			if (Filling.isMouseOn(MousePosition)) {
				if (!Filling.isPressed()) {
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 5;
				} 
			}
			if (Clear.isMouseOn(MousePosition)) {
				if (!Clear.isPressed()) { 
					PreviousPressedButton = CurrentPressedButton;
					CurrentPressedButton = 6;
				}
			}

			isLBMPressed = false;
		}

		// Mouse Wheel
		if (event.mouseWheelScroll.wheel == sf::Mouse::Wheel::VerticalWheel) {

			MouseWheelDelta = event.mouseWheelScroll.delta;
			
			if (Bold.isMouseOn(MousePosition)) {
				if (MouseWheelDelta == 1)
					Bold.increase(window);
				if (MouseWheelDelta == -1)
					Bold.decrease(window);
			}
			if (R.isMouseOn(MousePosition)) {
				if (MouseWheelDelta == 1)
					R.increase(window);
				if (MouseWheelDelta == -1)
					R.decrease(window);
			}
			if (G.isMouseOn(MousePosition)) {
				if (MouseWheelDelta == 1)
					G.increase(window);
				if (MouseWheelDelta == -1)
					G.decrease(window);
			}
			if (B.isMouseOn(MousePosition)) {
				if (MouseWheelDelta == 1)
					B.increase(window);
				if (MouseWheelDelta == -1)
					B.decrease(window);
			}
		}

		// Return Previous Button
		switch (PreviousPressedButton) {
		case 0:
			Close.Return(window);
			break;
		case 1:
			Brush.Return(window);
			break;
		case 2:
			Line.Return(window);
			break;
		case 3:
			Rectangle.Return(window);
			break;
		case 4:
			Ellipse.Return(window);
			break;
		case 5:
			Filling.Return(window);
			break;
		case 6:
			Clear.Return(window);
			break;
		}

		// Action
		short bold = Bold.getValue();

		// Color 
		Color.setFillColor(R.getValue(), G.getValue(), B.getValue());
		sf::Vector3f color;
		color.x = R.getValue();
		color.y = G.getValue();
		color.z = B.getValue();

		short buf;
		switch (CurrentPressedButton) {
		case 0:
			Close.Press(window);
			ProcessClose();
			break;
		case 1:
			Brush.Press(window);
			ProcessBrush(MousePosition, bold, color);
			break;
		case 2:
			Line.Press(window);
			window.display();
			ProcessLine(MousePosition, bold, color);
			break;
		case 3:
			Rectangle.Press(window);
			break;
		case 4:
			Ellipse.Press(window);
			break;
		case 5:
			Filling.Press(window);
			break;
		case 6:
			ProcessClear(window, Canvas);
			buf = PreviousPressedButton;
			PreviousPressedButton = CurrentPressedButton;
			CurrentPressedButton = buf;
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
		}

		if (WindowDraw < 2) {
			window.draw(Canvas);

			WindowDraw++;
		}
		else {
			window.draw(CloseBar);
			window.draw(PaintingBar);

			// Buttons
			Close.draw(window);
			Brush.draw(window);
			Line.draw(window);
			Rectangle.draw(window);
			Ellipse.draw(window);
			Filling.draw(window);

			Clear.draw(window);

			// Slider
			BoldText.draw(window);
			Bold.draw(window);
			R.draw(window);
			G.draw(window);
			B.draw(window);
			Color.draw(window);
		}

		window.display();
	}

	return 0;
}
