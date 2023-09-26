const nj = require('numjs');

class SVM_classifier {

    constructor({
        learling_rate = 0.001,
        epoches = 1000,
        aim_accuracy = 1,
        lambda = 0.01,
    }) {
        this.learling_rate = learling_rate;
        this.epoches = epoches;
        this.aim_accuracy = aim_accuracy;
        this.lambda = lambda;
    }

    fit({
        X_train,
        y_train,
        output = false,
    }) {
        if (X_train.length !== y_train.length) {
            throw new Error('Error: X_train size must be the same as y_train size');
        }

        this.labels = Array.from(new Set(y_train)).sort((a, b) => a - b);

        if (this.labels.length !== 2) {
            throw new Error('y_train must consist of only 2 classes');
        }

        const y = Object.assign(y_train);
        y_train = y_train.map((item) => (item <= 0) ? -1 : 1);

        const n_inputs = X_train[0].length;
        const n_data = X_train.length;

        this.w = Array.from({ length: n_inputs }, () => 0);
        this.b = 0;

        for (let epoch = 0; epoch < this.epoches; epoch++) {

            for (let i = 0; i < n_data; i++) {

                const condition = y_train[i] * (nj.dot(X_train[i], nj.transpose(this.w)) - this.b) >= 1;

                let dw, db;

                if (condition) {
                    dw = nj.multiply(this.w, 2 * this.lambda)
                    db = 0;
                } else {
                    dw = nj.add(nj.multiply(this.w, 2 * this.lambda), nj.multiply(X_train[i], - y_train[i]))
                    db = y_train[i];
                }

                this.w = nj.add(this.w, nj.multiply(dw, -this.learling_rate));
                this.b = this.b - this.learling_rate * db;
            }

            const accuracy = this.score({ X_test: X_train, y_test: y })

            if (output) {
                console.log(`epoch #${epoch}\taccuracy: ${accuracy}`);
            }

            if (accuracy >= this.aim_accuracy) {
                break;
            }
        }
    }

    predict(X) {
        const y = Math.sign(nj.dot(X, nj.transpose(this.w)) - this.b);
        return (y <= -1) ? this.labels[0] : this.labels[1];
    }

    score({
        X_test,
        y_test
    }) {
        if (X_test.length !== y_test.length) {
            throw new Error('Error: X_test size must be the same as y_test size');
        }

        let accuracy = 0;

        for (let i = 0; i < X_test.length; i++) {
            accuracy += (this.predict(X_test[i]) === y_test[i]) ? 1 / X_test.length : 0;
        }

        return accuracy;
    }

    get_labels() {
        return this.labels;
    }

    get_weights() {
        return { w: this.w.tolist(), b: this.b };
    }

    load_weights({ w, b }) {
        this.w = w;
        this.b = b;
    }
}

module.exports = SVM_classifier;