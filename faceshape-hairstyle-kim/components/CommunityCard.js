import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Alert } from 'react-native';
import happy from "../images/happy.png"
import userface from "../images/userface.png"
import like from "../images/like.png"
import comment from "../images/comment.png"
import Loading from './LoadingPage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
export default function CommunityCard({content,navigation,reload}) {
   //유저 아이디를 가져오기
   const [state,setState] = useState("")
    const getUserId= async () => {
        const id = JSON.parse(await AsyncStorage.getItem("user_id"))
        //console.log(id);
        
        setState(id)
    }

    useEffect(() => {
        getUserId();
     },[]);

   //만약 유저아이디랑 쓴 글의 아이디가 같다면,,,수정과 삭제가 가능해야함,,, 
    return state == content.user_id ? (
        <TouchableOpacity style={styles.communityCardContainer} onPress={() => navigation.navigate('CommentPage',content)}>   
                    <View style={styles.userInfo}>
                        <View style={styles.usericonLayout}><Image style={styles.usericon} source={happy}/></View>
                        <Text style={styles.username}>{content.username}</Text>
                        <Text style={styles.userFaceshape}>{content.userFaceshape}</Text>
                        <TouchableOpacity onPress={() =>axios.post(`https://hairdoctor.owlsogul.com/community/deletecontent`, {
                                    idx : content.idx
                                    }).then(function(){Alert.alert("삭제 완료"); reload()})
                                }><Text style={styles.delete}>삭제</Text></TouchableOpacity>
                    </View>
                    <Image style={styles.userCommunityImage} source={{uri:content.picture}}/>
                    <View style={styles.userCommunityTextContainer}>
                        <Text style={styles.userCommunityText}>{content.userCommunityText}</Text>
                    </View> 
                    <View style={styles.communityFunc}>
                        <TouchableOpacity onPress={() =>axios.post(`https://hairdoctor.owlsogul.com/community/updateHeart`, {
                                    idx : content.idx,
                                    user_id:state
                                }).then(function(){reload()})
                                    }><Image style={styles.likeIcon} source={like}/></TouchableOpacity>
                        <Text style={styles.likeNum}>{content.likeNum}</Text>
                        <Image style={styles.commentIcon} source={comment}/>
                        <Text style={styles.commentNum}>{content.commentNum}</Text>
                    </View>                                                           
        </TouchableOpacity> 
    ) : (
        <TouchableOpacity style={styles.communityCardContainer} onPress={() => navigation.navigate('CommentPage',content)}>   
                    <View style={styles.userInfo}>
                        <View style={styles.usericonLayout}><Image style={styles.usericon} source={happy}/></View>
                        <Text style={styles.username}>{content.username}</Text>
                        <Text style={styles.userFaceshape}>{content.userFaceshape}</Text>
                    </View>
                    <Image style={styles.userCommunityImage} source={{uri:content.picture}}/>
                    <View style={styles.userCommunityTextContainer}>
                        <Text style={styles.userCommunityText}>{content.userCommunityText}</Text>
                    </View> 
                    <View style={styles.communityFunc}>
                        <TouchableOpacity onPress={() =>axios.post(`https://hairdoctor.owlsogul.com/community/updateHeart`, {
                                    idx : content.idx,
                                    user_id:state
                                    }).then(function(){reload()})
                                     }><Image style={styles.likeIcon} source={like}/></TouchableOpacity>
                        <Text style={styles.likeNum}>{content.likeNum}</Text>
                        <Image style={styles.commentIcon} source={comment}/>
                        <Text style={styles.commentNum}>{content.commentNum}</Text>
                    </View>                                                           
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    
    delete:{marginTop:10,marginLeft:170,color:"#8f8f8f"},

   communityCardContainer:{
        borderBottomColor:"#8f8f8f",
        borderBottomWidth:3
    },
    userInfo:{
        flexDirection:"row",
        
        height: 56,
        paddingLeft:10,
        paddingTop:10
    },
    usericonLayout:{
        width: 37,
        height: 37,
        backgroundColor: "#c4c4c4",
        borderRadius:30
    },
    usericon:{
        marginLeft:8,
        marginTop:7,
        width: 22,
        height: 22,
    },
    username:{
        marginTop:7,
        marginLeft:10,
        fontSize: 16,
    },
    userFaceshape:{
        marginLeft:10,
        marginTop:11,
        fontSize: 13,
        color:"#525252"
    },
    userCommunityImage:{
        width:'100%',
        height: 350
    },
    userCommunityTextContainer:{
       paddingLeft:5,
       paddingRight:5,
        height: 60,
        alignSelf:"center"
    },
    userCommunityText:{
        fontSize: 13,
        textAlign: "left",
        color: "#000000"
    },
    communityFunc:{
        marginTop:5,
        flexDirection:"row",
        marginLeft:10
    },
    likeIcon:{
        width: 15,
        height: 15,
        
    },
    likeNum:{
        fontSize: 13,
        textAlign: "left",
        color: "#8f8f8f",
        marginLeft:3
    },
    commentIcon:{
        width: 15,
        height: 15,
        marginLeft:10
    },
    commentNum:{
        fontSize: 13,
        textAlign: "left",
        color: "#8f8f8f",
        marginLeft:3
    },
})