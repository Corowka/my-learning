#include <iostream>
#include <iomanip>
#include <ctime>

using std::cout;
using std::endl;
using std::setw;


namespace WEB {

	class Client {
	private:
		double Cpkg[10];
	public:
		Client();
		friend void GET_PKG_FOR_FROM(class Client& get, const class Server& send);
		friend void GET_PKG_FOR_FROM(class Server& get, const class Client& send);
	};

	class Server {
	private:
		double Spkg[10];
	public:
		friend void GET_PKG_FOR_FROM(class Client& get, const class Server& send);
		friend void GET_PKG_FOR_FROM(class Server& get, const class Client& send);
	};

	Client::Client() {
		Cpkg[0] = 1;
		cout << setw(25) << "Cliant created packages: ";
		cout << setw(7) << Cpkg[0];
		for (int i = 1; i < 10; i++) {
			Cpkg[i] = Cpkg[i - 1] + double(rand() / 100) / 100;
			cout << setw(7) << Cpkg[i];
		}
		cout << endl;

	}

	void GET_PKG_FOR_FROM(class Client& get, const class Server& send) {
		for (int i = 0; i < 10; i++)
			if (double(rand() / 100) / 100 >= 0.4)
				get.Cpkg[i] = send.Spkg[i];
		for (int i = 0; i < 10; i++) {
			try {
				if (get.Cpkg[i] == 0) 
					throw "CLIANT:       Lost package";
			}
			catch (const char* messange) {
				try {
					if (i == 0 || i == 9) 
						throw "CLIANT:       Lost package";
					get.Cpkg[i] = trunc(((get.Cpkg[i - 1] + get.Cpkg[i + 1]) / 2) * 100) / 100;
					cout << setw(43) << messange << " #" << i << endl;
				}
				catch (const char* messange) {
					try {
						if (i == 0) 
							throw "CLIANT:       Lost package";
						get.Cpkg[i] = trunc((get.Cpkg[i - 1] * 6 / 5) * 100) / 100;
						cout << setw(43) << messange << " #" << i << endl;
					}
					catch (const char* messange) {
						get.Cpkg[i] = trunc((get.Cpkg[i + 1] * 5 / 6) * 100) / 100;
						cout << setw(43) << messange << " #" << i << endl;
					}
				}
			}
		}
		cout << setw(25) << "CLIANT: ";
		for (int i = 0; i < 10; i++)
			cout << setw(7) << get.Cpkg[i];
		cout << endl;
	}

	void GET_PKG_FOR_FROM(class Server& get, const class Client& send) {
		for (int i = 0; i < 10; i++)
			if (double(rand() / 100) / 100 >= 0.4)
				get.Spkg[i] = send.Cpkg[i];
			else
				get.Spkg[i] = 0;
		for (int i = 1; i < 9; i++) {
			try {
				if (get.Spkg[i] == 0)
					throw "SERVER:       Lost package";
			}
			catch (const char* messange) {
				try {
					if (i == 0 || i == 9) 
						throw "SERVER:       Lost package";
					get.Spkg[i] = trunc(((get.Spkg[i - 1] + get.Spkg[i + 1]) / 2) * 100) / 100;
					cout << setw(43) << messange << " #" << i << endl;
				}
				catch (const char* messange) {
					try {
						if (i == 0) 
							throw "SERVER:       Lost package";
						get.Spkg[i] = trunc((get.Spkg[i - 1] * 6 / 5) * 100) / 100;
						cout << setw(43) << messange << " #" << i << endl;
					}
					catch (const char* messange) {
						get.Spkg[i] = trunc((get.Spkg[i + 1] * 5 / 6) * 100) / 100;
						cout << setw(43) << messange << " #" << i << endl;
					}
				}
			}
		}
		cout << setw(25) << "SERVER: ";
		for (int i = 0; i < 10; i++)
			cout << setw(7) << get.Spkg[i];
		cout << endl;
	}
}

namespace NOTHING {

	class Unnecessary {
	private :
		int why[1000];
	public:
		Unnecessary();
		void Useless_method();
	};

	Unnecessary::Unnecessary() {
		for (int i = 0; i < 100; i++)
			why[i] = rand() / 101;
	}
	void Unnecessary::Useless_method() {
		cout << "Useless_output: ";
		for (int i = 0; i < 5; i++) {
			int random = rand() / 201;
			try {
				if (random >= 100)
					throw "error";
				cout << why[random] << ' ';
			}
			catch (...) {
				cout << "error" << ' ';
			}
		}
		cout << endl;
	}
}

namespace JUST_ONE_ANOTHER_CLASS {

	class ImClass {
	private:
		int number;
	public:
		ImClass();
		void EXCEPTION(int x);
	}; 
	
	ImClass::ImClass() { number = rand() * rand(); }
	void ImClass::EXCEPTION(int x) { 
		try {
			if (x == 0)
				throw "zero";
			cout << number << " / " << x << " = " << number / x << endl;
		}
		catch (...) {
			cout << number << " / " << x << " = infinity" << endl;
		}
	}
}

int main() {
	srand(time(NULL));
	WEB::Client LOC;
	WEB::Server SERV;
	for (int i = 0; i < 5; i++) {
		GET_PKG_FOR_FROM(SERV, LOC);
		GET_PKG_FOR_FROM(LOC, SERV);
	}

	NOTHING::Unnecessary DontKnow;
	DontKnow.Useless_method();

	JUST_ONE_ANOTHER_CLASS::ImClass im_not_class;
	im_not_class.EXCEPTION(10);
	im_not_class.EXCEPTION(0);
}

