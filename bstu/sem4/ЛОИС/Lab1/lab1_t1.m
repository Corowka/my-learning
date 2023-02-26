m1 = [1 2 3; 4 5 6; 7 8 9];
m2 = cat(1, [2 4 8], [16 32 64], [256 512 1024]);
ans1 = m1 + m2;
ans2 = m1 - m2;
ans3 = m1 * m2;
ans4 = m1 / m2;
subplot(2, 2, 1)
surf(ans1)
subplot(2, 2, 2)
surf(ans2)
subplot(2, 2, 3)
surf(ans3)
subplot(2, 2, 4)
surf(ans4)

