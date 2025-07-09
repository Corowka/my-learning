#include "header.h"

inline string RightSewt(string value, int size) {
	while (value.size() < size) value = " " + value;
	return value;
}

inline string LeftSewt(string value, int size) {
	while (value.size() < size) value += " ";
	return value;
}

inline int Parsing(string value) {
	int d = 0, n = value.size();
	int Integer = 0;
	for (int i = n - 1; i >= 0; i--) {
		if ('0' <= value[i] && value[i] <= '9') Integer += (value[i] - '0') * pow(10, d);
		d++;
	}
	return Integer;
}

inline bool IsWord(string value) {
	int n = value.size();
	for (int i = 0; i < n; i++) if ('0' <= value[i] && value[i] <= '9') return 0;
	return 1;
}

inline string ConvertToString(int value) {
	string NewValue;
	while (value != 0) {
		NewValue = (char)(value % 10 + '0') + NewValue;
		value /= 10;
	}
	return NewValue;
}

inline bool IsFullFIO(string value) {
	int size = value.size(), count = 0;
	for (int i = 0; i < size; i++) {
		if (value[i] == ' ') count++;
		if (count == 2) return 1;
	}
	return 0;
}