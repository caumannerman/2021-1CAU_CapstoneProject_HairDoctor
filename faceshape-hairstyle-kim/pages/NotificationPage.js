import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import notification from "../images/notification.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import { useIsFocused } from '@react-navigation/native';
import NotiCard from '../components/NotiCard';

export default function NotificationPage({navigation}) {
    
    //유저 아이디를 가져오기
const [ID,setID] = useState("")
const [Noti,setNoti] = useState([])

const NotiData= async () => {
    const id = JSON.parse(await AsyncStorage.getItem("user_id"))
    //console.log(id);
    setID(id)

    //axios로  댓글 노티 정보 가져오기
    const response = await axios.get('https://hairdoctor.owlsogul.com/mypage/getAlarm', {
        params: { user_id: id } 
        })
        setNoti(response.data.list)
    console.log(response.data.list)
}

//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

useEffect(()=>{
    if (isFocused) {
    NotiData();
    reload();
    }
  },[isFocused])

  const reload = async() =>{ 
    const id = JSON.parse(await AsyncStorage.getItem("user_id"))
    //console.log(id);
    setID(id)
   //axios로  댓글 노티 정보 가져오기
   const response = await axios.get('https://hairdoctor.owlsogul.com/mypage/getAlarm', {
    params: { user_id: id } 
    })
    setNoti(response.data.list)
    console.log(response.data.list)
  }

    return (
      <View style={styles.container}>
          
          <View style={styles.myNotification}>
              <Text style={styles.myNotificationText}>내 소식</Text>
          </View>
  
          <ScrollView style={styles.NotificationContainer}>
              <View >
                  {/* 하나의 카드 영역을 나타내는 View */}     
                  {
                    Noti.map((content,i)=>{
                        return (<NotiCard content={content} key={i} reload={reload} navigation={navigation}/>)
                    })
                    }
              </View>
          </ScrollView>
          
      </View>
    );
  }
  const styles = StyleSheet.create({
      container:{
          flex:1,
          backgroundColor: '#fff',
          
      },
      titleContainer:{
          
          height: 47,
          flexDirection:"row",
          borderBottomColor:"#8f8f8f",
          borderBottomWidth:1
      },
      title:{
          fontSize: 20,
          fontWeight: "700",
          lineHeight: 40,
          textAlign: "center",
          color: "#000000",
          marginLeft:20
      },
      myNotification:{
          height:45,
          borderBottomWidth:1,
          borderBottomColor:"#8f8f8f"
      },
      myNotificationText:{
          marginTop:7,
        fontSize: 20,
        textAlign: "left",
        color: "#000000",
        marginLeft:20
      },
      NotificationContainer:{
          height:548,
      },
      commentNotification:{
          height:90,
          borderBottomWidth:1,
          borderBottomColor:"#8f8f8f",
          flexDirection:"row",
          padding:30
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
  });