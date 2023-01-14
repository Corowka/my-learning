import numpy as np
import pandas as pd
import scipy.linalg as sla
import matplotlib.pyplot as plt

from sklearn import datasets
from sklearn.linear_model import LinearRegression, Lasso, Ridge
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_blobs
from matplotlib.colors import ListedColormap


def linear_expression(x, k=5, b=6):
    return k * x + b


def logit(x, w):
    return np.dot(x, w)


def sigmoid(h):
    return 1. / (1 + np.exp(-h))


# My linear regression
class LinearRegression:

    def __init__(self):
        self.w = None

    def fit(self, X, y):
        n, m = X.shape
        X_train = np.hstack((X, np.ones((n, 1))))
        y_train = y
        self.w = np.linalg.inv(X_train.T @ X_train) @ X_train.T @ y_train
        return self

    def predict(self, X_test):
        n, m = X_test.shape
        y_pred = np.hstack((X_test, np.ones((n, 1)))) @ self.w
        return y_pred

    def show_weight(self):
        print(f'LinearRegression weights: {self.w}')


# my linear regression with gradient
class GradLinearRegression:

    def __init__(self):
        self.w = None

    def fit(self, X, y, learning_rate=0.01, max_iter=100):
        n, m = X.shape
        X_train = np.hstack((X, np.ones((n, 1))))
        if self.w is None:  # случайно задаём веса
            self.w = np.random.randn(m + 1)
        for i in range(max_iter):
            y_pred = self.predict(X)
            grad = self._calc_gradient(X_train, y, y_pred)
            self.w -= learning_rate * grad
        return self

    def _calc_gradient(self, X, y, y_pred):
        n, m = X.shape
        grad = 2 * (y_pred - y)[:, np.newaxis] * X
        return grad.mean(axis=0)

    def predict(self, X_test):
        n, m = X_test.shape
        y_pred = np.hstack((X_test, np.ones((n, 1)))) @ self.w
        return y_pred

    def show_weight(self):
        print(f'GradLinearRegression weights: {self.w}')


# my linear regression with SGD
class SGDLinearRegression:

    def __init__(self):
        self.w = None
        self.batch = None

    def fit(self, X, y, batch=10, learning_rate=0.01, max_iter=100):
        self.batch = batch
        n, m = X.shape
        X_train = np.hstack((X, np.ones((n, 1))))
        if self.w is None:  # случайно задаём веса
            self.w = np.random.randn(m + 1)
        for i in range(max_iter):
            y_pred = self.predict(X)
            grad = self._calc_gradient(X_train, y, y_pred)
            self.w -= learning_rate * grad
        return self

    def _calc_gradient(self, X, y, y_pred):
        n, m = X.shape
        inds = np.random.choice(np.arange(X.shape[0]), size=min(self.batch, len(X)), replace=False)
        grad = 2 * (y_pred[inds] - y[inds])[:, np.newaxis] * X[inds]
        return grad.mean(axis=0)

    def predict(self, X_test):
        n, m = X_test.shape
        y_pred = np.hstack((X_test, np.ones((n, 1)))) @ self.w
        return y_pred

    def show_weight(self):
        print(f'SGDLinearRegression weights: {self.w}')


# k, b = 5., 6.
# print(f'real function: {[k, b]}')
# objects_num = 50
# X = np.linspace(-5, 5, objects_num)
# y = linear_expression(X, k=k, b=b) + np.random.randn(objects_num) * 5
#
# X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.5)
#
# # my linear regression test
# LR = LinearRegression()
# LR.fit(X_train[:, np.newaxis], y_train)
# LR_y_pred = LR.predict(X_test[:, np.newaxis])
# LR.show_weight()
#
# # my linear regression with gradient test
# GradLR = GradLinearRegression()
# GradLR.fit(X_train[:, np.newaxis], y_train)
# GradLR_y_pred = GradLR.predict(X_test[:, np.newaxis])
# GradLR.show_weight()
#
# # my linear regression with SGD
# SGDLR = SGDLinearRegression()
# SGDLR.fit(X_train[:, np.newaxis], y_train)
# SGDLR_y_pred = SGDLR.predict(X_test[:, np.newaxis])
# SGDLR.show_weight()
#
# # linear regression plot
# plt.figure(figsize=(10, 7))
# plt.plot(X_test, linear_expression(X_test, k=k, b=b), label='real', c='g')
# plt.plot(X_test, LR_y_pred, label='LinearRegression', c='yellow')
# plt.plot(X_test, GradLR_y_pred, label='GradLinearRegression', c='red')
# plt.plot(X_test, SGDLR_y_pred, label='SGDLinearRegression', c='pink')
# plt.scatter(X_train, y_train, label='train', c='b')
# plt.scatter(X_test, y_test, label='test', c='orange')
#
# plt.title("Generated dataset")
# plt.grid(alpha=0.2)
# plt.legend()
# plt.show()


# my logistic regression with SGD
class SGDLogisticRegression:

    def __init__(self):
        self.w = None
        self.batch = None

    def fit(self, X, y, batch=10, learning_rate=0.01, max_iter=100):
        self.batch = batch
        n, m = X.shape
        X_train = np.concatenate((np.ones((n, 1)), X), axis=1)
        if self.w is None:  # случайно задаём веса
            self.w = np.random.randn(m + 1)
        for i in range(max_iter):
            z = sigmoid(logit(X_train, self.w))
            grad = X_train.T @ (z - y)
            self.w -= grad * learning_rate
        return self

    def predict_proba(self, x):
        n, m = x.shape
        x_ = np.concatenate((np.ones((n, 1)), x), axis=1)
        return sigmoid(logit(x_, self.w))

    def predict(self, x, threshold=0.5):
        return self.predict_proba(x) >= threshold

    def show_weights(self):
        print(f'SGDLogisticRegression weights: {self.w}')


X, y = make_blobs(n_samples=1000, centers=[[-1, 2.4], [1.5, 1.2]], cluster_std=1, random_state=42)
colors = ("red", "green")
colored_y = np.zeros(y.size, dtype=str)
for i, cl in enumerate([0, 1]):
    colored_y[y == cl] = str(colors[i])

# my logistic regression test
clf = SGDLogisticRegression()
clf.fit(X, y)
clf.show_weights()

# plot with division
plt.figure(figsize=(15, 8))
eps = 0.1
xx, yy = np.meshgrid(np.linspace(np.min(X[:, 0]) - eps, np.max(X[:, 0]) + eps, 200),
                     np.linspace(np.min(X[:, 1]) - eps, np.max(X[:, 1]) + eps, 200))
Z = clf.predict(np.c_[xx.ravel(), yy.ravel()])
Z = Z.reshape(xx.shape)
cmap_light = ListedColormap(['#FFAAAA', '#AAFFAA'])
plt.pcolormesh(xx, yy, Z, cmap=cmap_light)
plt.scatter(X[:, 0], X[:, 1], c=colored_y)
plt.show()
