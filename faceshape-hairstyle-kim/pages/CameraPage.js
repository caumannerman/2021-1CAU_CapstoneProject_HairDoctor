import React,{useEffect,useRef,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import happy from "../images/happy.png"
import confused from "../images/confused.png"
import sad from "../images/sad.png"
import plus from "../images/plus.png"
import image from "../images/image.png"
import show from "../images/show.png"
import user from "../images/user.png"
import community from "../images/community.png"
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function CameraPage({navigation}) {
    
  return (
    <View style={styles.container}>
        <View style={styles.cameraContainer}>
          
            <TouchableOpacity style={styles.cameraButton}  onPress={() => navigation.navigate('Camera')}>
                <Image style={styles.cameraImage} source={plus}/>
            </TouchableOpacity>

            <Text style={styles.descTitle}>체험 꿀팁</Text>
            <View style={styles.descContainer}>
                <View style={styles.descContainer1}>
                    <Image style={styles.image1} source={happy}/>
                    <View style={styles.descCard1}>
                    <Text style={styles.desc1}>사진은 정면으로!</Text>
                    <Text style={styles.descText1} numberOfLines={2}>얼굴형 분석을 위해 정면으로 사진을 찍어주세요.</Text>
                    </View>
                </View>
                <View style={styles.descContainer2}>
                    <Image style={styles.image2} source={confused}/>
                    <View style={styles.descCard2}>
                    <Text style={styles.desc2}>이마를 보여줘!</Text>
                    <Text style={styles.descText2} numberOfLines={2}>이마 드러내기로 더 자연스럽게 가상체험을 할 수 있어요.</Text>
                    </View>
                </View>
                <View style={styles.descContainer3}>
                <Image 
                    source = {sad} 
                    resizeMode={"cover"} 
                    style={styles.image3}
                />
                    <View style={styles.descCard3}>
                    <Text style={styles.desc3}>머리카락은 귀뒤로!</Text>
                    <Text style={styles.descText3} numberOfLines={2}>더 정확한 얼굴형 분석을 위해 머리는 뒤로 넘기거나 묶어주세요.</Text>
                    </View>
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
    cameraContainer:{
        flex:10
    },

    title:{
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "left",
        color: "#000000",
        marginLeft:20
    },
    cameraButton:{
        marginTop:20,
        alignSelf:"center",
        width: 193,
        height: 155,
        backgroundColor: "#c4c4c4"
    },
    cameraImage:{
        width: 35,
        height: 35,
        alignSelf:"center",
        marginTop:60
    },
    descTitle:{
        fontSize: 30,
        lineHeight: 70,
        textAlign: "left",
        color: "#262626",
        marginLeft:30
    },
    descContainer:{
        flex:1
    },
    descContainer1:{
        flex:1,
        flexDirection:"row",
        marginTop:10
    },
    image1:{
        marginLeft:40,
        width: 35,
        height: 35
    },
    descCard1:{
        marginRight:40,
        flex:3,
        marginLeft:20,
    },
    desc1:{
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 30,
        textAlign: "left",
        color: "#000000"
      
    },
    descText1:{
        marginTop:8,
        fontSize: 16,
        lineHeight: 20,
        textAlign: "left",
        color: "#000000"
    },

    descContainer2:{
        flex:1,
        flexDirection:"row"
    },
    image2:{
        marginLeft:40,
        width: 35,
        height: 35
    },
    descCard2:{ 
        marginRight:40,
        marginLeft:20,
        flex:3,
    },
    desc2:{
        fontSize: 24,
        fontWeight: "700",
        lineHeight: 30,
        textAlign: "left",
        color: "#000000"
    },
    descText2:{
        marginTop:8,
        fontSize: 16,
        lineHeight: 20,
        textAlign: "left",
        color: "#000000"
    },

    descContainer3:{
        flex:1,
        flexDirection:"row"
    },
    image3:{
        marginLeft:40,
        width: 35,
        height: 35
    },
    descCard3:{
        marginRight:40,
        marginLeft:20,
        flex:3,
    },
    desc3:{
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 30,
        textAlign: "left",
        color: "#000000"
    },
    descText3 :{
        marginTop:8,
        fontSize: 16,
        lineHeight: 20,
        textAlign: "left",
        color: "#000000"
    },

    
});
