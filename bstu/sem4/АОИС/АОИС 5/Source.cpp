#include <vector>
#include <iostream>
#include <fstream>
#include <thread>
#include <ctime>
#include <random>
#include <mutex>

using namespace std;

class Game {
private:
	enum player_move { rock, paper, scissors };
	enum game_res { fst_player_win, snd_player_win, thd_player_win, draw };
	int* fst_player_res_;
	int* snd_player_res_;
	int* thd_player_res_;
	int cur_game_;
	int num_games_;
	vector<int> result_;
	mutex mtx;
public:

	Game(int num_games) {
		std::ofstream file("game result.txt", std::ofstream::trunc);
		file.close();

		fst_player_res_ = nullptr;
		snd_player_res_ = nullptr;
		thd_player_res_ = nullptr;
		cur_game_ = 0;
		num_games_ = num_games;
		result_ = vector<int>(4, 0);

		thread th1(&Game::thread_fst_player_make_move, this);
		thread th2(&Game::thread_snd_player_make_move, this);
		thread th3(&Game::thread_thd_player_make_move, this);
		thread th4(&Game::thread_find_winner, this);

		th1.join();
		th2.join();
		th3.join();
		th4.join();

		cout << result_[0] << ' ' << result_[1] << ' ' << result_[2] << ' ' << result_[3] << endl;
	}

	int make_move() {
		random_device rd;
		mt19937 gen(rd());
		uniform_int_distribution<int> dis(0, 2);
		int move = dis(gen);
		return move % 3;
	}

	void thread_fst_player_make_move() {
		while (cur_game_ < num_games_) {
			if (fst_player_res_ == nullptr) {
				fst_player_res_ = new int(make_move());
			}
		}
	}

	void thread_snd_player_make_move() {
		while (cur_game_ < num_games_) {
			if (snd_player_res_ == nullptr) {
				snd_player_res_ = new int(make_move());
			}
		}
	}

	void thread_thd_player_make_move() {
		while (cur_game_ < num_games_) {
			if (thd_player_res_ == nullptr) {
				thd_player_res_ = new int(make_move());
			}
		}
	}

	void thread_find_winner() {
		while (cur_game_ < num_games_) {
			if (fst_player_res_ != nullptr && snd_player_res_ != nullptr && thd_player_res_ != nullptr) {
				int game_result;
				if (*fst_player_res_ == rock &&
					*snd_player_res_ == scissors &&
					*thd_player_res_ == scissors ||
					*fst_player_res_ == scissors &&
					*snd_player_res_ == paper &&
					*thd_player_res_ == paper ||
					*fst_player_res_ == paper &&
					*snd_player_res_ == rock &&
					*thd_player_res_ == rock) {
					game_result = fst_player_win;
				}
				else if (
					*fst_player_res_ == scissors &&
					*snd_player_res_ == rock &&
					*thd_player_res_ == scissors ||
					*fst_player_res_ == paper &&
					*snd_player_res_ == scissors &&
					*thd_player_res_ == paper ||
					*fst_player_res_ == rock &&
					*snd_player_res_ == paper &&
					*thd_player_res_ == rock) {
					game_result = snd_player_win;
				}
				else if (
					*fst_player_res_ == scissors &&
					*snd_player_res_ == scissors &&
					*thd_player_res_ == rock ||
					*fst_player_res_ == paper &&
					*snd_player_res_ == paper &&
					*thd_player_res_ == scissors ||
					*fst_player_res_ == rock &&
					*snd_player_res_ == rock &&
					*thd_player_res_ == paper) {
					game_result = thd_player_win;
				}
				else {
					game_result = draw;
				}
				ofstream out("game result.txt", std::ios::app);
				if (!out.is_open()) {
					cerr << "file error" << endl;
				}
				out << *fst_player_res_ << ' ' << *snd_player_res_ << ' ' << *thd_player_res_ << " | ";
				switch (game_result) {
				case fst_player_win:
					out << "first\n";
					break;
				case snd_player_win:
					out << "second\n";
					break;
				case thd_player_win:
					out << "third\n";
					break;
				default:
					out << "draw\n";
					break;
				}
				out.close();
				result_[game_result]++;
				cur_game_++;
				mtx.lock();
				fst_player_res_ = nullptr;
				snd_player_res_ = nullptr;
				thd_player_res_ = nullptr;
				mtx.unlock();
			}
		}
	}
};

int main() {
	Game game(1000);
}