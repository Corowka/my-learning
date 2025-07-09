#include <SFML/Graphics.hpp>
#include <iostream>
#include <ctime>
#include <string>

// QueueClass
class QueueList {
public:
	struct NodeQueue {
		unsigned cell;
		NodeQueue* next;
	};
	NodeQueue* Back;
	NodeQueue* Front;
	QueueList() {
		Back = NULL;
		Front = NULL;
	}
	~QueueList() {};
	void push(unsigned cell) {
		if (Front == NULL) {
			Front = new NodeQueue;
			Back = Front;
			Front->cell = cell;
			Front->next = NULL;
		}
		else {
			NodeQueue* temp = new NodeQueue;
			temp->cell = cell;
			temp->next = NULL;
			Front->next = temp;
			Front = temp;
		}
	}
	void pop() {
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else {
			NodeQueue* p = Back;
			Back = Back->next;
			delete p;
		}
	}
	void print() {
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else
			for (NodeQueue* p = Back; p != NULL; p = p->next)
				std::cout << p->cell << " ";
		std::cout << std::endl;
	}
	unsigned front() {
		unsigned cell;
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else 
			cell = Front->cell;
		return cell;
	}
	unsigned back() {
		unsigned cell = 0;
		if (Front == NULL)
			std::cerr << "Queue is empty." << std::endl;
		else
			cell = Back->cell;
		return cell;
	}
	unsigned size() {
		unsigned size = 0;
		if (Front != NULL)
			for (NodeQueue* p = Back; p != NULL; p = p->next)
				size++;
		return size;
	}
	bool empty() {
		return ((Front == NULL) ? 1 : 0);
	}
};

// Functions 
std::string ConvertToString(int value) {
	std::string NewValue;
	while (value != 0) {
		NewValue = (char)(value % 10 + '0') + NewValue;
		value /= 10;
	}
	return NewValue;
}
 
int main()
{
	srand(time(NULL));

	// Font
	sf::Font font;
	font.loadFromFile("C:/Users/kopan/source/repos/Snake SFML/x64/Debug/Fonts/Intro.otf");

	// Colors 
	unsigned BgColor[] = { 138, 43, 226 }; 
	unsigned CellsColor[] = { 238, 130, 238 }; 
	unsigned ScoreBarColor[] = { 70, 0, 70 }; 
	unsigned AppleColor[] = { 255, 255, 102 }; 
	unsigned SnakeColor[] = { 255, 0, 255 }; 
	unsigned WallColor[] = { 120, 0, 120 }; 
	unsigned GameOverBgColor[] = { 50, 0, 20 }; 
	unsigned FontColor[] = { 255, 255, 255 };


	// WindowSettings
	bool FullScreen = false;
	unsigned WindowHeight = 1080;
	unsigned WindowWidth = 1920;
	sf::RenderWindow window(sf::VideoMode(WindowWidth, WindowHeight), "Snake beta");
	if (FullScreen == true) {
		window.create(sf::VideoMode::getDesktopMode(), "Snake beta", sf::Style::None);
		WindowHeight = window.getSize().y;
		WindowWidth = window.getSize().x;
	}


	// Create map 
	unsigned ScaleCells = 64;
	if (WindowHeight / 3 * 4 == WindowWidth)
		ScaleCells = 40;
	unsigned CellSize = WindowWidth / ScaleCells;
	unsigned columns = WindowWidth / CellSize;
	unsigned rows = (WindowHeight - CellSize) / CellSize;
	unsigned AmountOfCells = columns * rows;
	short* map = new short[AmountOfCells];
	for (int i = 0; i < AmountOfCells; i++) {
		if (i % columns == 0 || i % columns == columns - 1 || i / columns == 0 || i / columns == rows - 1)
			map[i] = 1;
		else
			map[i] = 0;
	}


	// DrawCellsSettings
	unsigned G_AmountOfPoints = (rows - 1) * 2;
	sf::VertexArray G_lines(sf::Lines, G_AmountOfPoints);
	int x = 0;
	int y = CellSize;
	for (int i = 1; i < G_AmountOfPoints + 1; i++) {
		if (i % 4 < 2)
			x = 0;
		else
			x = WindowWidth;
		if ((i - 1) % 2 == 0)
			y += CellSize;
		G_lines[i - 1].position = sf::Vector2f(x, y);
		G_lines[i - 1].color = sf::Color(CellsColor[0], CellsColor[1], CellsColor[2]);
	}
	unsigned V_AmountOfPoints = (columns - 1) * 2;
	sf::VertexArray V_lines(sf::Lines, V_AmountOfPoints);
	x = 0;
	y = 0;
	for (int i = 1; i < V_AmountOfPoints + 1; i++) {
		if (i % 4 < 2)
			y = 0;
		else
			y = WindowWidth;
		if ((i - 1) % 2 == 0)
			x += CellSize;
		V_lines[i - 1].position = sf::Vector2f(x, y);
		V_lines[i - 1].color = sf::Color(CellsColor[0], CellsColor[1], CellsColor[2]);
	}

	// DrawBackgroundSettings
	sf::RectangleShape Background(sf::Vector2f(WindowWidth, WindowHeight));
	Background.setFillColor(sf::Color(BgColor[0], BgColor[1], BgColor[2]));


	// DrawScoreBarsettings
	unsigned FontSize = CellSize / 2;
	sf::RectangleShape ScoreBar(sf::Vector2f(WindowWidth, CellSize));
	ScoreBar.setFillColor(sf::Color(ScoreBarColor[0], ScoreBarColor[1], ScoreBarColor[2]));
	std::string ScoreOutput = "SCORE 0";
	sf::Text Score(ScoreOutput, font, FontSize);
	Score.setFillColor(sf::Color(FontColor[0], FontColor[1], FontColor[2]));
	Score.setPosition(CellSize / 4, CellSize / 4);


	// FPS
	bool EnableFps = true;
	sf::Clock FpsTimer;
	float FpsTime;
	float Frames = 0;
	sf::Text FPS("", font, FontSize);
	FPS.setFillColor(sf::Color(FontColor[0], FontColor[1], FontColor[2]));
	FPS.setPosition(WindowWidth - CellSize / 4 - FontSize * 3, CellSize / 4);

	
	// SnakeSpawnSettings
	QueueList Snake;
	unsigned StartSnakeLenght = 5;
	unsigned SnakeSpawnPoint = rows / 2 * columns + columns / 4 - 1 + StartSnakeLenght * columns;
	for (int i = 0; i < StartSnakeLenght; i++) {
		SnakeSpawnPoint -= columns;
		Snake.push(SnakeSpawnPoint);
		map[SnakeSpawnPoint] = 2;
	}

	// SnakeMovementSettings
	float SnakeTimeStep = 100;
	int SnakeMove = -(int)(columns);

	
	// SnakePaintSettings 
	unsigned Grad = 20;
	float GradColor_RGB[] = { (255 - SnakeColor[0]) / Grad, (255 - SnakeColor[1]) / Grad, (255 - SnakeColor[2]) / Grad };


	// DrawWallsSettings
	QueueList Walls;
	for (int i = 0; i < AmountOfCells; i++)
		if (map[i] == 1)
			Walls.push(i);


	// AppleSpawnSettings
	unsigned AppleScore = 0;
	unsigned ApplePos = 1 + columns + rand() % (rows - 2) * columns + rand() % (columns - 2);
	while (map[ApplePos] == 1)
		ApplePos++;
	map[ApplePos] = 3;
	sf::RectangleShape Apple(sf::Vector2f(CellSize, CellSize));
	Apple.setFillColor(sf::Color(AppleColor[0], AppleColor[1], AppleColor[2]));
	Apple.setPosition(ApplePos % columns * CellSize, CellSize + ApplePos / columns * CellSize);


	// Clock
	sf::Clock Clock;
	float time;


	// GameStatus
	bool Gaming = true;

 
	while (window.isOpen())
	{
		// Playing
		while (Gaming == true) {

			sf::Event event;
			while (window.pollEvent(event))
			{
				if (event.type == sf::Event::Closed)
					window.close();
			}

			window.clear();

			// Draw Background
			window.draw(Background);
			window.draw(G_lines);
			window.draw(V_lines);

			// Draw ScoreBar
			window.draw(ScoreBar);
			if (AppleScore != 0)
				ScoreOutput = "SCORE " + ConvertToString(AppleScore);
			Score.setString(ScoreOutput);
			window.draw(Score);
			if (EnableFps) {
				FpsTime = FpsTimer.getElapsedTime().asSeconds();
				Frames++;
				if (FpsTime > 1) {
					FPS.setString(ConvertToString(Frames));
					Frames = 0;
					FpsTimer.restart();
				}
			}
			window.draw(FPS);

			// Draw Walls
			for (QueueList::NodeQueue* p = Walls.Back; p != NULL; p = p->next) {
				sf::RectangleShape Wall(sf::Vector2f(CellSize, CellSize));
				Wall.setFillColor(sf::Color(WallColor[0], WallColor[1], WallColor[2]));
				Wall.setPosition(p->cell % columns * CellSize, (p->cell / columns) * CellSize + CellSize);
				window.draw(Wall);
			}

			// SnakeControler
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::W) && SnakeMove != columns) {
				SnakeMove = -(int)(columns);
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::A) && SnakeMove != 1) {
				SnakeMove = -1;
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::S) && SnakeMove != -(int)(columns)) {
				SnakeMove = columns;
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::D) && SnakeMove != -1) {
				SnakeMove = 1;
			}

			// SnakeMovement
			time = Clock.getElapsedTime().asMilliseconds();
			if (time > SnakeTimeStep) {
				unsigned SnakeNextStep = Snake.front() + SnakeMove;
				if (map[SnakeNextStep] != 1 && map[SnakeNextStep] != 2) {
					Snake.push(SnakeNextStep);
					Clock.restart();
				}
				else {
					Gaming = false;
				}
				if (map[SnakeNextStep] == 3) {
					SnakeTimeStep *= 0.97;
					AppleScore++;
					ApplePos = 1 + columns + rand() % (rows - 2) * columns + rand() % (columns - 2);
					while (map[ApplePos] == 1)
						ApplePos++;
					map[ApplePos] = 3;
					Apple.setPosition(ApplePos % columns * CellSize, CellSize + ApplePos / columns * CellSize);
				}
				else {
					if (map[Snake.back()] != 3)
						map[Snake.back()] = 0;
					Snake.pop();
				}
				map[SnakeNextStep] = 2;
				Clock.restart();
			}

			// Draw Snake
			unsigned SnakeNodeNum = Snake.size();
			for (QueueList::NodeQueue* p = Snake.Back; p != NULL; p = p->next) {
				sf::RectangleShape SnakeNode(sf::Vector2f(CellSize, CellSize));
				if (SnakeNodeNum > Grad) {
					SnakeNode.setFillColor(sf::Color(255, 255, 255));
				}
				else {
					SnakeNode.setFillColor(sf::Color((SnakeColor[0] + (unsigned)(GradColor_RGB[0] * SnakeNodeNum) % 255),
						(SnakeColor[1] + (unsigned)(GradColor_RGB[1] * SnakeNodeNum) % 255),
						(SnakeColor[2] + (unsigned)(GradColor_RGB[2] * SnakeNodeNum) % 255)));
				}
				SnakeNode.setPosition(p->cell % columns * CellSize, (p->cell / columns) * CellSize + CellSize);
				window.draw(SnakeNode);
				SnakeNodeNum--;
			}

			// Draw Apple
			window.draw(Apple);

			window.display();
		}

		sf::Event event;
		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::Closed)
				window.close();
		}

		// GameOver
		sf::RectangleShape GameOverBg(sf::Vector2f(WindowWidth, WindowHeight));
		GameOverBg.setFillColor(sf::Color(GameOverBgColor[0], GameOverBgColor[1], GameOverBgColor[2]));
		window.draw(GameOverBg);

		sf::Text GameOver("Game Over", font, WindowHeight / 4);
		GameOver.setFillColor(sf::Color(FontColor[0], FontColor[1], FontColor[2]));
		GameOver.setPosition(WindowWidth / 2 - WindowHeight / 3, WindowHeight / 8);
		window.draw(GameOver);

		window.display();
	}
	std::cout << AppleScore << std::endl;
	system("pause");
 
	return 0;
}