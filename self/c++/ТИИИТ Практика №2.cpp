#include <iostream>
#include <string>
#include <cmath>
#include <iomanip>

using namespace std;

int main()
{
    setlocale(LC_ALL, "Russian");

    string x = "Корреляционный анализ - метод обработки статистических данных, с помощью которого измеярется теснота связи между двумя или более переменными. Корреляционный анализ тесно связян с регрессионным. С его помощью определяют необходимость включения тех или иных факторов в уравнения множественной регресии.";
    double P[32] = { 0 };
    int size = x.size();
    int Amount = 0;
    for (int i = 0; i < size; i++) if (x[i] >= 'А' && x[i] <= 'я') {
        P[(x[i] - 'А') % 32]++;
        Amount++;
    }
    double Bits = 0;
    double percents[32];
    for (int i = 0; i < 32; i++) {
        percents[i] = P[i];
        if (P[i] != 0) {
            Bits -= P[i] / 32 * log2(P[i] / 32);
            cout << "| P(" << char('а' + i) << "): " << setw(2) << P[i] << " | H(" << char('а' + i) << "): " << setw(9) << -P[i] / 32 * log2(P[i] / 32) << " |" << endl;
        }
        else cout << "| P(" << char('а' + i) << "): " << setw(2) << P[i] << " | H(" << char('а' + i) << "): " << setw(9) << 0 << " |" << endl;
    }

    double temp;
    for (int i = 0; i < 32 - 1; i++) 
        for (int j = 0; j < 32 - i - 1; j++) {
            if (percents[j] < percents[j + 1]) {
                temp = percents[j];
                percents[j] = percents[j + 1];
                percents[j + 1] = temp;
            }
        }
    for (int i = 0; i < 32; i++) cout << "| Persents(" << char('а' + i) << "): " << setw(10) << percents[i] << endl;
    return 0;
}