const nj = require('numjs')

module.exports = kernel_matrix = (kernel, x) => {
    x = nj.array(x);
    const [n, _] = x.shape;
    const matrix = nj.zeros([n, n]);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const xi = x.pick(i, null);
            const xj = x.pick(j, null);
            matrix.set(i, j, kernel(xi, xj).tolist()[0]);
        }
    }

    return matrix;
}