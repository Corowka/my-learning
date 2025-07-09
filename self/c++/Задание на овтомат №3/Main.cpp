#include "Header.h"

int main() {
	srand(time(NULL));

	double* stats = new double[390];

	double Time; 
	int Day = 1; 
	double P;
	double K;
	double ProssentOfPassing;
	double TimeOfPassing = 0;
	int Labs = 7;
	int PassedLabs = 0;
	int TheBestTime = 0;

	std::cout << "==========================================" << std::endl;
	std::cout << "|   Time   |     Days     |   Procents   |" << std::endl;
	std::cout << "==========================================" << std::endl;

	for (int i = 0; i < 391; i++) {
		stats[i] = 0;
		for (int j = 0; j < 10000; j++) {
			Time = (double) i / 60;
			PassedLabs = 0;
			Day = 0;
			while (PassedLabs < Labs) {
				if (Time + TimeOfPassing < 6.5) {
					ProssentOfPassing = (CalculateP(Time) + CalculateK(Time)) / 2 * 1.8;
					if ((double)(rand() % 100 + 1) / 100 < ProssentOfPassing) {
						TimeOfPassing = 0.5 + (double)(rand() % 6) / 10;
						Time += TimeOfPassing;
						PassedLabs++;
					}
					else { 
						Day++;
						Time = (double) i / 60;
					}
				}
				if (Day >= 100)
					break;
			}
			stats[i] += (double) Day / 10000;
		}
		std::cout << "| #" << std::setw(3) << i / 60 << "h" << std::setw(2) << i % 60 << "m |" 
			<< std::setw(13) << stats[i] << " |" 
			<< std::setw(13) << (CalculateP((double)i / 60) + CalculateK((double)i / 60)) / 2 * 1.8 << " |" << std::endl;
		if (stats[i] < stats[TheBestTime])
			TheBestTime = i;
		if (stats[i] >= 99)
			break;
	}

	std::cout << "==========================================" << std::endl;
	std::cout << "| The best time:                         |" << std::endl;
	std::cout << "==========================================" << std::endl;
	std::cout << "|  " << std::setw(3) << TheBestTime / 60 << "h" << std::setw(2) << TheBestTime % 60 << "m |"
		<< std::setw(13) << stats[TheBestTime] << " |"
		<< std::setw(13) << (CalculateP((double)TheBestTime / 60) + CalculateK((double)TheBestTime / 60)) / 2 * 1.8 << " |" << std::endl;
	std::cout << "==========================================" << std::endl;
}