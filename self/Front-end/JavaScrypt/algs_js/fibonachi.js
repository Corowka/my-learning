let n = 5;

const fibonachi = (n) => {
    if (n === 1 || n === 2) {
        return 1;
    }
    return (fibonachi(n - 1) + fibonachi(n - 2));
}

console.log(fibonachi(n));