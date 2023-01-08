import numpy as np
import random as rnd
import matplotlib.pyplot as plt


class MyLinearRegression:

    def __init__(self, fit_intercept=True):
       self.fit_intercept = fit_intercept
       self.w = None

    def fit(self, x, y):
        # prepare
        n, m = x.shape
        x_train = x
        if self.fit_intercept:
            x_train = np.hstack((x, np.ones((n, 1))))
        # teach
        self.w = np.linalg.inv(x_train.T @ x_train) @ x_train.T @ y

        return self

    def predict(self, x):
        n, m = x.shape
        x_train = x
        if self.fit_intercept:
            x_train = np.hstack((x, np.ones((n, 1))))
        y_predict = x_train @ self.w
        return y_predict


# data
def f(x):
    return x * 2 + 3


amount = 99
test_size = 0.2
# train
X_train = np.array([rnd.randint(0, amount * 100) for _ in range(int(amount - amount * test_size))])
y_train = np.array([f(X_train[_]) + rnd.randint(-100, 100) * amount / rnd.randint(1, 10) for _ in range(len(X_train))])
# test
X_test = np.array([rnd.randint(0, amount * 100) for _ in range(int(amount * test_size))])
y_test = np.array([f(X_test[_]) + rnd.randint(-100, 100) * amount / rnd.randint(1, 10) for _ in range(len(X_test))])

# teaching
lr = MyLinearRegression(fit_intercept=True)
lr.fit(X_train[:, np.newaxis], y_train)
predict = lr.predict(X_test[:, np.newaxis])

# error
mse = np.array([(predict[_] - y_test[_]) ** 2 for _ in range(len(y_test))]).mean()
print(mse)

# plot
plt.figure(figsize=(10, 7))
plt.plot(X_train, f(X_train), label='real', c='g')
plt.scatter(X_train, y_train, label='train', c='b')
plt.scatter(X_test, y_test, label='test', c='orange')
plt.scatter(X_test, predict, label='predict', c='red')

plt.title("Generated dataset")
plt.grid(alpha=0.2)
plt.legend()
plt.show()
