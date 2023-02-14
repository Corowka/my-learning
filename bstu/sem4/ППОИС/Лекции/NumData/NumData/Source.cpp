#include<vector>
#include<iostream>
#include<algorithm>

class FloatData : public std::vector<float>
{
public:

	FloatData(const float* arr, const int& size)
		: std::vector<float>(arr, arr + size) {}

	~FloatData() {}

	float Max()
	{
		float max = 0;
		for (auto& elem : *this) {
			max = std::max(elem, max);
		}
		return max;
	}

	float Sum()
	{
		float sum = 0;
		for (auto& elem : *this) {
			sum += elem;
		}
		return sum;
	}

	float Mean()
	{
		return Sum() / (*this).size();
	}

};


class IntData
{
private:
	std::vector<int> data_;

public:

	IntData(const int* arr, const int& size)
	{
		data_ = std::vector<int>(arr, arr + size);
	}

	~IntData() {}

	int Max()
	{
		int max = 0;
		for (auto& elem : data_) {
			max = std::max(elem, max);
		}
		return max;
	}

	int Sum()
	{
		int sum = 0;
		for (auto& elem : data_) {
			sum += elem;
		}
		return sum;
	}

	float Mean()
	{
		return float(Sum()) / data_.size();
	}

};


int main()
{
	int const floatArrSize = 8;
	float floatArr[] = {1, 2, 21, 4, 345, 11, 23, 112};

	FloatData floatNums(floatArr, floatArrSize);
	std::cout <<
		floatNums.Max() << ' ' <<
		floatNums.Sum() << ' ' <<
		floatNums.Mean() << std::endl;

	int const intArrSize = 8;
	int arrInt[] = { 1, 2, 21, 4, 345, 11, 23, 112 };

	IntData intNums(arrInt, intArrSize);
	std::cout <<
		intNums.Max() << ' ' <<
		intNums.Sum() << ' ' <<
		intNums.Mean() << std::endl;
}