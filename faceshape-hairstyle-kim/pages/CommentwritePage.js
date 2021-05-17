import React,{Component,useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity,LogBox } from 'react-native';
import image from "../images/image.png"
import axios from "axios"
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const UselessTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      multiline={true}
      maxLength={400}
      placeholder={"댓글을 입력해주세요."}
    />
  )
};


export default function CommentwritePage({navigation,route}){

  LogBox.ignoreAllLogs();
 //유저아이디 상태변수
  const [userID,setID] = useState('')
  //유저 얼굴형 상태변수
  const [userFacetype,setFacetype] = useState({"facetype":"egg"})
  const getUserId = async() => {
        const id = await AsyncStorage.getItem('user_id');
        setID(id)
        const response = await axios.post(`https://hairdoctor.owlsogul.com/face/Facetype`, {
          user_id: id
          })
          setFacetype(response.data.facetype)
          console.log(response.data.facetype)
  }
 
  //텍스트 입력 상태
const [value, onChangeText] = useState('');

// 추가된 이미지 상태
const [img,setImg] = useState({ "image":"https://pbs.twimg.com/profile_images/1193436004436201472/G8Do6f1u.jpg"})
//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

useEffect(() => {
  getUserId();

  if (isFocused) {
    // do something with params
    setImg(route.params)
    console.log(route.params);
    console.log('Focused!!');
  }

  
}, [isFocused])

//route.params에 이미지 데이터가 있을때 없을때 ,,,
return img == undefined ? (
    <View style={styles.container}>
        <TouchableOpacity  onPress={() => alert("등록" + value)} onPress={() => navigation.navigate('헤닥톡')}><Text style={styles.registerButton}>등록</Text></TouchableOpacity>

        <View style={styles.commentContainer}>
          <View
                style={{
                    marginLeft:10,
                    backgroundColor: value,
                }}>
                <UselessTextInput
                    numberOfLines={4}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                 
          </View>
        </View>
        <View style={styles.addimageButtonContainer}>
            <TouchableOpacity style={styles.addimageButton}  onPress={() => navigation.navigate('WriteCamera')}>
                <Image style={styles.addimage} source={image}/>
                <Text style={styles.addimageText}>사진 추가</Text>
            </TouchableOpacity>
        </View>
        
    </View>
  ):(<View style={styles.container}>
    <TouchableOpacity  onPress={() =>{         
               fetch('https://hairdoctor.owlsogul.com/community/addcontent', {
               method: 'POST',
               headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            // send our base64 string as POST request
            body: JSON.stringify({
               photo : img.base,
               user_id: userID,
               facetype: userFacetype,
               content: value
            }),
           }),console.log(img.base)

           navigation.navigate('헤닥톡')
         }} ><Text style={styles.registerButton}>등록</Text></TouchableOpacity>

    <View style={styles.commentContainer}>
      <View
            style={{
                marginLeft:10,
                backgroundColor: value,
            }}>
            <UselessTextInput
                numberOfLines={4}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
             <Image style={styles.showimage} source={{uri:img.image}}/>
      </View>
    </View>
    <View style={styles.addimageButtonContainer}>
        <TouchableOpacity style={styles.addimageButton}  onPress={() => navigation.navigate('WriteCamera')}>
            <Image style={styles.addimage} source={image}/>
            <Text style={styles.addimageText}>사진 추가</Text>
        </TouchableOpacity>
    </View>
    
</View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
       
    },
    
    registerButton:{
        fontSize: 16,
        textAlign: "center",
        color: "#7705ad",
        marginLeft:310,
        marginTop:15
    },
    commentContainer:{      
      
        height: 492,
    },
    comment:{
        marginTop:15,
        marginLeft:15,
        fontSize: 14,
        textAlign: "left",
        color: "#525252"
    },
    addimageButtonContainer:{
      borderTopColor:"#525252",
      borderTopWidth:1,
      width:'100%',
      height: 101,
      position : "absolute",
      bottom: 0
    },
    addimageButton:{
        height: 101,
    },
    showimage:{
      marginTop:325,
        width: 60,
        height: 60,
        alignSelf:"center"
    },
    addimage:{
        marginTop:25,
        width: 31,
        height: 31,
        alignSelf:"center"
    },
    addimageText:{
        marginTop:3,
        fontSize: 14,
        textAlign: "center",
        color: "#525252"
    }
});