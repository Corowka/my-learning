#include "Header.h"

int main() {

	srand(time(NULL));

	// ��������� �������� 
	double Desire; // ������� (%, 0.00 - 1.00)
	Desire = 0.5;
	double LearnPower; // ����������� ������� (%, 0.00 - 1.00)
	LearnPower = 0.5;
	
	// ��������� ������ 
	double WorkTime; // ����� ������ (hour, Minworktime - MinWorkTime+1)
	double MinWorkTime = 0.5; // ����������� ������� ����� (hour, 0.5 || 2.5) 
	int Day = 0; // ���� ����� (day, 0 - 120)
	double WorkProgress = 0; // ���������� ������ (%, 0 - 100)
	double TotalWork = 0; // ����� ������ (%, 0.00 - AllLabs * 1.00)
	unsigned Labs = 0; // ���������� ��� (unsigned, 0 - AllLabs)
	unsigned AllLabs = 7; // ����� ���������� ��� (unsigned, 0 - AllLabs)
	unsigned DoneLabs = 0; // �������� ����

	std::cout << "==================================" << std::endl;
	std::cout << "|   Day   |       Progress       |" << std::endl;
	std::cout << "==================================" << std::endl;

	while (WorkProgress < AllLabs && Day < 120) {

		if (Day % 14 == 0 && AllLabs != Labs) { // ������ ������� ��������� ������������
			Labs++;
			std::cout << "==================================" << std::endl;
			std::cout << "| Next lab #" << std::setw(4) << Labs << " has been added!" << " |" << std::endl;
			std::cout << "==================================" << std::endl;
			TotalWork += 1;
		}

		if ((double)(rand() % 101) / 100 <= Desire && WorkProgress < TotalWork) { // �������� �� ������� �������
			WorkTime = MinWorkTime + (double)(rand() % 11) / 10; // ����������� ����� ������
			WorkProgress += LearnPower / 1.5 * WorkTime; // ������
			std::cout << "| #" << std::setw(5) << Day + 1 << " |" << std::setw(21) << (int)(WorkProgress * 100) % 100 << "% |" << std::endl;
		}
		else 
			std::cout << "| #" << std::setw(5) << Day + 1 << " |" << std::setw(24) << " |" << std::endl;

		if (Day == 98) // ���� ���������)
			MinWorkTime = 2.5;

		if ((int)WorkProgress / 1 != DoneLabs) {
			DoneLabs++;
			std::cout << "==================================" << std::endl;
			std::cout << "|       Lab #" << std::setw(4) << DoneLabs << " has been done!" << " |" << std::endl;
			std::cout << "==================================" << std::endl;
		}

		Day++; // ��������� ���� 
	}

	if (DoneLabs == AllLabs)
		std::cout << "The session has been done successfully!" << std::endl;
	else {
		std::cout << "==================================" << std::endl;
		std::cout << "The session has been failed!" << std::endl;
	}
}