#include <iostream>
#include <iomanip>
#include <string>
#include <cmath>

using std::cout;
using std::endl;
using std::string;
using std::setw;

class VEHICLE {
protected:
	string number;
	double speed;
	double weight;
	double acceleration;
public:
	// Конструкторы
	VEHICLE(string number, double weight, double acceleration);
	// Методы
	void GASS(double time);
	void STOP(double time);
	// Друзья
	friend int COMPARE_SPEED(const class CAR& obj1, const class TRACK& obj2);
};

// Конструкторы
VEHICLE::VEHICLE(string number, double weight, double acceleration) : speed(0.0) { 
	this->number = number; 
	this->weight = weight; 
	this->acceleration = acceleration;
}
// Методы
void VEHICLE::GASS(double time) { speed += acceleration * time; }
void VEHICLE::STOP(double time) { speed -= acceleration * time; if (speed < 0) speed = 0; }

class CAR : public VEHICLE {
public:
	// Конструкторы
	CAR(string number, double weight, double acceleration);
};

// Конструкторы
CAR::CAR(string number, double weight, double acceleration) : VEHICLE(number, weight, acceleration) {}


class TRACK : public VEHICLE {
private:
	double track_weight;
	double trailer_weight;
public:
	// Конструкторы
	TRACK(string number, double track_weight, double trailer_weight, double acceleration);
};

// Конструкторы
TRACK::TRACK(string number, double track_w, double trailer_w, double acceleration) : VEHICLE(number, weight, acceleration) {
	track_weight = track_w;
	trailer_weight = trailer_w;
}

// Друзья
int COMPARE_SPEED(const CAR& obj1, const TRACK& obj2) {
	if (obj1.speed > obj2.speed) {
		cout << "The speed(" << obj1.speed <<
			") of car(" << obj1.number << ") is more than track's(" << obj2.number <<
			") speed(" << obj2.speed << ")." << endl;
		return 1;
	}
	if (obj1.speed < obj2.speed) {
		cout << "The track's(" << obj2.number << ") speed(" << obj2.speed <<
			") is more than speed(" << obj1.speed <<
			") of car(" << obj1.number << ")." << endl;
		return 2;
	}
	cout << "The speeds(" << obj1.speed << ") of this vehicles(" << obj1.number <<
		' ' << obj2.number << ") are equal." << endl;
	return 0;
}

int main()
{
	CAR car("8682 AX-3", 1000, 3.2);
	TRACK track("6446 II-2", 1700, 2000, 2.3);
	car.GASS(10);
	track.GASS(25);
	COMPARE_SPEED(car, track);
	track.STOP(15);
	COMPARE_SPEED(car, track);
	car.STOP(99999);
	track.STOP(99999);
	COMPARE_SPEED(car, track);
}
