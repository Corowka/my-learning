x0 = pi / 2;
x = fzero("funcL1T4", x0);
disp(funcL1T1(x))
x_range = 0:0.0001:x0;
y_range = funcL1T4(x_range);
plot(x_range, y_range)
