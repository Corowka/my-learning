#include <vector> 
#include "Cash.h"
#include "Ram.h"

int main()
{
    srand(time(NULL));

    vector<int> arr;
    for (int i = 0; i < 256; i++) arr.push_back(rand() % (1024 - 32) + 32);

    Ram ram(256);
    for (int i = 0; i < 256; i++) ram.INSERT(arr[i]);

    Cash cash;

    int amount = 10;
    vector<bool> res;
    int not_in_cash = 0;
    for (int i = 0; i < amount; i++) {
        int index = rand() % 256;
        bool is_num_in_cash = 1;
        int cashInd = cash.SEARCH(arr[index]);
        if (cashInd == -1) {
            not_in_cash++;
            cash.INSERT(arr[index]);
            is_num_in_cash = 0;
        }
        res.push_back(is_num_in_cash);
        // OUTPUT
        cash.STATUS(); cout << endl;
        system("pause");
        system("cls");
    }
    cash.STATUS(); cout << endl;
    cout << " MISS: " << (double)not_in_cash / amount * 100
        << "% NOT IN CASH: " << not_in_cash << " TOTAL AMOUNT: " << amount << std::endl;
    for (int i = 0; i < amount; i++) {
        cout << res[i];
    }
}