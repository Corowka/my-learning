class Perceptron {

    constructor({ n_inputs, treeshold }) {
        this.weights = Array.from({ length: n_inputs }, () => 0);
        this.treeshold = treeshold;
    }

    fit({ X_train, y_train, epoches = 100, aim_accuracy = 1, learning_rate = 10e-3, output = false }) {
        if (X_train.length !== y_train.length) {
            return new Error('Error: X_train size must be the same as y_train size');
        }
        if (X_train.reduce((avg, item) => avg + item.length, 0) / X_train.length !== this.weights.length) {
            return new Error('Error: X_train[i] size must be the same as n_inputs');
        }
        const epoch_srores = [];
        for (let epoch = 0; epoch < epoches; epoch++) {
            for (let j = 0; j < X_train.length; j++) {
                const y_pred = this.predict(X_train[j]);
                const error = y_train[j] - y_pred;
                for (let k = 0; k < this.weights.length; k++) {
                    this.weights[k] += learning_rate * error * X_train[j][k];
                }
            }
            const accuracy = this.score({ X_test: X_train, y_test: y_train })
            if (output) {
                console.log(`epoch #${epoch}\taccuracy: ${accuracy}`);
            }
            if (accuracy >= aim_accuracy) {
                break;
            }
        }

        return epoch_srores;
    }

    score({ X_test, y_test }) {
        if (X_test.length !== y_test.length) {
            return new Error('Error: X_test size must be the same as y_test size');
        }
        let accuracy = 0;
        for (let i = 0; i < X_test.length; i++) {
            accuracy += (this.predict(X_test[i]) === y_test[i]) ? 1 / X_test.length : 0;
        }

        return accuracy;
    }

    predict(X) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += this.weights[i] * X[i];
        }

        return (sum > this.treeshold) ? 1 : 0;
    }

    get_weights() {
        return this.weights;
    }

    load_weights(weights) {
        this.weights = weights;
    }
}

module.exports = Perceptron;

// function train_test_splitter(X, y, train_size) {
//     if (X.length !== y.length) {
//         return new Error('Error: X size must be the same as y size');
//     }
//     train_size = Math.max(0, Math.min(1, train_size));
//     train_size = Math.round(train_size * X.length);
//     const [X_train, X_test, y_train, y_test] = [[], [], [], []];
//     for (let i = 0; i < X.length; i++) {
//         if (i < train_size) {
//             X_train.push(X[i]);
//             y_train.push(y[i]);
//         } else {
//             X_test.push(X[i]);
//             y_test.push(y[i]);
//         }
//     }

//     return X_train, X_test, y_train, y_test;
// }