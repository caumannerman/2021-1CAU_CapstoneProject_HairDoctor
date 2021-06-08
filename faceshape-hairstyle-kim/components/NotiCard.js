import React from "react"
import {View,Text,Image,StyleSheet,TouchableOpacity,Alert} from "react-native";
import happy from "../images/happy.png"
import notification from "../images/notification.png"
import axios from "axios"

//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function NotiCard({content,reload}) {
    return (
        <View style={styles.commentNotification}>
            <View style={styles.deletebutton}>
            <TouchableOpacity onPress={() =>axios.get(`http://hairdoctor.owlsogul.com/mypage/readAlarm`, {
                                     params: {uuid : content.uuid}
                                    })
                                    .then(function(response)
                                    {
                                        console.log(content.uuid); 
                                        reload();
                                    })
                                    .catch(function (error) {})
                                }>
                <Text style={styles.delete}
                >읽었어요:D</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.Notification}>
                  <Image style={styles.notificationImage} source={notification}/>
                  <Text style={styles.commentNotificationText}>나의 헤닥톡에 {content.nickname}님이 댓글을 남겼어요!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    commentNotification:{
        height:90,
        borderBottomWidth:1,
        borderBottomColor:"#8f8f8f",
        padding:10
    },
    deletebutton:{
        marginLeft:260,
        backgroundColor: "#8f8f8f",
        width: 80,
        height: 20,
        borderRadius:30,
    },
    delete:{
        marginLeft:8,
        color: "#ffffff",
    },
    Notification:{
        marginLeft:5,
        marginTop:5,
        flexDirection:"row"
    },
    notificationImage:{
      width: 16,
      height: 20,
    },
    
    commentNotificationText:{
        marginLeft:20,
      fontSize: 14,
      textAlign: "left",
      color: "#000000"
    }
})