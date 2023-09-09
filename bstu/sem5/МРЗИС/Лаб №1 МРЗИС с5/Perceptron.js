class Perceptron {

    constructor({ n_inputs, treeshold }) {
        this.weights = Array.from({ length: n_inputs }, () => 0);
        this.treeshold = treeshold;
    }

    fit({ X_train, y_train, epoches = 100, learning_rate = 10e-3, aim_accuracy=1, view_epoches = false }) {
        if (X_train.length !== y_train.length) {
            const error = Error('Error: X_train size must be the same as y_train size');
            console.log(error);
            return error;
        }
        if (X_train.reduce((sum, item) => sum + item.length, 0) / X_train.length !== this.weights.length) {
            const error = new Error('Error: X_train size must be the same as n_inputs')
            console.log(error);
            return error;
        }
        const leanring_info = {
            accuracy: [],
            weights: [],
        };
        for (let epoch = 0; epoch < epoches; epoch++) {
            for (let j = 0; j < X_train.length; j++) {
                const y_pred = this.predict(X_train[j]);
                const error = y_train[j] - y_pred;
                for (let k = 0; k < this.weights.length; k++) {
                    this.weights[k] += learning_rate * error * X_train[j][k];
                }
            }
            const accuracy = this.test({X_test: X_train, y_test: y_train});
            leanring_info.accuracy.push(accuracy);
            leanring_info.weights.push(this.weights);
            if (view_epoches) {
                console.log(`epoch: ${epoch}\taccuracy: ${accuracy}`);
            }
            if (accuracy === aim_accuracy) {
                break;
            }
        }
        return leanring_info;
    }

    test({ X_test, y_test, view_data = false }) {
        if (X_test.length !== y_test.length) {
            const error = new Error('Error: X_test size must be the same as y_test size');
            console.log(error);
            return error;
        }
        let accuracy = 0;
        for (let i = 0; i < X_test.length; i++) {
            const y_pred = this.predict(X_test[i])
            accuracy += (y_pred === y_test[i]) ? 1 / X_test.length : 0;
            if (view_data) {
                console.log(`X_test: ${X_test[i]}\ty_test: ${y_test[i]}\ty_pred: ${y_pred}\taccuracy: ${accuracy}`);
            }
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

    load_weightss(weights) {
        this.weights = weights;
    }
}

const X = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

const y = [0, 0, 0, 1];

const model = new Perceptron({ n_inputs: 2, treeshold: 0.5 });

model.fit({ X_train: X, y_train: y, learning_rate: 10e-2, view_epoches: true });

const weights = model.get_weights();
console.log(`weights: [${weights}]`);



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