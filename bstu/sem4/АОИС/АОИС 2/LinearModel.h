#pragma once
#include <iostream>
#include <vector>
#include <iomanip>
#include <ctime>
#include <cmath>

using namespace std;

class LinearModel
{
private:

	vector<float> w_;
	int n_input_;

public:

	LinearModel(int n_input);

	vector<float> FIT(vector<vector<float>> input_data, vector<float> output_data, float lr, int n_epoches, float accuracy);

	float MSE(vector<float> output_pred, vector<float> output);

	float PREDICT(vector<float> input);

	vector<float> CALC_GRAD(vector<float> input, float output_pred, float output);

	vector<float> W();

};

