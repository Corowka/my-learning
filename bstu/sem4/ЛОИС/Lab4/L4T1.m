x = 0:0.1:5*pi;
y = sin(x) + randn(size(x)) * 0.1;

plot(x, y, 'r', 'LineWidth', 0.1)
data = [x' y'];

% Создание нечеткой системы
fis = genfis1(data, 2, 'gbellmf', 'linear');

% Обучение ANFIS модели
anfis_model = anfis(data, fis, 50);

% Тестирование модели
x_test = -3:0.01:3;
y_test = evalfis(x_test, anfis_model);

% Построение графиков
plot(x, y, 'o', x_test, y_test, '-')
legend('Данные', 'Модель')
