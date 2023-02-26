x = 0:1:5;
x = reshape(x, [], 1);
y = exp(x);
plot(y, x)
y = reshape(y, 2, 3);
