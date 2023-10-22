class Perceptron {

    constructor({n_inputs, treeshold}) {
        this.weights = Array.from({length: n_inputs}, () => 0);
        this.treeshold = treeshold;
    }

    fit({X_train, y_train, epoches=100, aim_loss=10e-3, learning_rate=10e-3}) {
        if (X_train.length !== y_train.length) {
            return new Error('Error: X_train size must be the same as y_train size');
        }
        if (X_train.length !== this.weights.length) {
            return new Error('Error: X_train size must be the same as n_inputs');
        }
        const loss_values = {};
        for (let epoch = 0; epoch < epoches; epoch++) {
            for (let j = 0; j < X_train.length; j++) {
                y_pred = this.predict(X_train[j]);
                loss = y_train[i] - y_pred;
                loss_values[`epoch: ${epoch}`] = loss;
                console.log(`epoch: ${epoch}\tloss: ${loss}`);
                if (loss < aim_loss) {
                    break;
                }
                for (let k = 0; k < this.weights.length; k++) {
                    this.weights[i] += learning_rate * loss * X_train[j][k];
                }
            }
        }

        return loss_values;
    }

    test({X_test, y_test}) {
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

const model = new Perceptron({n_inputs: 2, treeshold: 0.5});

model.fit({X_train: X, y_train: y});
const accuracy = model.test(X, y);
console.log(accuracy);



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