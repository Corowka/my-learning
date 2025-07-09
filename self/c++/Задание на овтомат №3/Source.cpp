#include "Header.h"

double CalculateP(double time) { // ���������� ������������� (0, 0.8]
	return (1 / 20 * exp(-time / 2 + 3));
}

double CalculateK(double time) { // �������������� �������������
	return (2 / sqrt(2 * pi) * exp(-0.5 * pow(time - 1.5, 2)));
}
