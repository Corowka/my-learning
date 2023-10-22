#include "SHA512.h"

int main() {
	SHA512 hasher = SHA512();
	string S = "hello world";
	cout << S << ": " << hasher.hash(S) << endl;
}
