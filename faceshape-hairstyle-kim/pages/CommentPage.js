import React,{useEffect,useRef,useState,Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import happy from "../images/happy.png"
import userface from "../images/userface.png"
import like from "../images/like.png"
import commenticon from "../images/comment.png"
import CommentCard from '../components/CommentCard';
//원래 서버에서 받아오는 데이터를 json형식으로 예로 듬
import commentEx from '../commentEx.json';
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UselessTextInput = props => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={100}
        placeholder={"댓글을 입력해주세요."}
      />
    )
  };

export default function CommentPage({navigation,route}) {
  
//유저 아이디를 가져오기
const [ID,setID] = useState("")
//글 댓글 상태
const [commentState, setComment] = useState([])

const getUserId= async () => {
    const id = JSON.parse(await AsyncStorage.getItem("user_id"))
    //console.log(id);
    setID(id)
}

const CommentData= async () => {
    const response = await axios.get('https://hairdoctor.owlsogul.com/community/showcomment'+"?cache="+Math.random())
    setComment(response.data.list)
   // console.log(response.data.list)
}


//사용자 글 데이터 상태
    const [data, setData] = useState({
        "idx":1,
        "category":"egg",
        "username":"김하나",
        "userFaceshape": "-계란형",
        "userCommunityText":"얼굴형 분석 후 계란형으로 나와 추천해주는 레이어드 컷 C컬펌을 시도해 보았습니다. 주변에서 다들 잘 어울린다고 하네요ㅎㅎ. 계란형이신 분들 추천합니다.,,!",
        "likeNum":"2",
        "commentNum":"2"
    })

    
//텍스트 입력 상태  
const [value, onChangeText] = React.useState('');

      useEffect(()=>{
        getUserId();
       
        setTimeout(()=>{
            //넘어온 데이터는 route.params에 들어 있습니다.
            let data = route.params;
            setData(data)
            CommentData();

        },1000)
    },[commentState])


//댓글들을 idx로 걸르자,,
let exex = commentState
const filteredData = exex.filter(exex => exex.community_id == data.idx)


  return (
    <View style={styles.container}>
        <ScrollView style={styles.communityCard}>  
            <View style={styles.communityCardContainer}>   
                <View style={styles.userInfo}>
                    <View style={styles.usericonLayout}><Image style={styles.usericon} source={happy}/></View>
                    <Text style={styles.username}>{data.username}</Text>
                    <Text style={styles.userFaceshape}>{data.userFaceshape}</Text>
                </View>
                <Image style={styles.userCommunityImage} source={{uri:data.picture}}/>
                <View style={styles.userCommunityTextContainer}>
                    <Text style={styles.userCommunityText}>{data.userCommunityText}</Text>
                </View> 
                <View style={styles.communityFunc}>
                    <TouchableOpacity onPress={() =>axios.post(`https://hairdoctor.owlsogul.com/community/deletecontent`, {
                                    idx : data.idx
                                    }) }><Image style={styles.likeIcon} source={like}/></TouchableOpacity>
                    <Text style={styles.likeNum}>{data.likeNum}</Text>
                    <Image style={styles.commentIcon} source={commenticon}/>
                    <Text style={styles.commentNum}>{data.commentNum}</Text>
                </View>                                                           
            </View> 
                
            <View>
                {/* 하나의 댓글 카드   영역을 나타내는 View */}
            {
            filteredData.map((content,i)=>{
                return (<CommentCard content={content} key={i} navigation={navigation}/>)
            })
            }
            </View>
            
        </ScrollView>

        <View style={styles.commentwriteContainer}>
                <View
                style={{
                    backgroundColor: value,
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <UselessTextInput
                    multiline
                    numberOfLines={4}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                </View>
            <TouchableOpacity onPress={() =>{         
               fetch('https://hairdoctor.owlsogul.com/community/addcomment', {
               method: 'POST',
               headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            // send our base64 string as POST request
            body: JSON.stringify({
               idx : data.idx,
                user_id : ID,
                commentText:value
            }),
           }),console.log(ID)
         }} ><Text style={styles.commentregister}>등록</Text></TouchableOpacity>
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
        marginLeft:155
    },
    communityCard:{
       
        height: 528,
    },
    communityCardContainer:{
        borderBottomColor:"#8f8f8f",
        borderBottomWidth:1,
        height: 433,
        backgroundColor: "#ffffff",
    },
    userInfo:{
        flexDirection:"row",
       
        height: 56,
        paddingLeft:15,
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
        height: 289
    },
    userCommunityTextContainer:{
        width: 346,
        height: 60,
        alignSelf:"center"
    },
    userCommunityText:{
        fontSize: 13,
        textAlign: "left",
        color: "#000000"
    },
    communityFunc:{
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
    commentwriteContainer:{
        height:66,
        flexDirection:"row",
        borderTopColor:"#000000",
        borderTopWidth:1,
        padding:20
    },
    commentwrite:{
        fontSize: 14,
        textAlign: "left",
        color: "#262626"
    },
    commentregister:{
        fontSize: 14,
        color: "#000000",
        marginLeft:170
    }
    });