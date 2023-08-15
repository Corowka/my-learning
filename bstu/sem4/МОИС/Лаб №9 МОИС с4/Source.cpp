#include <iostream>
#include <cmath>

using namespace std;

int A(int n, int k) {
    int result = 1;
    for (int i = 0; i < k; i++) {
        result *= (n - i);
    }
    return result;
}

int main() {
    int n = 1;
    int k = 1;
    int m = 3;
    long long top = pow(10, m);
    while (true) {
        n++; if (A(n, k) >= top) break;
        k++; if (A(n, k) >= top) break;
    }
    cout << A(n, k) << ' ' << n << ' ' << k << ' ' << m << ' ' << top << endl;
    cout << A(n, k - 1) << ' ' << A(n, k - 2);
    return 0;
}