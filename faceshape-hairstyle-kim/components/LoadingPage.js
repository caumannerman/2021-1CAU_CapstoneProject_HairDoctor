import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
export default function LoadingPage() {
 
  
    return (
      <View style={styles.container}>
          <Text style={styles.textStyle}>로딩 중입니다......</Text>
      </View >
    );
}
const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
    },
    textStyle:{
        marginTop:290
    }
});