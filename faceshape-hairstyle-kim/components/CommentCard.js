import React,{useState,useEffect} from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from "react-native";
import happy from "../images/happy.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
//비구조 할당 방식으로 넘긴 속성 데이터를 꺼내 사용함
export default function CommentCard({content,navigation}) {
    //유저 아이디를 가져오기
   const [state,setState] = useState("")
   
   const getUserId= async () => {
       const id = JSON.parse(await AsyncStorage.getItem("user_id"))
       console.log(id);
       setState(id)
   }

   useEffect(() => {
       getUserId();
    },[]);

  //만약 유저아이디랑 쓴 글의 아이디가 같다면,,,수정과 삭제가 가능해야함,,, 
   return state == content.user_id ? (
        <View style={styles.commnentContainer}>
        <View style={styles.commnentuserInfo}>
            <View style={styles.commnentusericonLayout}><Image style={styles.commnentusericon} source={happy}/></View>
            <Text style={styles.commnentusername}>{content.username}</Text>
            <Text style={styles.commnentuserFaceshape}>{content.userFaceshape}</Text>
            <TouchableOpacity onPress={() =>axios.post(`https://hairdoctor.owlsogul.com/community/deletecomment`, {
                                    idx : content.idx
                                    }) }><Text style={styles.delete}>삭제</Text></TouchableOpacity>
        </View>
        <View style={styles.comment}>
            <Text style={styles.commentText}>
            {content.commentText}
            </Text>
        </View>
    </View>
    ): (
        <View style={styles.commnentContainer}>
        <View style={styles.commnentuserInfo}>
            <View style={styles.commnentusericonLayout}><Image style={styles.commnentusericon} source={happy}/></View>
            <Text style={styles.commnentusername}>{content.username}</Text>
            <Text style={styles.commnentuserFaceshape}>{content.userFaceshape}</Text>
        </View>
        <View style={styles.comment}>
            <Text style={styles.commentText}>
                {content.commentText}
            </Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    delete:{marginTop:3,marginLeft:215,color:"#8f8f8f",fontSize:13},

    commnentContainer:{
        height:80,
        borderBottomColor:"#8f8f8f",
        borderBottomWidth:1,
    },
    commnentuserInfo:{
        flexDirection:"row",
       
        height: 35,
        paddingLeft:5,
        paddingTop:5
    },
    commnentusericonLayout:{
        width: 25,
        height: 25,
        backgroundColor: "#c4c4c4",
        borderRadius:30
    },
    commnentusericon:{
        marginLeft:5,
        marginTop:5,
        width: 15,
        height: 15,
    },
    commnentusername:{
        marginTop:4,
        marginLeft:5,
        fontSize: 13,
    },
    commnentuserFaceshape:{
        marginLeft:6,
        marginTop:7,
        fontSize: 11,
        color:"#525252"
    },
    comment:{
        height:60,
        marginLeft:10,
        marginRight:10
    },
    commentText:{
        textAlign:"left"
    },
})