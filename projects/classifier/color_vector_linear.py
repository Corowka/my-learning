import numpy as np
import pandas as pd
import os
import cv2
import sys

sys.set_int_max_str_digits(10000)

DB = 'D:/my-learning/projects/classifier/db'
BASIS = 'D:/my-learning/projects/classifier/basis.jpg'
IMAGE_SHAPE = (256, 256)


def rename_data(path, iter_start=0, ext='jpg'):
    os.chdir(path)
    for file in os.listdir(path):
        if str(file).split(sep='.')[-1] != 'jpg':
            continue
        os.rename(str(file), f'{str(iter_start)}.{ext}')
        iter_start += 1


# rename_data('D:/my-learning/projects/classifier/test')
# rename_data('D:/my-learning/projects/classifier/data/db')


def prepare_images(path, resolution=(640, 640), grey=False):
    os.chdir(path)
    for file in os.listdir(path):
        if str(file).split(sep='.')[-1] != 'jpg':
            continue
        img = cv2.imread(f"{path}/{str(file)}")
        img = cv2.resize(img, resolution, cv2.INTER_AREA)
        if grey:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        cv2.imwrite(f'{path}/{file}', img)


# prepare_images('D:/my-learning/projects/classifier/db', grey=False, resolution=(128, 128))
# prepare_images(DB, resolution=IMAGE_SHAPE, grey=False)

columns = ['total_kp', 'keyPoints', 'product']
data = pd.DataFrame(columns=columns)

# data = add_data_from_file('D:/my-learning/projects/classifier/data/test_class', data, 1)
# data = add_data_from_file('D:/my-learning/projects/classifier/data/test_other', data, 0)


# big_d = []
batch_size = 50

# строим df [кол-во kp | kp | имя продукта]
def surf_try(df, path, n_keyPoints=50):
    sift = cv2.xfeatures2d.SIFT_create()
    basis = cv2.imread(BASIS)
    kp_basis, des_basis = sift.detectAndCompute(basis, None)
    vectors = []
    for file in os.listdir(f"{DB}"):
        if str(file).split(sep='.')[-1] != 'jpg':
            continue
        img = cv2.imread(f"{DB}/{file}")
        sum_rgb = []
        for batch_x in range(0, len(img), batch_size):
            for batch_y in range(0, len(img[0]), batch_size):
                r, g, b = 0, 0, 0
                for i in range(batch_x, min(batch_x + batch_size, len(img)), 1):
                    for j in range(batch_y, min(batch_y + batch_size, len(img[i])), 1):
                        r += img[i][j][0]
                        g += img[i][j][1]
                        b += img[i][j][2]
                r, g, b = int(r / batch_size ** 2), int(g / batch_size ** 2), int(b / batch_size ** 2)
                sum_rgb.append((r, g, b))


        def to_long_num(vec):
            num = 0
            d = 0
            for i in range(len(vec)):
                for j in range(len(vec[i])):
                    num += vec[i][j] % 10 * 10 ** d
                    d += 1
                    num += int(vec[i][j] % 100 / 10) * 10 ** d
                    d += 1
                    num += int(vec[i][j] / 100) * 10 ** d
                    d += 1
            return num

        vectors.append(to_long_num(sum_rgb))


        # sift = cv2.xfeatures2d.SIFT_create()
        # kp_img, des_img = sift.detectAndCompute(img, None)
        # bf = cv2.BFMatcher(cv2.NORM_L1, crossCheck=True)
        # matches = bf.match(des_basis, des_img)
        # matches = sorted(matches, key=lambda x: x.distance)
        # # визуализация
        # matched_img = cv2.drawMatches(basis, kp_basis, img, kp_img, matches[:n_keyPoints], img, flags=2)
        # cv2.imshow("images", matched_img)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        # # заносим точки правого изображения в датасет
        # if len(matches) < n_keyPoints:
        #     continue
        # total_kp = len(matches)
        # keyPoints = []
        # for i in range(n_keyPoints):
        #     keyPoints.append((kp_img[matches[i].trainIdx].pt[0], kp_img[matches[i].trainIdx].pt[1]))
        # product = (str(file).split(sep='.')[0]).split(sep='_')[1]
        # df.loc[len(df)] = [total_kp, keyPoints, product]

    return vectors


# vectors = surf_try(data, DB)
# for i in range(len(vectors)):
#     print(vectors[i])


# length = int((IMAGE_SHAPE[0] / batch_size) ** 2 * 9)
# print(length)


def calc_diff(left, right):
    diff = 0
    left_s = str(left)
    right_s = str(right)
    for i in range(length):
        val1 = int(left_s[i]) - int('0')
        val2 = int(right_s[i]) - int('0')
        diff += (val1 - val2) ** 2
    return diff ** 0.5


# print(calc_diff(vectors[0], vectors[4]))
# print(calc_diff(vectors[0], vectors[5]))
# print(calc_diff(vectors[0], vectors[6]))
# print(calc_diff(vectors[0], vectors[7]))

# images_count = 4


def knn(size):
    for find in range(size):
        index = images_count
        for i in range(images_count + 1, int(len(vectors)), 1):
            l = calc_diff(vectors[find], vectors[index])
            r = calc_diff(vectors[find], vectors[i])
            if min(l, r) != l:
                index = i
        print(find, index - size)


# knn(images_count)


# data.to_csv(r'C:/Users/kopan/notes/datasets/db.csv', index=False, encoding='utf-8', header=True)


class Classifier:

    @staticmethod
    def calc_diff(left, right, length):
        diff = 0
        left = str(left)
        right = str(right)
        while len(left) < length:
            left = '0' + left
        while len(right) != length:
            right = '0' + right
        for i in range(length):
            val_left, val_right = int(left[i]) - int('0'), int(right[i]) - int('0')
            diff += (val_left - val_right) ** 4
        return diff ** 0.5

    @staticmethod
    def calc_dist(img, batch_size, to_bit):
        batch_sum_rgb = []
        for batch_x in range(0, len(img), batch_size):
            for batch_y in range(0, len(img[0]), batch_size):
                r, g, b = 0, 0, 0
                for i in range(batch_x, min(batch_x + batch_size, len(img)), 1):
                    for j in range(batch_y, min(batch_y + batch_size, len(img[i])), 1):
                        rgb8b = (int(img[i][j][0] / to_bit), int(img[i][j][1] / to_bit), int(img[i][j][2] / to_bit))
                        min_col = min(rgb8b[0], rgb8b[1], rgb8b[2])
                        r += rgb8b[0] - min_col
                        g += rgb8b[1] - min_col
                        b += rgb8b[2] - min_col
                r = int(r / batch_size ** 2)
                g = int(g / batch_size ** 2)
                b = int(b / batch_size ** 2)
                batch_sum_rgb.append((r, g, b))
        num = 0
        d = 0
        for i in range(len(batch_sum_rgb)):
            for j in range(len(batch_sum_rgb[i])):
                num += batch_sum_rgb[i][j] % 10 * 10 ** d
                d += 1
                num += int(batch_sum_rgb[i][j] % 100 / 10) * 10 ** d
                d += 1
                # num += int(batch_sum_rgb[i][j] / 100) * 10 ** d
                # d += 1
        return num

    @staticmethod
    def binary_neighbor_search(arr, item):
        l = 0
        r = len(arr) - 1
        mid = int((l + r) / 2)
        while l <= r:
            if arr[mid] < item:
                l = mid + 1
            elif arr[mid] > item:
                r = mid - 1
            else:
                return mid
            mid = int((l + r) / 2)
        return mid

    def __init__(self,
                 data_path='./db',
                 products_path='./db/products.xlsx',
                 validation_path='./validation/valid.xlsx',
                 validation_data_path='./validation'):

        self.data_path = data_path  # путь к базе данных
        self.valid_data_path = validation_data_path  # путь к фотографиям для валидации

        self.products = pd.read_excel(products_path)  # база данных продуктов (id | product | data size)
        self.validation = pd.read_excel(validation_path)  # валидационная выборка (index -> class)

        self.data = None
        self.batch = None
        self.k = None
        self.bit = None

    def fit(self, batch=[256], k_values=[1], bits=[64]):

        # перебираем параметры
        fit_info = []

        # пробуем каждый batch
        for k in k_values:
            for batch_size in batch:
                for bit in bits:

                    print(f"Classifier: Learrning parametres: batch={batch_size},  k={k}, bit={bit}.")
                    fit_info.append([batch_size, k, 0])
                    self.batch = batch_size
                    self.k = k
                    self.bit = bit

                    # переводим фото в нашу метрику и загружаем в список data
                    print("Classifier: Loading images...")

                    self.data = []
                    to_bit = int(256 / bit)

                    # проходим каждую папку с отдельным классом
                    for file in os.listdir(f"{self.data_path}"):
                        if '.' in str(file):
                            continue
                        cls = str(file)  # имя класса
                        # проходим по каждой фотографии
                        for image in os.listdir(f"{self.data_path}/{file}"):
                            if str(image).split(sep='.')[-1] != 'jpg':
                                continue
                            img = cv2.imread(f"{self.data_path}/{file}/{image}")
                            self.data.append([Classifier.calc_dist(img, self.batch, to_bit), cls])
                    self.data = sorted(self.data, key=lambda x: x[0])

                    # Проверяем на тестовых данных нашу точность
                    print("Classifier: Validation...")

                    for i, image in enumerate(os.listdir(f"{self.valid_data_path}")):
                        if str(image).split(sep='.')[-1] != 'jpg':
                            continue
                        img = cv2.imread(f"{self.valid_data_path}/{image}")
                        cls_pred = self.predict(img)
                        # print(f"{cls_pred} real class ---------> {self.validation.iloc[i, 0]}")
                        if cls_pred == self.validation.iloc[i, 0]:
                            fit_info[len(fit_info) - 1][2] += 1
                    fit_info[len(fit_info) - 1][2] /= len(os.listdir(f"{self.valid_data_path}")) / 100

                    print(f"Classifier: Results --> {fit_info[len(fit_info) - 1][2]}%")

        # Applying best param
        print("Classifier: Applying best param")

        best = 0
        for res in fit_info:
            if best < res[2]:
                best = res[2]
                self.batch = res[0]
                self.k = res[1]

        print(f"""Classifier: Fitting has been ended. Score: ({best}) with 
            batch={self.batch}, k={self.k}, bit={self.bit}""")

    def predict(self, img):
        if self.k is None or self.batch is None or self.bit is None:
            print("Clasifier: at first you should fit your model.")
            return
        to_bit = int(256 / self.bit)
        length = int((img.shape[0] / self.batch) ** 2 * 9)
        values = [[10 ** (length + 1), 'start']]
        img_val = Classifier.calc_dist(img, self.batch, to_bit)
        for i, val in enumerate(self.data):
            diff = Classifier.calc_diff(img_val, val[0], length)
            if diff < values[-1][0]:
                values.append([diff, val[1]])
                if len(values) > self.k:
                    values.pop(0)
        answers = [0 for _ in range(len(self.products))]
        for val in values:
            if val[1] != 'start':
                answers[int(val[1]) - 1] += 1
        cls_num = answers.index(max(answers))
        return cls_num + 1

    def predict_best_res(self, img):
        if self.batch == None:
            print("Clasifier: at first you should fit your model.")
            return
        length = int((img.shape[0] / self.batch) ** 2 * 9)
        best = (10 ** (length + 1), 'start')
        img_val = Classifier.calc_dist(img, self.batch)
        for i, val in enumerate(self.data):
            diff = Classifier.calc_diff(img_val, val[0], length)
            if diff < best[0]:
                best = (diff, val[1])
        return val[1]


# knn = Classifier()
# knn.fit(batch=[128, 64], k_values=[1, 3, 5], bits=[64, 32, 16])


# values = []
#
# for file in os.listdir(f"./db"):
#     if '.' in str(file):
#         continue
#     for image in os.listdir(f"./db/{file}"):
#         if str(image).split(sep='.')[-1] != 'jpg':
#             continue
#         img = cv2.imread(f"./db/{file}/{image}")
#         values.append([Classifier.calc_dist(img, 128), file])
#
# # for val in values:
# #     print(val)
#
# img = cv2.imread('D:/my-learning/projects/classifier/validation/0.jpg')
# img_val = Classifier.calc_dist(img, 128)
# length = int((img.shape[0] / 128) ** 2 * 9)
#
# for i, val in enumerate(values):
#     print(img_val, values[i][0], values[i][1], Classifier.calc_diff(img_val, values[i][0], length))
