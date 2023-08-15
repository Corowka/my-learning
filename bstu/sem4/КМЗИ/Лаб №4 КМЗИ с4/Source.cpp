#include <iostream>
#include <ctime>
#include <cmath>

#include <boost/multiprecision/cpp_int.hpp>

using boost::multiprecision::cpp_int;
using std::cout;
using std::cin;
using std::endl;

cpp_int gcd(cpp_int a, cpp_int b) {
    if (a == 0) {
        return b;
    }
    return gcd(b % a, a);
}

cpp_int f(cpp_int x, cpp_int n) {
    return (x % n) * (x % n) - 1;
}

cpp_int pollard_rho(cpp_int n) {
    srand(time(NULL));
    if (n == 1) {
        return n;
    }
    if (n % 2 == 0) {
        return 2;
    }
    cpp_int x = (rand() % (n - 2)) + 2;
    cpp_int y = x;
    //cpp_int c = (rand() % (n - 1)) + 1;
    cpp_int d = 1;
    while (d == 1) {
        /*x = (cpp_int(pow(x, 2)) + c + n) % n;
        y = (cpp_int(pow(y, 2)) + c + n) % n;
        y = (cpp_int(pow(y, 2)) + c + n) % n;*/
        x = f(x, n) % n;
        d = gcd(abs(x - y), n);
        if (d == n) {
            return pollard_rho(n);
        }
    }
    return d;
}

bool is_prime(cpp_int n) {
    if (n < 2) {
        return false;
    }
    cpp_int limit = sqrt(n);
    for (int i = 2; i <= limit; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

void factorize(cpp_int n) {
    if (n == 1) {
        return;
    }
    if (is_prime(n)) {
        cout << n << ' ';
        return;
    }
    cpp_int factor = pollard_rho(n);
    factorize(factor);
    factorize(n / factor);
}

int main() {
    cpp_int n;
    cout << "Enter a number to factorize: ";
    cin >> n;
    factorize(n);
    return 0;
}