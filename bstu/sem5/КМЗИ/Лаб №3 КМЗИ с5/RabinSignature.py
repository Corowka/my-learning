import random
import hashlib
import math


class RabinSignature:

    def load_primes(self, filename):
        primes = []
        with open(filename, 'r') as file:
            primes = list(map(int, file.read().split()))
        return primes


    def get_random_string(self, size):
        res = ""
        for i in range(size):
            res += str((random.randint(0, 1)))
        return res

    def get_hash_value(self, s):
        return int.from_bytes(hashlib.sha256(s.encode()).digest(), 'big')

    def is_quadratic_residue(self, val, pr):
        return 1 == pow(val, (pr - 1) // 2, pr)

    def get_prime_candidate(self, bits):
        prime_candidate = random.randint(2 ** (bits - 1), (2 ** bits) - 1)
        if (prime_candidate % 2 == 0):
            prime_candidate += 1
        return prime_candidate

    def witness(self, a, k, m, p):
        b = pow(a, m, p)
        if b == 1:
            return False

        for i in range(k):
            if ((-1 % p) == (b % p)):
                return False
            b = (b * b) % p
        return True

    def initial_check(self, prime_candidate):
        for prime in self.primes:
            if prime_candidate % prime == 0:
                return False
        return True

    def miller_rabin_test(self, prime_candidate):
        if not self.initial_check(prime_candidate):
            return False

        temp = prime_candidate - 1
        k = 0
        while temp % 2 == 0:
            temp //= 2
            k += 1
        m = temp

        for j in range(70):
            a = random.randint(2, prime_candidate - 2)
            if self.witness(a, k, m, prime_candidate):
                return False
        return True

    def get_prime(self, bits):
        prime_candidate = self.get_prime_candidate(bits)
        while not self.miller_rabin_test(prime_candidate):
            prime_candidate = self.get_prime_candidate(bits)
        return prime_candidate

    def __init__(self, k):
        self.primes = self.load_primes('primes.txt')
        self.k = k

    def get_public_keys(self):
        p = self.get_prime(self.k)
        q = self.get_prime(self.k)
        return (p, q)

    def get_signature(self, M, p, q):
        n = p * q
        b = 10 ** 9 + 7
        d = b * pow(2, (p - 1) * (q - 1) - 1, n)
        U = self.get_random_string(60)
        c = self.get_hash_value(M + U)
        m = c + d * d

        while (not (self.is_quadratic_residue(m, p) and self.is_quadratic_residue(m, q))):
            U = self.get_random_string(60)
            c = self.get_hash_value(M + U)
            m = c + d * d

        v1 = pow(m, (p + 1) // 4, p) * q * pow(q, p - 2, p)
        v2 = pow(m, (q + 1) // 4, q) * p * pow(p, q - 2, q)
        y = (v1 + v2) % n
        x = (y - d) % n
        return (U, x)

    def verify(self, p, q, U, x, M):
        n = p * q
        b = 10 ** 9 + 7
        c = self.get_hash_value(M + U)
        l_side = x * (x + b)
        r_side = c
        if (l_side % n == r_side % n):
            return 1
        return 0
