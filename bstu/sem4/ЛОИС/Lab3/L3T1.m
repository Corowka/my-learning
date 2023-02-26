model(100);

function model(n)
    WE_cars = generate_cars(60);
    NS_cars = generate_cars(0);
    cycle_time = 60;
    green_time = 30; % на улице WE
    values = zeros(n, 2);
    for i = 1:n+1
        % Машины проезжают
        WE_skip = skip_cars(green_time);
        NS_skip = skip_cars(cycle_time - green_time);
        WE_cars = max(0, WE_cars - WE_skip);
        NS_cars = max(0, NS_cars - NS_skip);
        values(i, 1) = WE_cars;
        values(i, 2) = NS_cars;
        WE_cars = WE_cars + generate_cars(cycle_time - green_time);
        NS_cars = NS_cars + generate_cars(green_time);
        % Считаем green_time
        green_time_term = phase_green(green_time);
        [~, gr_val] = max(green_time_term);
        WE_cars_term = phase_cars(WE_cars);
        [~, WE_val] = max(WE_cars_term);
        NS_cars_term = phase_cars(NS_cars);
        [~, NS_val] = max(NS_cars_term);
        k = (WE_val - NS_val) * gr_val * 5;
        regul_term = phase_time(k);
        [~, regul_val] = max(regul_term);
        switch regul_val
            case 1
                green_time = max(0, green_time - 3); 
            case 3
                green_time = min(60, green_time + 3);
            otherwise
        end
    end
    plot(0:n, values(:, 1), 'b', 0:n, values(:, 2), 'r', 'LineWidth', 2);
    fprintf('WE: %f, NS %f\n', mean(values(:, 1)), mean(values(:, 2)));
end 

function x = generate_cars(time)
    x = randi([0, int8(time / 2)], 1, 1);
end

function x = skip_cars(time)
    x = int8(time / 3);
end

function y = phase_green(x)
    if x <= 10
        y(1) = 1;
    else
        y(1) = max(min(min((x - 10) / (10.001 - 10), 1), (25 - x) / (25 - 30)), 0);
    end
    y(2) = max(min(min((x - 20) / (25 - 20), 1), (40 - x) / (40 - 35)), 0);
    if x >= 50
        y(1) = 1;
    else
        y(3) = max(min(min((x - 25) / (30 - 25), 1), (50.001 - x) / (50.001 - 50)), 0);
    end
end

function y = phase_cars(x)
    if x <= 0
        y(1) = 1;
    else
        y(1) = max(min(min((x - 0) / (0.001 - 0), 1), (17.5 - x) / (17.5 - 10)), 0);
    end
    y(2) = max(min(min((x - 12.5) / (20 - 12.5), 1), (37.5 - x) / (37.5 - 30)), 0);
    y(3) = max(min(min((x - 32.5) / (40 - 32.5), 1), (57.5 - x) / (57.5 - 50)), 0);
    y(4) = max(min(min((x - 52.5) / (60 - 52.5), 1), (77.5 - x) / (77.5 - 70)), 0);
    if x >= 77.5
        y(5) = 1;
    else
        y(5) = max(min(min((x - 72.5) / (80 - 72.5), 1), (90.001 - x) / (90.001 - 90)), 0);
    end
end

function y = phase_time(x)
    sigma = 20 / 3;
    if x < -20
        y(1) = 1;
    else
        y(1) = exp(-(abs(x-(-20)).^2)./2.*sigma.^2);
    end
    y(2) = exp(-(abs(x-0).^2)./2.*sigma.^2);
    if x > 20
       y(3) = 1;
    else
       y(3) = exp(-(abs(x-20).^2)./2.*sigma.^2);
    end
end