const nj = require('numjs');
const quadprog = require('quadprog');
const kernels = require('../Math/kernels');
const kernel_matrix = require('../Math/kernel_matrix');

class OC_SVM {

    constructor(kernel = kernels.linear_kernel(), C = 1) {
        this.kernel = kernel;
        this.C = C;

        this.lagr_multipliers = null;
        this.supportVectors = null;

        this.quad_term = null;
        this.rudius_sqr = null;
    }

    fit(X) {
        X = nj.array(X)
        const [n_samples, _] = X.shape;
        const km = kernel_matrix(this.kernel, X);
        const P = nj.multiply(km, 2).tolist();
        const q = nj.multiply(nj.diag(km), -1).reshape(1, -1).T.tolist();
        const A = nj.ones(n_samples).reshape(1, -1).tolist();
        const b = nj.array(1).reshape(1, -1).tolist();

        let G, h;

        if (!this.C) {
            G = nj.multiply(nj.identity(n_samples), -1).tolist();
            h = nj.zeros([n_samples]).tolist();
        } else {
            const G_max = nj.multiply(nj.identity(n_samples), -1);
            const G_min = nj.identity(n_samples);
            G = nj.concatenate(G_max, G_min).T.tolist();

            const h_max = nj.zeros([n_samples]);
            const h_min = nj.multiply(nj.ones(n_samples), this.C);
            h = nj.concatenate(h_max, h_min).reshape(1, -1).T.tolist();
        }

        console.log(P)
        console.log(q)
        console.log(G)
        console.log(h)
        console.log(A)
        console.log(b)

        const minimization = quadprog.solveQP(P, q, G, h, A, b);
        const lagr_mult = minimization.solution;

        console.log(minimization)

        const idx = nj.greater(lagr_mult, 1e-7);
        this.lagr_multipliers = lagr_mult.slice(idx);
        this.support_vectors = X.slice(idx);

        let quad_term = 0;
        for (let i = 0; i < this.lagr_multipliers.length; i++) {
            for (let j = 0; j < this.lagr_multipliers.length; j++) {
                quad_term += this.lagr_multipliers[i] * this.lagr_multipliers[j] *
                    this.kernel(this.support_vectors.pick(i, null), this.support_vectors.pick(j, null));
            }
        }

        let radius_sqr = this.kernel(this.support_vectors.pick(0, null), this.support_vectors.pick(0, null));
        for (let i = 0; i < this.lagr_multipliers.length; i++) {
            radius_sqr -= 2 * this.lagr_multipliers[i] *
                this.kernel(this.support_vectors.pick(i, null), this.support_vectors.pick(0, null));
        }
        radius_sqr += quad_term;
    }

    predict(X) {
        const n_samples = X.shape[0];
        const y_pred = nj.zeros(n_samples, 'int');

        for (let i = 0; i < n_samples; i++) {
            const sample = X.pick(i, null);
            let prediction = this.kernel(sample, sample);

            for (let j = 0; j < this.lagr_multipliers.length; j++) {
                const support_vector = this.support_vectors.pick(j, null);
                prediction -= 2 * this.lagr_multipliers[j] * this.kernel(support_vector, sample);
            }

            prediction += this.quad_term;
            y_pred.set(i, prediction <= this.radius_sqr ? 1 : 0);
        }

        return y_pred.tolist();
    }
}

module.exports = OC_SVM;