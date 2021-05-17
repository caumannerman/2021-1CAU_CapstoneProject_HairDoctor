import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
export default function LoadingPage() {
 
  
    return (
      <View style={styles.container}>
          <Image 
        source={{uri:'https://media.istockphoto.com/vectors/faceprint-analysis-linear-icon-vector-id1189213360?b=1&k=6&m=1189213360&s=170x170&h=cP1E9NpqiduHbatWFAfyQoXUbvyB8cqN7aRJddBxAnk='}}style={styles.imageStyle}
        />
          <Text style={styles.textStyle}>얼굴 분석중입니다.잠시만 기다려 주세요:D</Text>
      </View >
    );
}
const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
        backgroundColor:"#fff",
        flex:1,
        width:360,
    },
    imageStyle:{
        marginTop:170,
        width:200,
        height:200,
        alignSelf:"center",
    },
    textStyle:{
        fontSize:15,
        marginTop:20,
        textAlign:"center"
    }
});