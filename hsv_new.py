import numpy as np
import cv2



frame = cv2.imread("testImage4ContourDetection/3.jpeg")



#  HSV pixel의 lower과 upper 경계값 정의/스킨 색 경계값 설정
# 'skin'의 범위 값 설정
lower = np.array([0, 48, 170], dtype = "uint8")
upper = np.array([20, 255, 255], dtype = "uint8")



converted = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
skinMask = cv2.inRange(converted, lower, upper)

    # 경계선 찾아주는
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11)  )  # 타원 모양으로 매트리스 생성
#skinMask = cv2.dilate(skinMask, kernel, iterations = 1  )  # SkinMask의 iterations를 두번 반복(잡힌 범위 주변 margin이 뚱뚱해진다)

skinMask = cv2.GaussianBlur(skinMask, (3, 3), 0)

line ,_ = cv2.findContours(skinMask ,cv2.RETR_EXTERNAL ,cv2.CHAIN_APPROX_SIMPLE)

cv2.drawContours(frame, line, -1, (0 ,255 ,0), 1  )  # (라인을 그릴 이미지, 검출된 컨투어, 음수로 지정할경우 모든 컨투어,색상지정(현재는 초록),선두께)
cv2.imshow("images" ,frame)

# q누르면 종료
cv2.waitKey(0)
cv2.destroyAllWindows()