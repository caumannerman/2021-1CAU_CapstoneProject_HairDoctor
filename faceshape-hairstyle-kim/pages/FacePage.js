import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,LogBox,FastImage } from 'react-native';
import userface from "../images/userface.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import facetypeEx from '../facetype.json';
import FaceLoading from './FaceLoading';
export default function FacePage({navigation,route}) {
    LogBox.ignoreAllLogs();

//준비 상태
const [ready,setReady] = useState(true)

    const [img,setImgSource] = useState('')

    const [state,setState] = useState({"facetype":"egg"})
    
    const getUserId= async () => {
        const id = JSON.parse(await AsyncStorage.getItem("user_id"))
        console.log(id);

        const response = await axios.post(`https://hairdoctor.owlsogul.com/face/Facetype`, {
                             user_id: id
                             })
        //console.log(response.data)
        setState(response.data)
    }

    const getUserImage= async () => {
        const image =await axios.get('https://hairdoctor.owlsogul.com/face/photo')
        //console.log(image) 
        setImgSource(image.data)

    }

    const userImage = img.uri +"?cache="+Math.random()


    useEffect(() => {
        getUserId();

        setTimeout(()=>{
            getUserImage();
            setReady(false)
        },4000)

     },[]);

    const userfacetype = state.facetype
    //console.log(userfacetype)

  
    //2.facetype.json와 같은 얼굴형으로 화면 나타내기
    let data = facetypeEx.data//facetype.json 

    const filteredData = data.filter(data => data.type == userfacetype)
    const facetitle=filteredData[0].facetitle
    const faceDesc=filteredData[0].faceDesc
    const faceDescText=filteredData[0].faceDescText
//


 return ready ? <FaceLoading/> : (
    <View style={styles.container}>
        <View style={styles.faceContainer}>
            
            <Image style={styles.userFaceImage} source={{uri:userImage}}/>
            <View style={styles.faceTitleContainer}>
                <Text style={styles.faceTitle}>{facetitle}</Text>
            </View>
            <View style={styles.faceDescContainer}>
                <Text style={styles.faceDesc}>{faceDesc}</Text>
                <Text style={styles.faceDescText}>{faceDescText}</Text>
                <TouchableOpacity style={styles.Button}  
                    onPress={() => navigation.navigate('CelebrityPage')}
                >
                    <Text style={styles.ButtonText}>연예인 헤어스타일링 보러가기</Text>
                </TouchableOpacity>
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
    faceContainer:{
       alignSelf:"center",
       padding:20
    },    
    userFaceImage:{
        marginTop:10,
        width: 220,
        height: 220,
        alignSelf:"center"
    },
    faceTitleContainer:{
        width: 300,
        height: 42,
        marginTop:10,
        backgroundColor: "#c4c4c4",
        alignSelf:"center"
    },
    faceTitle:{
        fontSize: 25,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "center",
        marginTop:2,
        color: "#ffffff"
    },
    faceDescContainer:{
        marginTop:10,
        width: 300,
        height: 250,
        backgroundColor: "#c4c4c4",
        alignSelf:"center"
    },
    faceDesc:{
        marginLeft:15,
        marginTop:2,
        fontSize: 19,
        fontWeight: "600",
        lineHeight: 40,
        textAlign: "left",
        color: "#ffffff"
    },
    faceDescText:{
        marginLeft:16,
        marginRight:16,
        fontSize: 15,
        fontWeight: "600",
        textAlign: "left",
        color: "#000000"
    },
    Button:{
        marginTop:20,
        alignSelf:"center",
        width: 250,
        height: 30,
        backgroundColor: "#ffffff"
    },
    ButtonText:{
        marginTop:7,
        fontSize: 17,
        lineHeight: 20,
        textAlign: "center",
        color: "#525252"
    },
    
});
