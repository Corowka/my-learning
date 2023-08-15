#include "LinearModel.h"

LinearModel::LinearModel(int n_input) {
	n_input_ = n_input;
}

vector<float> LinearModel::FIT(vector<vector<float>> input_data, vector<float> output_data, float lr, int n_epoches, float accuracy) {

	srand(time(NULL));

	for (int i = 0; i < n_input_ + 1; i++)
		w_.push_back(-1 + (float)(rand() % 20000) / 10000);

	int k_pairs = output_data.size();

	vector<float> loss;

	for (int e = 0; e < n_epoches; e++) {
		vector<float> output_pred;
		for (int i = 0; i < k_pairs; i++) {
			output_pred.push_back(PREDICT(input_data[i]));
			vector<float> grad = CALC_GRAD(input_data[i], output_pred[i], output_data[i]);
			for (int i = 0; i < n_input_ + 1; i++)
				w_[i] -= lr * grad[i];
		}
		loss.push_back(MSE(output_pred, output_data));
		if (loss[e] < accuracy)
			break;
	}
	
	return loss;
}

float LinearModel::MSE(vector<float> output_pred, vector<float> output_data) {
	float mse = 0;
	int n = output_pred.size();
	for (int i = 0; i < n; i++) {
		mse += pow(output_pred[i] - output_data[i], 2);
	}
	return mse / 2;
}

vector<float> LinearModel::CALC_GRAD(vector<float> input, float output_pred, float output) {
	for (int i = 0; i < n_input_; i++)
		input[i] *= (output_pred - output);
	input.push_back(output_pred - output);
	return input;
}

float LinearModel::PREDICT(vector<float> input) {
	float output = 0;
	for (int i = 0; i < n_input_; i++)
		output += w_[i] * input[i];
	return output + w_[n_input_];
}

vector<float> LinearModel::W() {
	return w_;
}
