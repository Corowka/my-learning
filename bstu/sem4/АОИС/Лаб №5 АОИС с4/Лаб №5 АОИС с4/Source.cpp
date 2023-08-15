#include<iostream>
#include<fstream>
#include<string>
#include<thread>
#include<mutex>
#include<ctime>
#include<vector>
#include<queue>

void FILL_FILE_WITH_RANDINT_VALUES(std::string file, int left, int right, int amount) {
	std::ofstream in(file);
	for (int i = 0; i < amount; i++) 
		in << (int)(left + rand() % right + 1) << ' ';
	in.close();
}

std::mutex mtx;

class ThreadMean {
private:
	std::string input_file_;
	std::string output_file_;
	int batch_size_;
	int part_size_;

	std::vector<int> batch_;
	std::queue<int> buf_;
	std::queue<double> mean_;
	std::queue<int> th_num_;
	int batch_number_;
	int part_number_;
	int last_part_;
	bool end_;
public:
	ThreadMean(std::string inputfile, std::string outputfile, int batch_size, int part_size) : input_file_(inputfile), output_file_(outputfile), batch_size_(batch_size), part_size_(part_size) {
		batch_number_ = 0;
		part_number_ = 0;
	}
	void th_LOADNUMBERS() {
		std::ifstream in(input_file_);
		if (!in.is_open())
			std::cout << "INPUT FILE WASN'T OPEN!" << std::endl;
		int num;
		while (true) {
			if (batch_.size() < batch_size_) {
				if (in >> num) batch_.push_back(num);
				else break;
			}
			else if (buf_.empty()) {
				std::cout << "THREAD WITH #0 SEND BATCH TO THREAD 1 AND 2" << std::endl;
				for (int i = 0; i < batch_size_; i++)
					buf_.push(batch_[i]);
				batch_.clear();
			}
		}
		end_ = true;
		in.close();
	}
	void th_MEANPART(int th) {
		while (!end_ || !buf_.empty()) {
			std::vector<int> part;
			mtx.lock();
			while (part.size() < part_size_ && !buf_.empty()) {
				part.push_back(buf_.front()); buf_.pop();
			}
			mtx.unlock();
			double mean = 0;
			for (int i = 0; i < part.size(); i++) {
				mean += part[i];
			}
			if (mean != 0) {
				mtx.lock();
				mean_.push(mean / part.size());
				th_num_.push(th);
				mtx.unlock();
			}
		}
	}
	void th_OUTPUT() {
		while (!end_ || mean_.size() != 0) {
			std::ofstream out(output_file_, std::ios::app);
			if (!out.is_open())
				std::cout << "OUTPUT FILE WASN'T OPEN!" << std::endl;
			for (int i = 0; i < mean_.size(); i++) {
				std::cout << "THREAD WITH #" << th_num_.front() << " CALC MEAN: " << mean_.front() << std::endl;
				out << mean_.front() << ' '; mean_.pop(); th_num_.pop();
			}
				
		}
	}
};

int main() {

	srand(time(NULL));

	std::string input = "input.txt";
	std::string output = "output.txt";
	int batch_size = 50;
	int part_size = 6;

	FILL_FILE_WITH_RANDINT_VALUES(input, 0, 100, 10009);

	ThreadMean th_mean(input, output, batch_size, part_size);

	std::thread th1(&ThreadMean::th_LOADNUMBERS, &th_mean);
	std::thread th2(&ThreadMean::th_MEANPART, &th_mean, 1);
	std::thread th3(&ThreadMean::th_MEANPART, &th_mean, 2);
	std::thread th4(&ThreadMean::th_OUTPUT, &th_mean);

	th1.join();
	th2.join();
	th3.join();
	th4.join();
}