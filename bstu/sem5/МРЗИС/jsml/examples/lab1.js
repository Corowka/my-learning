const Perceptron = require('../models/Perceptron.js')

const X = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

const y = [0, 0, 0, 1];

const model = new Perceptron({ n_inputs: 2, treeshold: 0.5 });

model.fit({ X_train: X, y_train: y, learning_rate: 10e-2, output: true });

const accuracy = model.score({ X_test: X, y_test: y });

console.log(`accuracy: ${accuracy}`);

console.log(`[0, 0] = 0 --> ${model.predict([0, 0])}`);
console.log(`[0, 1] = 0 --> ${model.predict([0, 1])}`);
console.log(`[1, 0] = 0 --> ${model.predict([1, 0])}`);
console.log(`[1, 1] = 1 --> ${model.predict([5, 5])}`);

