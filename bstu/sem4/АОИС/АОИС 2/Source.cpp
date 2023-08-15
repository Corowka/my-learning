#include "LinearModel.h"

float f(float x) {
	return 3 * sin(5 * x) + 0.5;
}

int main() {

	float a = 0;
	float b = 1.233;
	float n = 30;
	float h = (b - a) / n;

	vector<float> x;
	for (int i = 0; i < n; i++)
		x.push_back(a + h * i);

	vector<float> y;
	for (int i = 0; i < n; i++)
		y.push_back(f(x[i]));

	vector<vector<float>> input_data;
	vector<float> output_data;
	int n_input = 4;
	int k_pairs = n - n_input;
	for (int i = 0; i < k_pairs; i++) {
		vector<float> input;
		for (int j = 0; j < n_input; j++)
			input.push_back(y[i + j]);
		float output = y[i + n_input];
		input_data.push_back(input);
		output_data.push_back(output);
	}

	LinearModel model(n_input);

	vector<float> loss = model.FIT(input_data, output_data, 0.05, 1000, 0.000001);

	for (int i = 0; i < loss.size(); i++)
		cout << "epoch:" << setw(5) << i << " loss:" << setw(20) << loss[i] << endl;

	vector<float> w = model.W();

	cout << "WEIGHTS:";
	for (int i = 0; i < w.size(); i++)
		cout << setw(20) << w[i];
	cout << endl;

	y.clear();
	for (int i = output_data.size() - n_input; i < output_data.size(); i++)
		y.push_back(output_data[i]);

	vector<float> y_pred;
	for (int i = 0; i < n; i++) {
		x.clear();
		for (int j = i; j < i + n_input; j++)
			x.push_back(y[j]);
		y_pred.push_back(model.PREDICT(x));
		y.push_back(y_pred[i]);
	}

	x.clear();
	for (int i = 0; i < n; i++)
		x.push_back(b + h * i);

	y.clear();
	for (int i = 0; i < n; i++)
		y.push_back(f(x[i]));

	for (int i = 0; i < n; i++)
		cout << "y_pred: " << setw(20) << y_pred[i]
		<< setw(15) << "y: " << setw(20) << y[i]
		<< setw(15) << "delta: " << setw(20) << fabs(y_pred[i] - y[i]) << endl;

	/*cout << "X:" << endl;
	for (int i = 0; i < n; i++)
		cout << x[i] << endl;

	cout << "Y_PRED:" << endl;
	for (int i = 0; i < n; i++)
		cout << y_pred[i] << endl;

	cout << "Y:" << endl;
	for (int i = 0; i < n; i++)
		cout << y[i] << endl;*/
			 
	return 0;
}