import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import faceerror from "../images/faceerror.png"

export default function FaceErrorPage({navigation}) {
    return (
      <View style={styles.container}>
          <Image style={styles.imageStyle} source={faceerror}/>
          <Text style={styles.textStyle}>얼굴 분석에 실패했어요. 다시 시도해보시겠어요?</Text>
          <View style={styles.tContainer}>
            <Text style={styles.textTitle}>이렇게 찍어주세요!</Text>
            <Text style={styles.textStyle1}>1. 정면에 들어오는 빛이 충분해야해요! 얼굴의 그림자를 신경써주세요:)</Text>
            <Text style={styles.textStyle2}>2. 뒷배경이랑 얼굴이 차이가 나야해요, 뒷배경이 좀더 어두운곳에서 찍어주세요:)</Text>
          </View>
          <TouchableOpacity style={styles.Button}   
                onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.ButtonText}>사진 찍으러가기</Text>
          </TouchableOpacity>
      </View >
    );
}
const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
        backgroundColor:"#ffffff",
        flex:1,
        width:360,
    },
    imageStyle:{
        marginTop:80,
        width:150,
        height:150,
        alignSelf:"center",
    },
    tContainer:{
        marginTop:7,
        alignSelf:"center",
        backgroundColor:"#cccccc",
        width:300,
        height:180,
        borderRadius:10
    },
    textStyle:{
        fontSize:15,
        marginTop:20,
        textAlign:"center"
    },
    textTitle:{
        fontWeight:"bold",
        marginLeft:20,
        fontSize:18,
        marginTop:10,
        color:"#fff"
    },
    textStyle1:{
        marginTop:5,
        fontSize:16,
        marginLeft:20,
        marginRight:20,
        textAlign:"left",
        color:"#333333"
    },
    textStyle2:{
        marginTop:7,
        fontSize:16,
        marginLeft:20,
        marginRight:20,
        textAlign:"left",
        color:"#333333"
    },
    Button:{
        width:200,
        height:45,
        marginTop:20,
        alignSelf:"center",
        backgroundColor: "#9966FF",
        borderRadius: 50,
    },
    ButtonText:{
        color:"#ffffff",
        fontSize:20,
        marginTop:8,
        textAlign:"center"
    }
});