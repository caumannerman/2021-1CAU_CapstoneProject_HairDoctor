import React,{Component,useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, Alert, View, Image, LogBox, TouchableOpacity } from 'react-native';
import happy from "../images/happy.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"

const UselessTextInput = props => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        multiline={true}
        maxLength={400}
        placeholder={"이름을 변경하세요:D"}
      />
    )
  };

export default function ProfilePage({navigation}) {
    LogBox.ignoreAllLogs();

    const [userID,setID] = useState('')

    //유저 얼굴형 상태변수
    const [userFacetype,setFacetype] = useState('')

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


useEffect(() => {
    getUserId();
},[])

  return (
    <View style={styles.container}>
        

        <View style={styles.faceshapeContainer}>
            <TouchableOpacity onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/mypage/changeName`, {
                                     params: {user_id : userID, name:value}
                                    })
                                    .then(function(response)
                                    {
                                        console.log(userID); 
                                        navigation.navigate('My')
                                    })
                                    .catch(function (error) {})

                                }><Text style={styles.registerButton}>등록</Text></TouchableOpacity>
	        <View style={styles.usericonLayout}><Image style={styles.usericon} source={happy}/></View>
            <Text style={styles.userfaceshape}>{userFacetype}</Text>
        </View>

        <View style={styles.userinfoContainer}>
            <View style={styles.nicknameContainer}>
                <Text style={styles.nickname}>닉네임</Text>
                <View
                style={{
                    marginLeft:30,
                    backgroundColor: value,
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <UselessTextInput
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                </View>
            </View>
        </View>
        
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
        marginLeft:130
    },
    registerButton:{
        fontSize: 16,
        textAlign: "center",
        color: "#7705ad",
        marginLeft:290,
        marginTop:10
    },
    faceshapeContainer:{
        height:140,
        borderBottomWidth:1,
        borderBottomColor:"#8f8f8f"
    },
    usericonLayout:{
        marginTop:0,
        width: 72,
        height: 72,
        backgroundColor: "#c4c4c4",
        borderRadius: 50,
        alignSelf:"center"
    },
    usericon:{
        marginTop:15,
        width: 43,
        height: 43,
        alignSelf:"center"
    },
    userfaceshape:{
        marginTop:5,
        fontSize: 15,
        textAlign: "center",
        color: "#525252"
    },
    userinfoContainer:{
        height:454
    },
    nicknameContainer:{
        marginTop:30,
        width:292,
        height:43,
        alignSelf:"center",
        flexDirection:"row"
    },
    nickname:{
        marginLeft:30,
        fontSize: 20,
    },
    nicknameinfo:{
        marginLeft:20,
        width:208,
        height:30,
        borderBottomColor:"#000000",
        borderBottomWidth:1
    }
});