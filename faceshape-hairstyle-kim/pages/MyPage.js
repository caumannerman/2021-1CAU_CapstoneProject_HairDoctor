import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import happy from "../images/happy.png"
import Loading from '../components/LoadingPage';
import pick from "../images/pick.png"
import notification from "../images/notification.png"
import profile from "../images/user.png"
import PickCard from '../components/PickCard';
import { useIsFocused } from '@react-navigation/native';

export default function MyPage({navigation,route}) {

 //찜 사진들을 저장하고 있을 상태
    const [pickState,setPickState] = useState([])
//준비 상태
    const [ready,setReady] = useState(true)
//유저 아이디를 가져오기
const [ID,setID] = useState("")

//유저 정보를 가져오기 
const [state,setState] = useState([])

const myData= async () => {
    const id = JSON.parse(await AsyncStorage.getItem("user_id"))
    //console.log(id);
    setID(id)

    const response = await axios.get('https://hairdoctor.owlsogul.com/mypage/showjjim', {
        params: { user_id: id } 
        })
    setPickState(response.data.data)
    console.log(response.data.data)

    const res = await axios.get('https://hairdoctor.owlsogul.com/mypage/setprofile', {
        params: { user_id: id } 
        })
        setState(res.data.data)
        console.log(res.data.data)
    }

    //컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

    useEffect(()=>{
	   
      
            if (isFocused) {
            myData();
            setReady(false)
            }
       
      },[isFocused])

      const name= state[0].nickname
      const face= state[0].name

      return ready ? <Loading/> : (
    <View style={styles.container}>
        <View style={styles.myContainer}>
            
            <View style={styles.userInfo}>
                <View style={styles.usericonLayout}><Image style={styles.usericon} source={happy}/></View>
                <Text style={styles.username}>{name}</Text>
                <Text style={styles.userFaceshape}>{face}</Text>
                <TouchableOpacity style={{position : "absolute", right: 40, bottom: 50}} onPress={() => navigation.navigate('NotificationPage')}>
                <Image style={styles.notificationImage} source={notification}/>
                </TouchableOpacity>
                <TouchableOpacity style={{position : "absolute", right: 10, bottom: 50}} onPress={() => navigation.navigate('ProfilePage')}> 
                <Image style={styles.profileImage} source={profile}/>
                </TouchableOpacity>
            </View>

            <View style={styles.pickContainer}>
                <Image style={styles.pickImage} source={pick}/>
                <Text style={styles.pickText}>찜</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CelebrityPage')}><Text style={styles.celebritypagebutton}>연예인 사진 리스트</Text></TouchableOpacity>
            </View>

            <ScrollView style={styles.pickimageList}>
                <View style={styles.pickimageContainer}>
                {
                    pickState.map((content,i)=>{
                    return (<PickCard content={content} key={i} navigation={navigation}/>)
                    })
                    }
                </View>
                
            </ScrollView>

        </View>

       
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        
    },
    myContainer:{
        flex:10
    },
    myFunc:{
        marginTop:5,
        alignSelf:"flex-end",
        flexDirection:"row",
        height:20,
        color:"#ffffff",
        marginRight:10,
    },
    title:{
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "left",
        color: "#000000",
        marginLeft:20
    },
    notificationButton:{
        marginLeft:100,
        width: 20,
        height: 20
    },

    notificationImage:{
        width: 20,
        height: 20,
    },
    profileButton:{
        marginLeft:7,
        width: 20,
        height: 20
    },
    profileImage:{
        width: 20,
        height: 20,
    },
    //
    userInfo:{
        marginTop:10,
        width:"100%",
        flexDirection:"row",
        height:80,
        color:"#ffffff",
        flexDirection:"row",
        borderBottomColor:"#c4c4c4",
        borderBottomWidth:7,
        padding:5
    },
    usericonLayout:{
        marginLeft:15,
        width: 60,
        height: 60,
        backgroundColor: "#c4c4c4",
        borderRadius:30,

    },
    usericon:{
        marginLeft:13,
        marginTop:12,
        width: 35,
        height: 35,
    },
    username:{
        marginTop:12,
        marginLeft:15,
        fontSize:20,
        textAlign:"left",
        color:"#000000"
    },
    userFaceshape:{
        marginTop:20,
        marginLeft:13,
        fontSize:13,
        textAlign:"left",
        color:"#525252"
    },
    //
    pickContainer:{    
        width:"100%",
        height: 55,
        color:"#ffffff",
        flexDirection:"row",
        borderBottomColor:"#000000",
        borderBottomWidth:1,
    },
    pickImage:{
        marginTop:15,
        marginLeft:15,
        width: 20,
        height: 18,
    },
    pickText:{
        marginTop:15,
        marginLeft:5,
        fontSize: 14,
        textAlign: "left",
        color: "#000000",
    },
   
    celebritypagebutton:{
 
        marginTop:15,
       marginLeft:185,
        fontSize: 14,
    },
    pickimageList:{
        backgroundColor: "#ffffff",
    },
    pickimageContainer:{
        flex:1,
        flexWrap:"wrap",
         flexDirection:"row"
     },
    
    
});

