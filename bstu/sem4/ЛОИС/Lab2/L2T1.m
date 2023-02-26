a = 0; b = 5;
f = @(x) sin(x) .* exp(-x);
MyIntegral(f, a, b, 0.0001)


function I = MyIntegral(f, a, b, acc)
    method = input("Enter method (1. trapz / 2. quad): ");
    if method == 1
        tic
        x = a:acc:b;
        y = f(x);
        I = trapz(x, y);
        disp(toc)
    else
        tic
        I = Simpson(f, a, b, acc);
        disp(toc)
    end
end


function I = Simpson(f, a, b, acc)
    I = quad(f, a, b, acc);
end 
