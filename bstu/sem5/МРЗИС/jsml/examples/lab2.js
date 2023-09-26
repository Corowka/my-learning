const SVM_classifier = require('../models/SVM_classifier.js');

const X = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]

const y = [0, 0, 0, 1];

const model = new SVM_classifier({
    learling_rate: 0.32,
    epoches: 100,
    aim_accuracy: 1,
    lambda: 0.01
});

model.fit({ X_train: X, y_train: y, output: true });

const accuracy = model.score({ X_test: X, y_test: y });

console.log(`[0, 0] = 0 --> ${model.predict([0, 0])}`);
console.log(`[0, 1] = 0 --> ${model.predict([0, 1])}`);
console.log(`[1, 0] = 0 --> ${model.predict([1, 0])}`);
console.log(`[1, 1] = 1 --> ${model.predict([1, 1])}`);

console.log(model.get_weights());
console.log(model.get_labels())