#include "Header.h"

int main()
{
    SetConsoleCP(1251);
    SetConsoleOutputCP(1251);
    srand(time(NULL));

    Environment Town; // Постоянные характеристики среды
    Town.AP = N(30, 2.5); // Средний возраст населения 

    Virus Corovavirus; // Постоянные характеристики вируса
    Corovavirus.I = E(2.5);

    long long Population = 34985; // Население
    long long Dead = 0; // Летальные исходы

    // Создание агентов
    Agent* People = new Agent[Population];
    for (int i = 0; i < Population; i++) {
        People[i].m = U(0, 50); // Параметр среднего 
        People[i].HA = 10 - E(0.5); // Здоровье
        People[i].State = 1;
        People[i].RT = -1;
        People[i].A = N(Town.AP, 30);
        if (People[i].A < 0) People[i].A *= -1;
    }

    long long Infected = 5 + rand() % 6; // Количество заражённых
    for (int i = 0; i < Infected; i++) {
        People[i].State = 2; // Заражаем от 5 до 10 агентов
    }

    cout << "Введите количество дней: ";
    int days;
    cin >> days;

    int day = 0;

    for (int i = 0; i < 44; i++) cout << "=";
    cout << endl;
    cout << "|" << setw(5) << "#" << " |"
        << setw(10) << " Alive"<< " |"
        << setw(10) << " Infected" << " |"
        << setw(10) << " Dead" << " |"
        << endl;
    for (int i = 0; i < 44; i++) cout << "=";
    cout << endl;

    // Статистика 
    while ((Infected > 0 && day <= days && Population != Dead) || (Infected > 0 && days == -1 && Population != Dead)) {
 
        // Общие изменения 
        Town.T = N(5, 2.5); // Вероятность проведения тестов 

        // Изменения для каждого агента
        for (int i = 0; i < Population; i++) {
            if (People[i].HA != 0) {
                // Генерация случайного числа от 0.01 до 1.00
                double random = (double)(rand() % 100 + 1) / 100;

                // Генерация ежедневных параметров
                People[i].SC = N(People[i].m, 30); // Социальные контакты

                switch (People[i].State) {
                case 1: // Здоровый агент ------------------------------------
                    for (int j = 0; j < (int)People[i].SC; j++) { // Заражение через социальные контакты 
                        if (People[i].State == 1 && random <= Corovavirus.I) {
                            People[i].State = 2;
                            Infected++;
                            People[i].RT = 1 + U(20 - 1.5 * People[i].HA, 5 - 0.25 * People[i].HA);
                            break;
                        }
                    }
                    break;
                case 2: // Заразившийся агент ------------------------------------
                    if (random <= Town.T) {
                        People[i].State = 3; // Сделает тест
                        break;
                    }

                    if (random <= fabs(People[i].A * 0.07 + N(15 - 1.0 * People[i].HA, 2 - 0.15 * People[i].HA)) / 100) { // Летальный исход 
                        People[i].HA = 0;
                        Dead++;
                        Infected--;
                    }
                    break;
                case 3: // Агент, который знает о своей болезни ------------------------------------
                    People[i].SC /= N(10, 1.5); // Уменьшение соц. контактов в зависимоти от ответственности 

                    if (random <= fabs(People[i].A * 0.07 + N(15 - 1.0 * People[i].HA, 2 - 0.15 * People[i].HA)) / 100) { // Летальный исход
                        People[i].HA = 0;
                        Dead++;
                        Infected--;
                    }
                    break;
                case 4: // Агент на лечении ------------------------------------

                    if (random <= fabs(People[i].A * 0.07 + N(15 - 1.0 * People[i].HA - 0.8 * N(20, 3.5), 2 - 0.15 * People[i].HA - 0.12 * N(20, 3.5))) / 100) { // Летальный исход
                        People[i].HA = 0;
                        Dead++;
                        Infected--;
                    }
                    break;
                }

                // Лечение
                People[i].RT--;
                if (People[i].RT < 0 && People[i].State != 1) {
                    People[i].State = 1;
                    People[i].HA = 10 - E(0.5);
                    Infected--;
                }

                // Отправка на лечение по здоровью
                if (People[i].HA < 2) {
                    if (random <= 0.1) {
                        People[i].State = 4;
                        int days = 1 + U(20 - 1.5 * People[i].HA - 0.5 * N(20, 3.5), 5 - 0.25 * People[i].HA - 0.1 * N(20, 3.5));
                        People[i].RT = ((days > 0 && People[i].RT > days) ? days : -1);
                    }
                }
                else
                    if (random == 0.01) {
                        People[i].State = 4;
                        int days = 1 + U(20 - 1.5 * People[i].HA - 0.5 * N(20, 3.5), 5 - 0.25 * People[i].HA - 0.1 * N(20, 3.5));
                        People[i].RT = ((days > 0 && People[i].RT > days) ? days : -1);
                    }
            }
        }

        day++;
        
        cout << "|" << setw(5) << day 
            << " |" << setw(10) << Population - Dead 
            << " |" << setw(10) << Infected 
            << " |" << setw(10) << Dead << " |"
            << endl;
    }
    for (int i = 0; i < 44; i++) cout << "=";
    cout << endl;
}
