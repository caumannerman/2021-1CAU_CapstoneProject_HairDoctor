import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPool2D, Flatten, Dense, Dropout


x_train, x_test, y_train, y_test = np.load('img_data.npy',allow_pickle=True)

newy_train = []
newy_test = []

for i in range(len(y_train)):
    for j in range(5):
        if y_train[i][j] == 1:
            newy_train.append(j)

for i in range(len(y_test)):
    for j in range(5):
        if y_test[i][j] == 1:
            newy_test.append(j)
y_train = np.array(newy_train)
y_test = np.array(newy_test)

y_train = y_train.reshape(len(y_train),)
y_test = y_test.reshape(len(y_test),)

#(x_train, y_train),(x_test, y_test) = mnist.load_data()

x_train=x_train.reshape(-1, 28, 28, 1)
x_test=x_test.reshape(-1, 28, 28, 1)

print(x_train.shape, x_test.shape)
print(y_train.shape, y_test.shape)

x_train = x_train.astype(np.float32) / 255.0
x_test = x_test.astype(np.float32) / 255.0

cnn = Sequential()

cnn.add(Conv2D(input_shape=(28,28,1), kernel_size=(3,3),
               filters=32, activation='relu'))
cnn.add(Conv2D(kernel_size=(3,3), filters=64, activation='relu'))
#4칸 중 가장 큰 것 뽑음
cnn.add(MaxPool2D(pool_size=(2,2)))
# 풀링 후, 25%확률로 drop 오버피팅 방지
cnn.add(Dropout(0.25))
#-------------------------여기까지 Feature Extractor-----------------------

cnn.add(Flatten())
# 1차원의 vector로 변환

#-----------여기부터 classifier. dropout은 오버피팅 방지-------------
cnn.add(Dense(128, activation='relu'))
cnn.add(Dropout(0.5))
cnn.add(Dense(10, activation='softmax'))

cnn.compile(loss='sparse_categorical_crossentropy',
            optimizer=tf.keras.optimizers.Adam(), metrics=['accuracy'])

cnn.summary()
print(x_train.shape, y_train.shape, x_test.shape, y_test.shape)
hist = cnn.fit(x_train, y_train, batch_size=128,
               epochs=20, validation_data=(x_test, y_test))

cnn.evaluate(x_test, y_test)

import matplotlib.pyplot as plt

plt.plot(hist.history['accuracy'])
plt.plot(hist.history['val_accuracy'])
plt.title('Accuracy Trend')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train','validation'], loc='best')
plt.grid()
plt.show()

plt.plot(hist.history['loss'])
plt.plot(hist.history['val_loss'])
plt.title('Loss Trend')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train','validation'], loc='best')
plt.grid()
plt.show()


a = cnn.predict(x_test)
print("------------------_")
print(np.where( a[0]==np.max(a[0]) )[0][0])