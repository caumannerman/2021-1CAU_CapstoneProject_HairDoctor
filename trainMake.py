import cv2
import matplotlib.pyplot as plt
import numpy as np
import dlib
import copy
import glob
from os import listdir
from os.path import isfile, join
from PIL import Image, ImageOps

def contourIntersect(original_image, point_1, point_6, point_9, point_12, contour):
    # Two separate contours trying to check intersection on
    #contours = [contour1, contour2]

    # Create image filled with zeros the same size of original image
    blank = np.zeros(original_image.shape[0:2])

    # Copy each contour into its own image and fill it with '1'
    image0 = cv2.line(copy.deepcopy(blank), (point_1[0], point_1[1]), (point_12[0], point_12[1]), (255, 255, 0), 3)
    image1 = cv2.line(copy.deepcopy(blank), (point_1[0], point_1[1]), (point_6[0] , point_6[1] ), (255, 255, 0), 3)
    image2 = copy.deepcopy(blank)
    cv2.line(image2, (point_9[0], point_9[1]), ( point_12[0] , point_12[1] ), (255, 255, 0), 3)
    image3 = cv2.drawContours(copy.deepcopy(blank), contour, -1, (255, 255, 0), 2)

    # Use the logical AND operation on the two images
    # Since the two images had bitwise AND applied to it,
    # there should be a '1' or 'True' where there was intersection
    # and a '0' or 'False' where it didnt intersect
    intersection0 = np.logical_and(image0,image3)
    intersection = np.logical_and(image1, image3)
    intersection2 = np.logical_and(image2, image3)
    if intersection.any() and intersection2.any() and intersection0.any():
        return True
    return False

# 두 점과, 정수 n을 입력하면, 그들 사이의 n등분 점들의 좌표를 list형태로 return 해주는 함수
def Get_dots_between_dotdot(dot1,dot2,num_of_dots_to_get):
    inter_x = (dot2[0] - dot1[0]) / (num_of_dots_to_get+1)
    inter_y = (dot2[1] - dot1[1]) / (num_of_dots_to_get+1)
    result = []
    for i in range(1,num_of_dots_to_get + 1):
        # 픽셀 좌표에 실수값 (X) 정수값을 줘야하므로, round
        result.append(( dot1[0] + round(inter_x * i), dot1[1] + round(inter_y * i)  ))
    return result

# 두 점과, 정수 n을 입력하면, 시작점을 뒤로 더 당겨서 잡아낸 점들을 return. 시작점은 두 점 사이 거리의 1/4만큼 뒤로 당겨서 시작.
def Get_dots_between_dotdot2(dot1,dot2,num_of_dots_to_get):

    inter_x = (dot1[0] - dot2[0]) // 4
    inter_y = (dot1[1] - dot2[1]) // 4
    new_dot1_x = dot1[0] + inter_x
    new_dot1_y = dot1[1] + inter_y
    return Get_dots_between_dotdot((new_dot1_x,new_dot1_y), dot2, num_of_dots_to_get)



filepath = 'N_FaceShapeDataset/N_Oval/'
onlyfiles = listdir(filepath)
#print(len(onlyfiles))
#print(onlyfiles[0][-3:-1])
#exit()

for nowfnumber in range(101,len(onlyfiles)):
    print(filepath + onlyfiles[nowfnumber])
    if onlyfiles[nowfnumber][-3:-1] != "jp" and onlyfiles[nowfnumber][-3:-1] != "pn":
        continue
    image_ba = cv2.imread(filepath+onlyfiles[nowfnumber])


    # 원본 color image
    #image_ba = cv2.imread("testImage4ContourDetection/10.png")


    # 명도, 채도 조절하여 얼굴 가생이쪽도 contour에 잘 잡히도록 처리할 것
    hsvimage = cv2.cvtColor(image_ba, cv2.COLOR_BGR2HSV)


    #Change channel BGR to RGB
    image = cv2.cvtColor(image_ba, cv2.COLOR_BGR2RGB)
    #plt.imshow(image)
    #plt.show()
    # hanye.jpeg --> image.shape = (413,720,3) 사진마다 다름


    # contour를 잡아내기 위한 gray scaling ==>  1 channel
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    #hanye.jpeg --> gray.shape = (413,720)

    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


    faces = detector(gray)
    # 17개 점들의 x,y 좌표를 담을 리스트
    dots17 = []


    # 하관 17개 점의 좌표들만 담을 배열 ==> 나중에 타원으로 근사할 것이다.
    dots_17 = np.empty((0,2),int)

    # 하관 17개 점과 눈썹쪽에 있는 10개 점, 총 27개의 점을 모두 담을 배열 ==> 나중에 작은 타원으로 근사할 것이다.
    dots_ima = np.empty((0,2),int)


    dots_all = np.empty((0,2),int)


    # detector가 찾아준 얼굴들에 대하여 왼,오 상단, 하단 끝의 좌표값들을 찾을 수 있다.

    dot27_center_x = 0
    dot27_center_y = 0

    # new_poly를 만들 떄 사용할 0번, 16, 27번 (미간), 턱중앙 8
    dot1_x, dot1_y, dot15_x, dot15_y, dot27_x, dot27_y, dot8_x, dot8_y = 0,0,0,0,0,0,0,0
    dot0_x, dot0_y, dot16_x, dot16_y = 0,0,0,0

    for face in faces:
        x1 = face.left()
        y1 = face.top()
        x2 = face.right()
        y2 = face.bottom()
        # 원본 color image인 image 위에 얼굴 detect rectangle을 그려준다.
        cv2.rectangle(image, (x1,y1), (x2,y2), (0,255,255), 1)
        #cv2.circle(image, (x2, y2), 2, (100, 100, 255), -1)
        #cv2.circle(image, (x1, y1), 2, (100, 100, 255), -1)

        # 68개의 LandMark들을 찾아
        landmarks = predictor(gray, face)
        # print(landmarks)

        # new_poly에 사용할 점들 위치정보 초기화
        dot0_x, dot0_y = landmarks.part(0).x, landmarks.part(0).y
        dot1_x, dot1_y = landmarks.part(1).x, landmarks.part(1).y
        dot15_x, dot15_y = landmarks.part(15).x, landmarks.part(15).y
        dot16_x, dot16_y = landmarks.part(16).x, landmarks.part(16).y
        dot27_x, dot27_y = landmarks.part(27).x, landmarks.part(27).y
        dot8_x, dot8_y = landmarks.part(8).x, landmarks.part(8).y
        # 우리에게 필요한건 0번~ 16번 총 17개의 윤곽 점  9번이 턱 중간
        for n in range(0, 67):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            dots_all = np.append(dots_all, np.array([((x, y))]), axis=0)

            if n<27:

                dot27_center_x += x
                dot27_center_y += y
                # 17개 점들을 원본 color 이미지에 표


                if n < 17:
                    dots17.append((x, y))
                    # 하관 17개의 점들의 무게중심을 계산하기 위해, 17개 점들의 x,y 좌표를 각각 더해줌.

                    dots_17 = np.append(dots_17, np.array([((x,y))]) , axis = 0)
                elif n <= 26:
                    dots_ima = np.append(dots_ima, np.array([(((x, y)))]), axis=0)


            cv2.circle(image, (x, y), 3, (255, 0, 0), -1)


        dot27_center_x /= 27
        dot27_center_y /= 27

    # new_poly에 사용할
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
        # 내부를 채워서 그림.
        cv2.ellipse(target_image, el, 0, -1)

    # contour를 받아 contour를 return해줌
    # contour는 shape을 (a,1,2) 형태로 가짐.

    def Magnify_conotur_based_on_CenterGravity(contour,ratio):
        temp = np.mean(contour, axis=0)
        temp2 = np.tile(temp, (contour.shape[0], 1)).reshape(contour.shape[0], 1, 2)
        magnified_contour = np.rint(temp2 + (contour - temp2) * ratio)
        magnified_contour = magnified_contour.astype('int64')

        return magnified_contour
    # 두 개의 contour가 그려진 np.array를 input받아, 두 contour의 교점 중, 좌측에서 가장 높이있는 점, 우측에서 가장 높이 있는 점을 return해줌
    # #######contour1을 하관에 사용할 것, contour2를 얼굴 상부에 사용할 것이다.
    def Intersect_dot_left_right_top( contarr_ori1 ,contarr_ori2, dot0_x,dot0_y,  dot16_x,dot16_y, dot8_x,dot8_y):

        # 27dot으로 만든 contour의 아랫부분만 남
        contarr1 = copy.deepcopy(contarr_ori1)
        # 타원을 그대로 복사
        contarr2 = copy.deepcopy(contarr_ori2)

        # 왼쪽 위
        contarr1[:dot0_y, :dot8_x] = 0
        # 오른쪽 위
        contarr1[:dot16_y, dot8_x:] = 0
        #교점을 np.logical_any로 가져옴
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







    ##################################### 얼굴 shift mask를 칠해주는 곳#######################################
    temp = np.tile(np.array((dot27_center_x,dot27_center_y)), (27,1)).reshape(27,1,2)
    # 가장 가까운 정수로 바꿔주는 rint
    dots_for_smaller_result = np.rint( temp + ( dots_ima - temp)*0.92)
    #astype()으로 정수로 바꾸기


    dots_for_smaller_result = dots_for_smaller_result.astype('int64')

    ### 원래 마스크 칠하는 위치 ##



    # ----------------첫 번쨰 도형  얼굴에 근사한 타원 -------------------------------
    ellipse = cv2.fitEllipse(dots_17)
    # ellipse는 contour가 아니다. ((355.3381042480469, 119.45784759521484), (145.539306640625, 222.42593383789062), 12.467681884765625)
    # 형태가 위와 같다. 타원을그리기 위한 최소한의 정보만 갖고있다.
    #image_for_e = np.zeros_like(image)
    image_for_e_gray = np.zeros_like(gray)
    cv2.ellipse(image, ellipse, (0,255,0),1)
    #cv2.ellipse(image_for_e, ellipse, (0,255,0),2)

    cv2.ellipse(image_for_e_gray, ellipse, 255,1)

    ell_contours, _ = cv2.findContours(image_for_e_gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    ell_contour = ell_contours[0]


    #----------------두 번쨰 도형  작은 타원 -------------------------------
    ellipse_ima = cv2.fitEllipse(dots_ima)
    #image_for_e_ima = np.zeros_like(image)
    image_for_e_ima_gray = np.zeros_like(gray)
    cv2.ellipse(image, ellipse_ima, (0,0,255),1)
    #cv2.ellipse(image_for_e_ima, ellipse_ima, (0,0,255),2)
    cv2.ellipse(image_for_e_ima_gray, ellipse_ima, 255,1)

    ell_contours2, _ = cv2.findContours(image_for_e_ima_gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    ell_contour2 = ell_contours2[0]
    #print(ell_contour2.shape, "hhhheheheheheh")

    #---------------- 세 번쨰 도형  볼록 다각형--------------  -------------------------------
    poly_by_27dots = np.zeros_like(gray)
    poly_by_27dots = cv2.polylines(poly_by_27dots, [dots_ima],True,255,1)
    poly_27_contours, _ = cv2.findContours(poly_by_27dots, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    poly_27_contour = poly_27_contours[0]
    #print(poly_27_contour.shape, "hhhheheheheheh")

    # ---------------- 네 번쨰 도형  혼합 도형 --------------  -------------------------------
    new_poly = np.zeros_like(gray)

    # 타원과 27개점으로 만든 볼록다각형의 교점 중 가장 왼쪽위에 있는 것, 가장 오른쪽 위에 있는 것의 x,y좌표를 모두 return
    lt_x,lt_y, rt_x, rt_y = Intersect_dot_left_right_top( poly_by_27dots ,image_for_e_gray, dot0_x,dot0_y,  dot16_x,dot16_y, dot8_x,dot8_y)
    #왼쪽 아래
    new_poly[lt_x:,:dot8_x] = poly_by_27dots[lt_x:,:dot8_x]
    #왼쪽 위
    new_poly[:lt_x,:dot8_x] = image_for_e_gray[:lt_x,:dot8_x]
    # 오른쪽 아래
    new_poly[rt_x:,dot8_x:] = poly_by_27dots[rt_x:,dot8_x:]
    # 오른쪽 위
    new_poly[:rt_x,dot8_x:] = image_for_e_gray[:rt_x,dot8_x:]

    cv2.circle(image_ba, ( lt_y,lt_x), 3, (255, 255, 100), -1)
    cv2.circle(image_ba, ( rt_y, rt_x), 3, (255, 255, 100), -1)
    '''
    #왼쪽 아래
    new_poly[dot0_y:,:dot8_x] = poly_by_27dots[dot0_y:,:dot8_x]
    #왼쪽 위
    new_poly[:dot0_y,:dot8_x] = image_for_e_gray[:dot0_y,:dot8_x]
    # 오른쪽 아래
    new_poly[dot16_y:,dot8_x:] = poly_by_27dots[dot16_y:,dot8_x:]
    # 오른쪽 위
    new_poly[:dot16_y,dot8_x:] = image_for_e_gray[:dot16_y,dot8_x:]
    '''
    new_poly_contours, _ = cv2.findContours(new_poly, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    new_poly_contour = new_poly_contours[0]


    #############################hsv image S, V  변경하는 부분 ###########################################
    # np 연산으로 각 픽셀의 s,v 요소에 숫자를 더해 만약 255가 넘어가게 된다면, 자동적으로 300-> 45 400-> 145 와 같이 mod연산이 적용되므로,
    # for 문을 이용해 255를 넘어가는 값들은 255로 저장해준다.

    # 명도, 채도를 올릴 윤곽의 상한선
    new_poly_contour_big = Magnify_based_on_CenterGravity(new_poly_contour, 1.05)
    # 명도, 채도를 올릴 윤곽의 하한
    new_poly_contour_mid = Magnify_based_on_CenterGravity(new_poly_contour, 0.9)
    new_poly_contour_small = Magnify_based_on_CenterGravity(new_poly_contour, 0.1)

    #hsvimage[:,:,2]  = ( ( hsvimage[:,:,2] + 30 ) // 255 ) * 255 +np.logical_not( ( hsvimage[:,:,2] + 30 ) // 255 ) * ( hsvimage[:,:,2] + 30 )
    #hsvimage[:,:,1]  = ( ( hsvimage[:,:,1] + 30 ) // 255 ) * 255 +np.logical_not( ( hsvimage[:,:,1] + 30 ) // 255 ) * ( hsvimage[:,:,1] + 30 )
    #print(hsvimage.shape)
    for i in range( hsvimage.shape[0]):
        for j in range( hsvimage.shape[1]):
            # cv2에서는 y축과 x 축의 순서를 바꿔야함 ( plt와 반대)
            # 작은 윤곽의 외부, 큰 윤곽의 내부면
            if cv2.pointPolygonTest(new_poly_contour_small, (  j,i),False ) == -1.0 and cv2.pointPolygonTest(new_poly_contour_big, (  j,i),False ) == 1.0:

                # for S
                temp = hsvimage[i][j][1] + 30
                # for V
                temp2= hsvimage[i][j][2] + 50

                if temp > 255:
                    hsvimage[i][j][1] = 255
                else:
                    hsvimage[i][j][1] = temp
                if temp2 > 255:
                    hsvimage[i][j][2] = 255
                else:
                    hsvimage[i][j][2] = temp2


    #hsvimage[:,:,1] +=  123
    #hsvimage[:,:,2] +=  123
    #print(np.max(hsvimage[:,:,1]), np.max(hsvimage[:,:,2]))
    #hsvimage[:,:,2]  =  (np.logical_and( ( hsvimage[:,:,2] + 30 ) // 255 , ( hsvimage[:,:,2] + 30 ) // 255 ) )* 255 + np.logical_not( ( hsvimage[:,:,2] + 30 ) // 255 ) * ( hsvimage[:,:,2] + 30 )



    hsv2rbg = cv2.cvtColor(hsvimage, cv2.COLOR_HSV2RGB)
    #plt.imshow(hsv2rbg)

    #plt.show()

    #############################hsv image S, V  변경하는 부분  끝 ###########################################

    ################################### 새롭게 mask 칠해주는 곳 위치 ######################################

    gray = cv2.cvtColor(hsv2rbg, cv2.COLOR_RGB2GRAY)

    #왼쪽 눈
    Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[36:42], 1.5)
    #오른쪽 눈
    Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[42:48], 1.5)

    #콧구멍
    Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[31:36], 2)

    #입
    Draw_Ellipse_Magnified_based_on_CenterGravity(gray,dots_all[48:61], 1.2)

    #눈썹

    cv2.fillPoly(gray, [dots_ima[17:22]],255)
    cv2.fillPoly(gray, [dots_ima[22:]],255)

    ############################################################################################################

    # 1.05배 키워서 적용
    new_poly_contour = Magnify_based_on_CenterGravity(new_poly_contour, 1.05)
    testpo = np.zeros_like(gray)
    cv2.drawContours(image_ba, new_poly_contour, -1, (255,255,0), 1)


    temptemp = np.zeros_like(gray)
    cv2.ellipse(temptemp,ellipse, 255,2)



    learning_rate = 1

    loss_3 = int(1e9)

    minimum_loss_contour3 = np.zeros_like(gray)

    final_contour3 = np.array([])
    binary = []
    # 문턱값의 시작 값을 3번 점과 7번 점의 중간점의 픽셀값으로 설정
    #thres = gray[(dots17[2][0] + dots17[6][0]) //2][( dots17[2][1] + dots17[6][1]) // 2 ]
    thres = 0

    for i in range(254):
        thres += 1


        _, binary = cv2.threshold(gray, thres, 255, cv2.THRESH_BINARY_INV)

        # find the contours from the thresholded image
        contours, hierarchy = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

        #contours, hierarchy = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        ####################################################################################################
        #############################          threshold 지정해주는 부분          ##############################
        ####################################################################################################


        # contours array에는 detecting된 모든 윤곽들이 들어가있다.
        # 반복문을 통해 하나하나 보며, 걸러낼 것들을 걸러내야함.

        for contour in contours:

            area = cv2.contourArea(contour)

        # 크기가 매우 작은 contour들은 얼굴일 가능성이 없거나, 너무 멀리서 얼굴을 찍은 것이니 제외시킴.
            if area > 1500:
                ################# 추후에 연산 줄일 부분
                # 크기가 적절히 커서, 얼굴이 가능성이 있는 contour들만 이 안으로 들어왔으니, 이 contour의 무게중심이 눈코입 사각형 안에 있는지 체크해서 걸러냄
                gravity_center_x = contour.mean(axis = 0)[0][0]
                gravity_center_y = contour.mean(axis = 0)[0][1]
                # x1,x2,y1,y2는 detector가 가져온, 사각형의 상하좌우 좌우
                if  x1 <= gravity_center_x <= x2 and y1 <= gravity_center_y <= y2:
                # 해당 contour가 17개 점들 중 몇 개의 점을 이어 만든 직선과 교점이 있는지 확인 ( 교점이 있어야 얼굴이다!)
                    if contourIntersect(image, (landmarks.part(1).x, landmarks.part(1).y), (landmarks.part(6).x, landmarks.part(6).y), (landmarks.part(9).x, landmarks.part(9).y),(landmarks.part(12).x, landmarks.part(12).y), contour):

                        #해당 contour의 무게중심을 찍어줌
                        #cv2.circle(image, ( int(gravity_center_x), int(gravity_center_y) ), 3, (190, 110, 190), -1)
                        # 무게중심과 8번(턱 중앙) 점과의 1:3내분점을 찍어줌 --> 17개 점으로

                        #cv2.drawContours(image, contour, -1, (0,255,0), 2)

                        now_face_contour = np.zeros_like(gray)
                        cv2.drawContours(now_face_contour, contour, -1, 255, 2)

                       # plt.figure(figsize=(8,8))
                        #plt.imshow(now_face_contour,cmap='gray')
                        #plt.show()

                        loss3 = cv2.matchShapes(contour, new_poly_contour, cv2.CONTOURS_MATCH_I3, 0.0)
                        #print(loss1, loss2, "total = ", loss1 + loss2)


                        if loss_3 > loss3:
                            loss_3 = loss3
                            minimum_loss_contour3 = now_face_contour
                            final_contour3 = contour


    final_image = cv2.cvtColor(image_ba,cv2.COLOR_BGR2RGB)


    for i in range(minimum_loss_contour3.shape[0]):
        if np.sum(minimum_loss_contour3[i]) == 0:
            continue
        for j in range(minimum_loss_contour3.shape[1]):
    # cv2에서는 y축과 x 축의 순서를 바꿔야함 ( plt와 반대)
    # 작은 윤곽의 외부, 큰 윤곽의 내부면
            if minimum_loss_contour3[i][j] != 0:

                if cv2.pointPolygonTest(new_poly_contour_mid, (j,i), False) == 1.0 or cv2.pointPolygonTest(new_poly_contour_big, (j, i), False) == -1.0:
                    minimum_loss_contour3[i][j] = 0

    #print(final_contour3.shape)

    # 얼굴일 가능성이 없는 것 지우는 부분 (contour)에서
    idx_to_del = []
    for i in range(final_contour3.shape[0]):
        final_coutour3_x = final_contour3[i][0][0]
        final_contour3_y = final_contour3[i][0][1]
        if cv2.pointPolygonTest(new_poly_contour_mid, (final_coutour3_x, final_contour3_y),
                                False) == 1.0 or cv2.pointPolygonTest(new_poly_contour_big,
                                                                      (final_coutour3_x, final_contour3_y),
                                                                      False) == -1.0:
            idx_to_del.append(i)

    num_to_del = len(idx_to_del)
    idx_to_del.reverse()
    # 큰 인덱스부터 거꾸로 들어오며 삭제
    for i in idx_to_del:
        final_contour3 = np.delete(final_contour3, i, axis=0)

    #print(final_contour3.shape, "new")
    cv2.drawContours(final_image, final_contour3, -1, (0, 255, 0), 1)
    #plt.subplot(236)
    #plt.imshow(final_image)
    #plt.title("final")
    #plt.show()


    # 이 크기 규격을 유지하면서, 잡은 윤곽을 확대 ,축소하여 총 5장 저장할 것
    train_result = np.zeros((512,512))

    #size = (512, 512)
    #minimum_loss_contour3 = ImageOps.fit(minimum_loss_contour3, size, Image.ANTIALIAS)
    #train = cv2.resize(minimum_loss_contour3, (512, 512), interpolation=cv2.INTER_CUBIC)
    #print(minimum_loss_contour3.shape)
    # binary 사진을 그려줄 때, image의 중앙 상단에 위치할 수 있도록 ( magnify된 contour가 그림 밖에 그려지는 경우를 막기 위함)
    def move_contour_to_centertop_of_image(image_width,contarr):
        cont_x_mean = int(np.mean(contarr[:, 0, 0]))
        cont_y_min = int(np.min(contarr[:, 0, 1])) - 30
        tempp = np.array([[cont_x_mean - (image_width//2) , cont_y_min]])

        nowresult = contarr - tempp
        return nowresult

    train1 = Magnify_conotur_based_on_CenterGravity(final_contour3, 1.2)
    train2 = Magnify_conotur_based_on_CenterGravity(final_contour3, 0.8)

    # 정해준 사이즈가 512 x 512 이므로, image_width 자리에 512를 넣어줌
    train1 = move_contour_to_centertop_of_image(512, train1)
    train2 = move_contour_to_centertop_of_image(512, train2)


    # 얼굴형 폴더 바뀌면 여기 수정해야함
    now_shape = "egg"

    cv2.drawContours(train_result,train1,  -1, 255, 2)
    cv2.imwrite("binary/"+now_shape +"/v1_" + now_shape + str(nowfnumber) +"1"+ ".jpg", train_result)
    for  i in range(512):
        train_result[i] = 0

    cv2.drawContours(train_result, train2, -1, 255, 2)
    cv2.imwrite("binary/"+now_shape +"/v1_" + now_shape + str(nowfnumber) +"2"+ ".jpg", train_result)
