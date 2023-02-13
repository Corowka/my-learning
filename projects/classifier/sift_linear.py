import os
from matplotlib import pyplot as plt
import cv2
import pandas as pd
import time
import numpy as np


class Classifier:

    def time_of_function(function):
        def _wrapper(*args):
            start_time = time.perf_counter_ns()
            res = function(*args)
            time_left = (time.perf_counter_ns() - start_time) / 10 ** 9
            return res, time_left
        return _wrapper

    def __init__(self,
                 db_path='./db',
                 products_path='./db/products.xlsx',):

        self.db_path = db_path  # путь к базе данных
        self.products = pd.read_excel(products_path)  # база данных продуктов (id | product | data size)

        self.n_keypoints = None
        self.val_index = None

    def fit(self, n_keypoints=[30], val_indexs=[20], test_path='./test'):
        real = [6, 2, -1, 1, 2, 3, 2, 2, 3, 0, -1, -1, 5, 6, 3, 4, 3, 3, 4, 3,
                4, 1, 1, -1, 2, 4, 5, 5, 6, 0, -1, 0, 1, 2, -1, 2, 4, 1, -1, 2]
        fit_info = []
        print(f"Classifier: Learrning parametres: n_keypoints={n_keypoints}.")
        for k in n_keypoints:
            for val in val_indexs:
                fit_info.append([k, 0])
                self.n_keypoints = k
                print(f"Classifier: Testing n_keypoints={self.n_keypoints}...")
                img_list = os.listdir('./test')
                img_list = sorted(img_list, key=lambda x: int(str(x).split(sep='.')[0]))
                for i, image in enumerate(img_list):
                    if str(image).split(sep='.')[-1] != 'jpg':
                        continue
                    img = cv2.imread(f"{test_path}/{image}")
                    pred = self.predict(img)
                    if int(real[i]) == int(pred[0]) or int(real[i]) == -1:
                        fit_info[-1][1] += 1
                fit_info[-1][1] /= len(real)
                print(f"Classifier: Results --> {fit_info[-1][1]}%")
        print("Classifier: Applying best param")
        best = 0
        for res in fit_info:
            if best < res[1]:
                best = res[1]
                self.n_keypoints = res[0]
        print(f"Classifier: Fitting has been ended. Score: ({best}) with n_keypoints={self.n_keypoints}")

    def create_val_learning_data(self):
        self.n_keypoints = 28
        real = [6, 2, -1, 1, 2, 3, 2, 2, 3, 0, -1, -1, 5, 6, 3, 4, 3, 3, 4, 3,
                4, 1, 1, -1, 2, 4, 5, 5, 6, 0, -1, 0, 1, 2, -1, 2, 4, 1, -1, 2]
        cls_index = [[2, 10, 11, 23, 30, 34, 38],
                     [9, 29, 31],
                     [3, 21, 22, 32, 37],
                     [1, 4, 6, 7, 24, 33, 35, 39],
                     [5, 8, 14, 16, 17, 19],
                     [18, 15, 20, 25, 36],
                     [12, 26, 27],
                     [0, 13, 28]]
        X, y = [], []
        sift = cv2.xfeatures2d.SIFT_create()
        bf = cv2.BFMatcher(cv2.NORM_L1, crossCheck=True)
        for i in range(len(cls_index)):
            for j in range(len(cls_index[i])):
                for k in range(len(cls_index)):
                    for l in range(len(cls_index[k])):
                        if i == k and j == l:
                            continue
                        min_diff = 10 ** 3
                        img1 = cv2.imread(f"./test/{cls_index[i][j]}.jpg")
                        img2 = cv2.imread(f"./test/{cls_index[k][l]}.jpg")
                        keypoints1, descriptors1 = sift.detectAndCompute(img1, None)
                        keypoints2, descriptors2 = sift.detectAndCompute(img2, None)
                        matches = bf.match(descriptors1, descriptors2)
                        if len(matches) < self.n_keypoints:
                            continue
                        matches = sorted(matches, key=lambda x: x.distance)
                        # angle
                        angles = []
                        for j in range(self.n_keypoints):
                            angles.append(np.arctan2(
                                keypoints2[matches[j].trainIdx].pt[1] -
                                keypoints1[matches[j].queryIdx].pt[1],
                                keypoints2[matches[j].trainIdx].pt[0] + 128 -
                                keypoints1[matches[j].queryIdx].pt[0]) * 180 / np.pi
                                          )
                        angles = np.sort(np.array(angles))
                        x1 = np.sqrt(np.sum(np.square(angles) - np.mean(angles)))
                        # y
                        diff_y_total = 0
                        diff_y_next = abs(keypoints1[matches[1].queryIdx].pt[1] -
                                          keypoints1[matches[0].queryIdx].pt[1]) / \
                                      abs(1 + keypoints2[matches[1].trainIdx].pt[1] -
                                          keypoints2[matches[0].trainIdx].pt[1])
                        for j in range(1, self.n_keypoints - 1, 1):
                            diff_y = diff_y_next
                            diff_y_next = abs(keypoints1[matches[j + 1].queryIdx].pt[1] -
                                              keypoints1[matches[j].queryIdx].pt[1]) / \
                                          abs(1 + keypoints2[matches[j + 1].trainIdx].pt[1] -
                                              keypoints2[matches[j].trainIdx].pt[1])
                            diff_y_total += (1 + diff_y_next - diff_y) ** 2
                        x2 = diff_y_total
                        X.append(np.array([x1, x2]))
                        print(cls_index[i], cls_index[k])
                        print(i, j, k, l)
                        y.append(int(int(cls_index[i][j]) == int(cls_index[k][l])))
        return np.array(X), np.array(y)

    @time_of_function
    def predict(self, img):
        group = -1
        shape_index = img.shape[0] / img.shape[1]
        if shape_index < 0.75:
            group = 'long'
        elif 0.75 <= shape_index < 1.25:
            group = 'square'
        elif 1.25 <= shape_index:
            group = 'high'
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = cv2.resize(img, (128, 128), cv2.INTER_AREA)
        sift = cv2.xfeatures2d.SIFT_create()
        keypoints, descriptors = sift.detectAndCompute(img, None)
        cls_of_img = -1
        min_diff = 10 ** 3
        bf = cv2.BFMatcher(cv2.NORM_L1, crossCheck=True)
        for i, image in enumerate(os.listdir(f"{self.db_path}/{group}")):
            img_db = cv2.imread(f"{self.db_path}/{group}/{image}")
            keypoints_db, descriptors_db = sift.detectAndCompute(img_db, None)
            matches = bf.match(descriptors, descriptors_db)
            # img3 = cv2.drawMatches(img, keypoints, img_db, keypoints_db, matches[:self.n_keypoints], img_db, flags=2)
            # plt.imshow(img3), plt.show()
            if len(matches) < self.n_keypoints:
                continue
            matches = sorted(matches, key=lambda x: x.distance)
            angles = []
            for j in range(self.n_keypoints):
                angles.append(np.arctan2(
                    keypoints_db[matches[j].trainIdx].pt[1] -
                    keypoints[matches[j].queryIdx].pt[1],
                    keypoints_db[matches[j].trainIdx].pt[0] + 128 -
                    keypoints[matches[j].queryIdx].pt[0]) * 180 / np.pi
                )
            angles = np.sort(np.array(angles))
            diff = np.sqrt(np.sum(np.square(angles) - np.mean(angles)))
            if min_diff > diff:
                min_diff = diff
                cls_of_img = i
        return cls_of_img


# classifier = Classifier()
# classifier.fit(n_keypoints=[_ for _ in range(10, 40, 1)])

# X, y = classifier.create_val_learning_data()
# for i in range(len(y)):
#     print(X[i], y[i])

