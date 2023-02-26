y0 = [2; 0]; tspan = [0, 3000]; h = 0.1;
f = @(t, y) [y(2); -y(1) + 1000 .* (1 - y(1) .^ 2) .* y(2)];
[t, y] = ode45(f, tspan, y0);
plot(t, y(:,1), 'b', 'LineWidth', 2); 
legend('y1', 'y2'); xlabel('t'); ylabel('y');
title(['Решение системы дифференциальных уравнений, K = ' num2str(K)]);
