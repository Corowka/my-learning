x1_min = fminbnd("funcL1T6_1", 0, 3);
x2_min = fminsearch("funcL1T6_2", [1 1]);
disp(x1_min)
disp(x2_min)
