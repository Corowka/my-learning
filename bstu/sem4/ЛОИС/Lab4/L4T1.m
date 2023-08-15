f = @(x) (sin(x / exp(1)) + x ./ exp(1));

X_train = transpose(-100:1:100);
y_train = f(X_train);

dataEdu = cat(2, X_train, y_train);

X_test = transpose(-99.5:1:100.5);
y_test = f(X_test);

dataTest = cat(2, X_test, y_test);

dataOutput = [];