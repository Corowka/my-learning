#include <iostream>
#include <cmath>
#include <iomanip>
#include <atltypes.h>

#define Inf 999999.0
#define is return

using namespace std;

int factorial(int n) {
	int factorial = 1;
	if (n < 0)
		cout << "Error! Factorial of a negative number doesn't exist.";
	else {
		for (int i = 1; i <= n; ++i) {
			factorial *= i;
		}
		return factorial;
	}
}

namespace task_26 {
	float f(float x) { return pow(x, 3) + 9 * pow(x, 2) - 8 * x - 9; }
	float f1(float x) { return 3 * pow(x, 2) + 18 * x - 8; }
	float f2(float x) { return 6 * x + 18; }
}

void Half(float a0, float b0, float e) {
	float a = a0, b = b0;
	cout << "a = " << a << " b = " << b << endl;
	for (int k = 1; fabs(a - b) > e; k++) {
		float x = (a + b) / 2;
		cout << setw(3) << k <<
			setw(15) << a <<
			setw(15) << b <<
			setw(15) << x <<
			setw(5) << ((task_26::f(a) * task_26::f(x) > 0) ? '+' : '-') << endl;
		if (task_26::f(a) * task_26::f(x) > 0) a = x;
		else b = x;
	} 
} 

void Chord(float a, float b, float e) {
	while (task_26::f1(a) * task_26::f1(b) < 0 && a < b) a += 0.01;
	while (task_26::f2(a) * task_26::f2(b) < 0 && a < b) b -= 0.01;
	float C = b, x = a;
	if (task_26::f(a) * task_26::f2(a) > 0) {
		C = a; x = b;
	}
	float x_prev = Inf;
	for (int k = 1; fabs(x - x_prev) > e; k++) {
		x_prev = x;
		x = x_prev - (task_26::f(x_prev) * (C - x_prev)) / (task_26::f(C) - task_26::f(x_prev));
		cout << setw(15) << "x[" << k << "]: " << x <<
			setw(15) << "dx: " << fabs(x - x_prev) << endl;
	}
}

void Newton(float a, float b, float e) {
	while (task_26::f1(a) * task_26::f1(b) < 0 && a < b) a += 0.01;
	while (task_26::f2(a) * task_26::f2(b) < 0 && a < b) b -= 0.01;
	float x = a;
	if (task_26::f(b) * task_26::f2(b) > 0) x = b;
	float x_prev = Inf;
	for (int k = 1; fabs(x - x_prev) > e; k++) {
		x_prev = x;
		x = x_prev - task_26::f(x_prev) / task_26::f1(x_prev);
		cout << setw(15) << "x[" << k << "]: " << x <<
			setw(15) << "dx: " << fabs(x - x_prev) << endl;
	}
}

float f(float x, float y) { is pow(y, 2) - pow(y, 3) - 2 * y + 1; }
float g(float x, float y) { is y - log10(x) + 1; }
float fx(float x, float y) { is 0; }
float gx(float x, float y) { is - 1 / (x * log(10)); }
float fy(float x, float y) { is 2 * y - 3 * pow(y, 2) - 2; }
float gy(float x, float y) { is 1; }

void System(float x0, float y0, float e, bool show) {
	float x = x0, y = y0;
	float x_prev = Inf, y_prev = Inf;
	for (int k = 1; fabs(x - x_prev) > e && fabs(y - y_prev) > e; k++) {
		float f_val = f(x, y),
			g_val = g(x, y),
			fx_val = fx(x, y),
			gx_val = gx(x, y),
			fy_val = fy(x, y),
			gy_val = gy(x, y);
		if (show) cout << "f(x,y):  " << f_val << endl <<
			"g(x,y):  " << g_val << endl <<
			"fx(x,y): " << fx_val << endl <<
			"gx(x,y): " << gx_val << endl <<
			"fy(x,y): " << fy_val << endl <<
			"gy(x,y): " << gy_val << endl;
		float d = fx_val * gy_val - fy_val * gx_val,
			d1 = -f_val * gy_val - fy_val * (-g_val),
			d2 = fx_val * (-g_val) - (-f_val) * gx_val;
		if (show) cout << "d:   " << d << endl <<
			"d1:  " << d1 << endl <<
			"d2: " << d2 << endl;
		float dx = d1 / d, dy = d2 / d;
		if (show) cout << "dx:   " << dx << endl <<
			"dy:  " << dy << endl;
		x_prev = x;
		y_prev = y;
		x = x + dx;
		y = y + dy;
		cout << "x[" << k << "]: " << x << endl <<
			"y[" << k << "]: " << y << endl;
	}
}

void Interpolation_Newton_1(int k, float x[], float y[], float X) {
	float** dy = new float*[k];
	for (int i = 0; i < k; i++) {
		dy[i] = new float[k - 1];
		for (int j = 0; j < k - 1; j++)
			dy[i][j] = 0;
	}
	for (int j = 0; j < k - 1; j++)
		for (int i = 0; i < k - j - 1; i++)
			if (j == 0) dy[i][j] = y[i + 1] - y[i];
			else dy[i][j] = dy[i + 1][j - 1] - dy[i][j - 1];
	for (int i = 0; i < k; i++) {
		cout << setw(3) << i << setw(5) << x[i] << setw(15) << y[i];
		for (int j = 0; j < k - 1; j++)
			cout << setw(15) << dy[i][j];
		cout << endl;
	}
	float h = x[1] - x[0];
	float P = y[0];
	for (int i = 0; i < k - 1; i++) {
		float val = 1;
		for (int j = 0; j <= i; j++)
			val *= (X - x[j]);
		P += dy[0][i] / (factorial(i + 1) * pow(h, i + 1)) * val;
	}
	cout << P << endl;
}

namespace koshi {
	float f(float x, float y) { return 2 * pow(x, 2) + sqrt(y); }
}

void Koshi(float a, float b, float n, float y0) {
	float h = (b - a) / n;
	float y = y0;
	float x = 0, k1, k2, k3, k4, dy;
	for (int k = 0; k < n; k++) {
		k1 = koshi::f(x, y);
		k2 = koshi::f(x + h / 2, y + h / 2 * k1);
		k3 = koshi::f(x + h / 2, y + h / 2 * k2);
		k4 = koshi::f(x + h, y + h * k3);
		dy = h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
		cout << setw(3) << k <<
			setw(15) << x <<
			setw(15) << y <<
			setw(15) << k1 <<
			setw(15) << k2 <<
			setw(15) << k3 <<
			setw(15) << k4 <<
			setw(15) << dy << endl;
		x += h;
		y += dy;
	}
	cout << setw(3) << n <<
		setw(15) << x <<
		setw(15) << y << endl;
}

int main()
{
	/*Half(-1, 0, 0.01);
	Chord(-1, 0, 0.01);
	Newton(-1, 0, 0.01);*/

	//System(1.2, -0.8, 0.01, 1);

	/*const int k = 5;
	float x[k] = { 3.0, 3.2, 3.4, 3.6, 3.8 };
	float y[k] = { 5.70417, 6.75055, 7.88868, 9.11720, 10.4350 };
	Interpolation_Newton_1(k, x, y, x[0] + 0.1);
	Interpolation_Newton_1(k, x, y, x[4] - 0.1);
	Interpolation_Newton_1(k, x, y, x[2] + 0.1);*/
	Koshi(0, 1, 5, 1.4);
}


