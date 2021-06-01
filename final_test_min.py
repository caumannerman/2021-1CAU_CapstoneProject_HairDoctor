import cv2
import numpy as np
import dlib
import copy
import tensorflow.keras



def contourIntersect(original_image, point_1, point_6, point_9, point_12, contour):

    blank = np.zeros(original_image.shape[0:2])

    image0 = cv2.line(copy.deepcopy(blank), (point_1[0], point_1[1]), (point_12[0], point_12[1]), (255, 255, 0), 3)
    image1 = cv2.line(copy.deepcopy(blank), (point_1[0], point_1[1]), (point_6[0] , point_6[1] ), (255, 255, 0), 3)
    image2 = copy.deepcopy(blank)
    cv2.line(image2, (point_9[0], point_9[1]), ( point_12[0] , point_12[1] ), (255, 255, 0), 3)
    image3 = cv2.drawContours(copy.deepcopy(blank), contour, -1, (255, 255, 0), 2)


    intersection0 = np.logical_and(image0,image3)
    intersection = np.logical_and(image1, image3)
    intersection2 = np.logical_and(image2, image3)
    if intersection.any() and intersection2.any() and intersection0.any():
        return True
    return False

def Get_dots_between_dotdot(dot1,dot2,num_of_dots_to_get):
    inter_x = (dot2[0] - dot1[0]) / (num_of_dots_to_get+1)
    inter_y = (dot2[1] - dot1[1]) / (num_of_dots_to_get+1)
    result = []
    for i in range(1,num_of_dots_to_get + 1):

        result.append(( dot1[0] + round(inter_x * i), dot1[1] + round(inter_y * i)  ))
    return result

def Get_dots_between_dotdot2(dot1,dot2,num_of_dots_to_get):

    inter_x = (dot1[0] - dot2[0]) // 4
    inter_y = (dot1[1] - dot2[1]) // 4
    new_dot1_x = dot1[0] + inter_x
    new_dot1_y = dot1[1] + inter_y
    return Get_dots_between_dotdot((new_dot1_x,new_dot1_y), dot2, num_of_dots_to_get)

image_ba = cv2.imread("testImage4ContourDetection/2.jpeg")

hsvimage = cv2.cvtColor(image_ba, cv2.COLOR_BGR2HSV)


image = cv2.cvtColor(image_ba, cv2.COLOR_BGR2RGB)
gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


faces = detector(gray)
dots17 = []

dots_17 = np.empty((0,2),int)

dots_ima = np.empty((0,2),int)


dots_all = np.empty((0,2),int)

dot27_center_x = 0
dot27_center_y = 0

dot1_x, dot1_y, dot15_x, dot15_y, dot27_x, dot27_y, dot8_x, dot8_y = 0,0,0,0,0,0,0,0
dot0_x, dot0_y, dot16_x, dot16_y = 0,0,0,0
x1,x2,y1,y2 = 0,0,0,0
landmarks = 0
for face in faces:
    x1 = face.left()
    y1 = face.top()
    x2 = face.right()
    y2 = face.bottom()
    cv2.rectangle(image, (x1,y1), (x2,y2), (0,255,255), 1)

    landmarks = predictor(gray, face)

    dot0_x, dot0_y = landmarks.part(0).x, landmarks.part(0).y
    dot1_x, dot1_y = landmarks.part(1).x, landmarks.part(1).y
    dot15_x, dot15_y = landmarks.part(15).x, landmarks.part(15).y
    dot16_x, dot16_y = landmarks.part(16).x, landmarks.part(16).y
    dot27_x, dot27_y = landmarks.part(27).x, landmarks.part(27).y
    dot8_x, dot8_y = landmarks.part(8).x, landmarks.part(8).y

    for n in range(0, 67):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        dots_all = np.append(dots_all, np.array([((x, y))]), axis=0)

        if n<27:

            dot27_center_x += x
            dot27_center_y += y
            if n < 17:
                dots17.append((x, y))
                dots_17 = np.append(dots_17, np.array([((x,y))]) , axis = 0)
            elif n <= 26:
                dots_ima = np.append(dots_ima, np.array([(((x, y)))]), axis=0)


        cv2.circle(image, (x, y), 3, (255, 0, 0), -1)


    dot27_center_x /= 27
    dot27_center_y /= 27

new_face_top_center_x, new_face_top_center_y = dot8_x + int(1.7*(dot27_x - dot8_x) ) , dot8_y + int(1.7*(dot27_y - dot8_y))



dots_17 = dots_17.reshape(17, 1, 2)
dots_ima = list(dots_ima)
dots_ima.reverse()
dots_ima = np.array(dots_ima).reshape(10,1,2)
dots_ima = np.append(dots_17,dots_ima).reshape(27,1,2)

dots_all = dots_all.reshape(67,1,2)

dots_17 = np.append(dots_17, np.array([[[new_face_top_center_x, new_face_top_center_y]]]) , axis = 0)

def Magnify_based_on_CenterGravity(nparray,ratio):
    temp = np.mean(nparray,axis=0)
    temp2 = np.tile(temp,(nparray.shape[0],1)).reshape(nparray.shape[0],1,2)
    result = np.rint(temp2 + (nparray - temp2) * ratio)
    result = result.astype('int64')
    return result

def Draw_Ellipse_Magnified_based_on_CenterGravity(target_image,nparray,ratio):
    temp = np.mean(nparray,axis=0)
    temp2 = np.tile(temp,(nparray.shape[0],1)).reshape(nparray.shape[0],1,2)
    result = np.rint(temp2 + (nparray - temp2) * ratio)
    result = result.astype('int64')
    el = cv2.fitEllipse(result)
    cv2.ellipse(target_image, el, 0, -1)

def Magnify_conotur_based_on_CenterGravity(contour,ratio):
    temp = np.mean(contour, axis=0)
    temp2 = np.tile(temp, (contour.shape[0], 1)).reshape(contour.shape[0], 1, 2)
    magnified_contour = np.rint(temp2 + (contour - temp2) * ratio)
    magnified_contour = magnified_contour.astype('int64')

    return magnified_contour

def Intersect_dot_left_right_top( contarr_ori1 ,contarr_ori2, dot0_x,dot0_y,  dot16_x,dot16_y, dot8_x,dot8_y):

    contarr1 = copy.deepcopy(contarr_ori1)
    contarr2 = copy.deepcopy(contarr_ori2)

    contarr1[:dot0_y, :dot8_x] = 0

    contarr1[:dot16_y, dot8_x:] = 0
    result = np.logical_and(contarr1, contarr2)
    left_top_x, left_top_y = 0,0
    right_top_x, right_top_y = 0,0

    for i in range(result[:,:dot8_x].shape[0]):
        if np.any(result[:,:dot8_x][i]):
            left_top_x = i
            break
    for i in range(dot8_x):
        if result[left_top_x][i] != 0:
            left_top_y = i
    for i in range(result[:,dot8_x:].shape[0]):
        if np.any(result[:,dot8_x:][i]):
            right_top_x = i
            break
    for i in range(contarr1.shape[1]-1, dot8_x-1,-1):
        if result[right_top_x][i] != 0:
            right_top_y = i
    return left_top_x, left_top_y, right_top_x, right_top_y

temp = np.tile(np.array((dot27_center_x,dot27_center_y)), (27,1)).reshape(27,1,2)

dots_for_smaller_result = np.rint( temp + ( dots_ima - temp)*0.92)

dots_for_smaller_result = dots_for_smaller_result.astype('int64')




ellipse = cv2.fitEllipse(dots_17)

image_for_e_gray = np.zeros_like(gray)
cv2.ellipse(image, ellipse, (0,255,0),1)


cv2.ellipse(image_for_e_gray, ellipse, 255,1)

ell_contours, _ = cv2.findContours(image_for_e_gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
ell_contour = ell_contours[0]

ellipse_ima = cv2.fitEllipse(dots_ima)
image_for_e_ima_gray = np.zeros_like(gray)
cv2.ellipse(image, ellipse_ima, (0,0,255),1)

cv2.ellipse(image_for_e_ima_gray, ellipse_ima, 255,1)

ell_contours2, _ = cv2.findContours(image_for_e_ima_gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
ell_contour2 = ell_contours2[0]

poly_by_27dots = np.zeros_like(gray)
poly_by_27dots = cv2.polylines(poly_by_27dots, [dots_ima],True,255,1)
poly_27_contours, _ = cv2.findContours(poly_by_27dots, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
poly_27_contour = poly_27_contours[0]

new_poly = np.zeros_like(gray)

lt_x,lt_y, rt_x, rt_y = Intersect_dot_left_right_top( poly_by_27dots ,image_for_e_gray, dot0_x,dot0_y,  dot16_x,dot16_y, dot8_x,dot8_y)
new_poly[lt_x:,:dot8_x] = poly_by_27dots[lt_x:,:dot8_x]
new_poly[:lt_x,:dot8_x] = image_for_e_gray[:lt_x,:dot8_x]
new_poly[rt_x:,dot8_x:] = poly_by_27dots[rt_x:,dot8_x:]
new_poly[:rt_x,dot8_x:] = image_for_e_gray[:rt_x,dot8_x:]

cv2.circle(image_ba, ( lt_y,lt_x), 3, (255, 255, 100), -1)
cv2.circle(image_ba, ( rt_y, rt_x), 3, (255, 255, 100), -1)

new_poly_contours, _ = cv2.findContours(new_poly, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
new_poly_contour = new_poly_contours[0]


new_poly_contour_big = Magnify_based_on_CenterGravity(new_poly_contour, 1.05)

new_poly_contour_small = Magnify_based_on_CenterGravity(new_poly_contour, 0.1)


for i in range( hsvimage.shape[0]):
    for j in range( hsvimage.shape[1]):
        if cv2.pointPolygonTest(new_poly_contour_small, (  j,i),False ) == -1.0 and cv2.pointPolygonTest(new_poly_contour_big, (  j,i),False ) == 1.0:

            temp = hsvimage[i][j][1] + 30
            temp2= hsvimage[i][j][2] + 50

            if temp > 255:
                hsvimage[i][j][1] = 255
            else:
                hsvimage[i][j][1] = temp
            if temp2 > 255:
                hsvimage[i][j][2] = 255
            else:
                hsvimage[i][j][2] = temp2


hsv2rbg = cv2.cvtColor(hsvimage, cv2.COLOR_HSV2RGB)

gray = cv2.cvtColor(hsv2rbg, cv2.COLOR_RGB2GRAY)

Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[36:42], 1.5)
Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[42:48], 1.5)
Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[31:36], 2)
Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[48:61], 1.2)

cv2.fillPoly(gray, [dots_ima[17:22]],255)
cv2.fillPoly(gray, [dots_ima[22:]],255)

new_poly_contour = Magnify_based_on_CenterGravity(new_poly_contour, 1.05)
testpo = np.zeros_like(gray)
cv2.drawContours(image_ba, new_poly_contour, -1, (255,255,0), 1)


temptemp = np.zeros_like(gray)
cv2.ellipse(temptemp,ellipse, 255,2)

learning_rate = 1
loss_3 = int(1e9)
minimum_loss_contour3 = np.zeros_like(gray)

final_contour3 = []
binary = []

thres = 0

for i in range(254):
    thres += 1
    _, binary = cv2.threshold(gray, thres, 255, cv2.THRESH_BINARY_INV)
    contours, hierarchy = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    for contour in contours:

        area = cv2.contourArea(contour)

        if area > 1500:
            gravity_center_x = contour.mean(axis = 0)[0][0]
            gravity_center_y = contour.mean(axis = 0)[0][1]

            if  x1 <= gravity_center_x <= x2 and y1 <= gravity_center_y <= y2:

                if contourIntersect(image, (landmarks.part(1).x, landmarks.part(1).y), (landmarks.part(6).x, landmarks.part(6).y), (landmarks.part(9).x, landmarks.part(9).y),(landmarks.part(12).x, landmarks.part(12).y), contour):


                    now_face_contour = np.zeros_like(gray)
                    cv2.drawContours(now_face_contour, contour, -1, 255, 2)

                    loss3 = cv2.matchShapes(contour, new_poly_contour, cv2.CONTOURS_MATCH_I3, 0.0)



                    if loss_3 > loss3:
                        loss_3 = loss3
                        minimum_loss_contour3 = now_face_contour
                        final_contour3 = contour





final_image = cv2.cvtColor(image_ba,cv2.COLOR_BGR2RGB)

for i in range(minimum_loss_contour3.shape[0]):
    if np.sum(minimum_loss_contour3[i]) == 0:
        continue
    for j in range(minimum_loss_contour3.shape[1]):

        if minimum_loss_contour3[i][j] != 0:

            if cv2.pointPolygonTest(new_poly_contour_small, (j,i), False) == 1.0 or cv2.pointPolygonTest(new_poly_contour_big, (j, i), False) == -1.0:
                minimum_loss_contour3[i][j] = 0


idx_to_del = []
for i in range(final_contour3.shape[0]):
    final_coutour3_x = final_contour3[i][0][0]
    final_contour3_y = final_contour3[i][0][1]
    if cv2.pointPolygonTest(new_poly_contour_small, (final_coutour3_x, final_contour3_y),
                            False) == 1.0 or cv2.pointPolygonTest(new_poly_contour_big,
                                                                  (final_coutour3_x, final_contour3_y),
                                                                  False) == -1.0:
        idx_to_del.append(i)

num_to_del = len(idx_to_del)
idx_to_del.reverse()

for i in idx_to_del:
    final_contour3 = np.delete(final_contour3, i, axis=0)


cv2.drawContours(final_image, final_contour3, -1, (0, 255, 0), 1)

cv2.imwrite("finalImage.jpg",final_image)


# Disable scientific notation for clarity
np.set_printoptions(suppress=True)

# Load the model
model = tensorflow.keras.models.load_model('keras_model.h5')

data = np.ndarray(shape=(1, 224, 224,3), dtype=np.float32)

image_array = np.zeros((224,224))
cv2.drawContours(image_array, final_contour3, -1, 255, 1)



# Normalize the image
normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1


normalized_image_array = normalized_image_array.reshape((224,224,1))
normalized_image_array = np.tile(normalized_image_array,(1,1,3))

data[0] = normalized_image_array

# run the inference
prediction = model.predict(data)


label = np.where(prediction[0] == np.max(prediction[[0]]))
label = label[0][0]

ll = ["heart", "peanut", "round", "egg", "rhombus"]

print(ll[label])
