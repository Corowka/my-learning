[X, y] = Dataset();
[X_train, y_train, X_test, y_test] = train_test_split(X, y);

% Создание и настройка нейронной сети
hiddenSize = 70; 
net = feedforwardnet(hiddenSize); 
net = configure(net, X_train, y_train); 

% Настройка параметров обучения
net.trainFcn = 'trainlm'; 
net.trainParam.epochs = 10; 
net.trainParam.goal = 1e-12; 
net.trainParam.showWindow = true; 

% Обучение нейронной сети
net = train(net, X_train, y_train);

% Классификация новых данных
y_pred = net(X_test);
for i = 1:size(y_pred, 2)
    fprintf('%c %c\n',To_letter(y_pred(:, i)),To_letter(y_test(:, i)));
end

function letter = To_letter(y)
    [~, idx] = max(y);
    letter = char('A' - 1 + idx);
end

function [X, y] = Dataset()
    [alphabet, targets] = prprob;
    for i = 0:26
        noisy_alphabet = alphabet + randn(35,1)*0.2;
    end
    X = [alphabet, noisy_alphabet];
    y = [targets, targets];
end

function [X_train, y_train, X_test, y_test] = train_test_split(X, y, train_size)
    if nargin < 3
        train_size = 0.8;
    end
    X = X';
    y = y';
    num_examples = size(X, 1);
    num_train_examples = round(num_examples * train_size);
    shuffled_indices = randperm(num_examples);
    X_train = X(shuffled_indices(1:num_train_examples), :)';
    y_train = y(shuffled_indices(1:num_train_examples), :)';
    X_test = X(shuffled_indices(num_train_examples+1:end), :)';
    y_test = y(shuffled_indices(num_train_examples+1:end), :)';
end