import cv2
#import matplotlib.pyplot as plt
import numpy as np
import dlib
import copy

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
        # 픽셀 좌표에 실수값 (X) 정수값을 줘야하므로, round
        result.append(( dot1[0] + round(inter_x * i), dot1[1] + round(inter_y * i)  ))
    return result

def Get_dots_between_dotdot2(dot1,dot2,num_of_dots_to_get):

    inter_x = (dot1[0] - dot2[0]) // 4
    inter_y = (dot1[1] - dot2[1]) // 4
    new_dot1_x = dot1[0] + inter_x
    new_dot1_y = dot1[1] + inter_y
    return Get_dots_between_dotdot((new_dot1_x,new_dot1_y), dot2, num_of_dots_to_get)

image_ba = cv2.imread("../serverbackup/facelib/test.jpg")

image = cv2.cvtColor(image_ba, cv2.COLOR_BGR2RGB)

gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("../serverbackup/facelib/shape_predictor_68_face_landmarks.dat")

faces = detector(gray)

dots17 = []
dots_17 = np.empty((0,2),int)
dots_ima = np.empty((0,2),int)

for face in faces:
    x1 = face.left()
    y1 = face.top()
    x2 = face.right()
    y2 = face.bottom()

    cv2.rectangle(image, (x1,y1), (x2,y2), (0,255,255), 1)

    landmarks = predictor(gray, face)

    dot17_center_x = 0
    dot17_center_y = 0

    for n in range(0, 27):
        x = landmarks.part(n).x
        y = landmarks.part(n).y



        if n < 17:
            dots17.append((x, y))

            dot17_center_x += x
            dot17_center_y += y
            dots_17 = np.append(dots_17, np.array([((x,y))]) , axis = 0)
        elif n <= 26:
            dots_ima = np.append(dots_ima, np.array([(((x, y)))]), axis=0)

        cv2.circle(image, (x, y), 3, (255, 0, 0), -1)

    dot17_center_x = int( round(dot17_center_x / 17, 0))
    dot17_center_y = int( round(dot17_center_y / 17, 0))
    cv2.circle(image, (dot17_center_x, dot17_center_y), 2, (100, 250, 255), -1)

dots_17 = dots_17.reshape(17, 1, 2)
dots_ima = list(dots_ima)
dots_ima.reverse()
dots_ima = np.array(dots_ima).reshape(10,1,2)
dots_ima = np.append(dots_17,dots_ima).reshape(27,1,2)

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

temptemp = np.zeros_like(gray)
cv2.ellipse(temptemp,ellipse, 255,2)

learning_rate = 1
loss = int(1e9)
minimum_loss_contour = np.zeros_like(gray)
final_contour = []

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
            # x1,x2,y1,y2는 detector가 가져온, 사각형의 상하좌우 좌우
            if  x1 <= gravity_center_x <= x2 and y1 <= gravity_center_y <= y2:

                if contourIntersect(image, (landmarks.part(1).x, landmarks.part(1).y), (landmarks.part(6).x, landmarks.part(6).y), (landmarks.part(9).x, landmarks.part(9).y),(landmarks.part(12).x, landmarks.part(12).y), contour):

                    cv2.circle(image, ( int(gravity_center_x), int(gravity_center_y) ), 3, (190, 110, 190), -1)

                    #cv2.drawContours(image, contour, -1, (0,255,0), 2)

                    now_face_contour = np.zeros_like(gray)
                    cv2.drawContours(now_face_contour, contour, -1, 255, 2)

                    loss1 = cv2.matchShapes(contour, ell_contour, cv2.CONTOURS_MATCH_I3, 0.0)
                    loss2 = cv2.matchShapes(contour, poly_27_contour, cv2.CONTOURS_MATCH_I3, 0.0)

                    if loss >  loss2 :
                        loss = loss2
                        minimum_loss_contour = now_face_contour
                        final_contour = contour

final_image = copy.deepcopy(image_ba)
cv2.drawContours(final_image,final_contour,-1,(0,255,0),1)

#plt.imshow(final_image)
#plt.axis('off')
#plt.show()
cv2.imwrite('../serverbackup/images/uploads/test.jpg', final_image)
# 최종 사진은 final_image니까 다른데 보내거나 변경하고싶으면, final_image 사용하면 됨.맨


