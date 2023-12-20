#include "SHA512.h"

int64 rotr(int64 x, int n) {
	return (x >> n) | (x << (64 - n));
}

int64 shr(int64 x, int n) {
	return (x >> n);
}

string gethex(string bin) {
	if (bin == "0000") return "0"; if (bin == "0001") return "1";
	if (bin == "0010") return "2"; if (bin == "0011") return "3";
	if (bin == "0100") return "4"; if (bin == "0101") return "5";
	if (bin == "0110") return "6"; if (bin == "0111") return "7";
	if (bin == "1000") return "8"; if (bin == "1001") return "9";
	if (bin == "1010") return "a"; if (bin == "1011") return "b";
	if (bin == "1100") return "c"; if (bin == "1101") return "d";
	if (bin == "1110") return "e"; if (bin == "1111") return "f";
}

string dec2hex(int64 deci) {
	string EQBIN = bitset<64>(deci).to_string();
	string hexstring = "";
	string temp;
	for (unsigned int i = 0;
		i < EQBIN.length(); i += 4) {
		temp = EQBIN.substr(i, 4);
		hexstring += gethex(temp);
	}
	return hexstring;
}

int64 bin2dec(string bin) {
	int64 value = bitset<64>(bin).to_ullong();
	return value;
}

void SHA512::separator(string getBlock) {
	int chunknum = 0;
	for (unsigned int i = 0;
		i < getBlock.length();
		i += 64, ++chunknum) {
		this->Message[chunknum] = bin2dec(getBlock.substr(i, 64));
	}
	for (int g = 16; g < 80; ++g) {
		int64 WordA 
			= rotr(this->Message[g - 2], 19) 
			^ rotr(this->Message[g - 2], 61) 
			^ shr(this->Message[g - 2], 6);
		cout << "WordA" << ' ' << WordA << endl;
		int64 WordB = this->Message[g - 7];
		cout << "WordB" << ' ' << WordB << endl;
		int64 WordC 
			= rotr(this->Message[g - 15], 1) 
			^ rotr(this->Message[g - 15], 8) 
			^ shr(this->Message[g - 15], 7);
		cout << rotr(this->Message[g - 15], 1) << endl;
		cout << rotr(this->Message[g - 15], 8) << endl;
		cout << shr(this->Message[g - 15], 7) << endl;
		cout << "WordC" << ' ' << WordC << endl;
		int64 WordD = this->Message[g - 16];
		cout << "WordD" << ' ' << WordD << endl;
		int64 T = WordA + WordB + WordC + WordD;
		cout << "T" << ' ' << T << endl;
		this->Message[g] = T;
	}
}

void SHA512::Func(
	int64 a, int64  b,
	int64 c, int64& d,
	int64 e, int64  f,
	int64 g, int64& h,
	int64 M, int64  K)
{
	int64 Ch = (e & f) ^ (~e & g);
	int64 sigmaE = rotr(e, 14) ^ rotr(e, 18) ^ rotr(e, 41);
	int64 sigmaA = rotr(a, 28) ^ rotr(a, 34) ^ rotr(a, 39);
	int64 maj = (a & b) ^ (b & c) ^ (c & a);
	int64 T1 = h + Ch + sigmaE + M + K;
	int64 T2 = sigmaA + maj;
	d = d + T1;
	h = T1 + T2;
}

string SHA512::hash(string myString) {
	this->Message = new int64[80];
	int64 A = 0x6a09e667f3bcc908; int64 B = 0xbb67ae8584caa73b;
	int64 C = 0x3c6ef372fe94f82b; int64 D = 0xa54ff53a5f1d36f1;
	int64 E = 0x510e527fade682d1; int64 F = 0x9b05688c2b3e6c1f;
	int64 G = 0x1f83d9abfb41bd6b; int64 H = 0x5be0cd19137e2179;
	int64 AA, BB, CC, DD, EE, FF, GG, HH;
	stringstream fixedstream;
	for (int i = 0;
		i < myString.size(); ++i) {
		fixedstream << bitset<8>(myString[i]);
	}
	string s1024;
	s1024 = fixedstream.str();
	int orilen = s1024.length();
	int tobeadded;
	int modded = s1024.length() % 1024;
	if (1024 - modded >= 128) {
		tobeadded = 1024 - modded;
	}
	else if (1024 - modded < 128) {
		tobeadded = 2048 - modded;
	}
	s1024 += "1";
	for (int y = 0; y < tobeadded - 129; y++) {
		s1024 += "0";
	}
	string lengthbits = std::bitset<128>(orilen).to_string();
	s1024 += lengthbits;
	int blocksnumber = s1024.length() / 1024;
	int chunknum = 0;
	string* Blocks = new string[blocksnumber];
	for (int i = 0; i < s1024.length();
		i += 1024, ++chunknum) {
		Blocks[chunknum] = s1024.substr(i, 1024);
	}
	for (int letsgo = 0; letsgo < blocksnumber; ++letsgo) {
		separator(Blocks[letsgo]);
		for (int i = 0; i < 80; i++) {
			cout << this->Message[i] << endl;
		}
		AA = A; BB = B; CC = C; DD = D; EE = E; FF = F; GG = G; HH = H;
		int j = 0;
		for (int i = 0; i < 10; i++) {
			Func(A, B, C, D, E, F, G, H, this->Message[j], this->k[j]); j++;
			Func(H, A, B, C, D, E, F, G, this->Message[j], this->k[j]); j++;
			Func(G, H, A, B, C, D, E, F, this->Message[j], this->k[j]); j++;
			Func(F, G, H, A, B, C, D, E, this->Message[j], this->k[j]); j++;
			Func(E, F, G, H, A, B, C, D, this->Message[j], this->k[j]); j++;
			Func(D, E, F, G, H, A, B, C, this->Message[j], this->k[j]); j++;
			Func(C, D, E, F, G, H, A, B, this->Message[j], this->k[j]); j++;
			Func(B, C, D, E, F, G, H, A, this->Message[j], this->k[j]); j++;
		}
		A += AA; B += BB; C += CC; D += DD; E += EE; F += FF; G += GG; H += HH;
	}
	delete[] this->Message;
	stringstream output;
	output << dec2hex(A); output << dec2hex(B);
	output << dec2hex(C); output << dec2hex(D);
	output << dec2hex(E); output << dec2hex(F);
	output << dec2hex(G); output << dec2hex(H);
	return output.str();
}
