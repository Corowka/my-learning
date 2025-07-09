#include "Header.h"

inline double N(double m, double sigma) {
	int n = 11;
	double R = 0;
	for (int i = 0; i < n; i++) R += (double)(rand() % 100 + 1) / 100;
	return m + sigma * sqrt(12 / n) * (R - n / 2);
}

inline double U(double c, double d) {
	return c + (double)(-100 * d + rand() % ((int)d * 200 + 1)) / 100;
}

inline double E(double lambda) {
	return -1 / lambda * log(1 - (double)(rand() % 100) / 100);
}
