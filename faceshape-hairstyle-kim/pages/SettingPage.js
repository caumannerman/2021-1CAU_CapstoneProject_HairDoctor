import React from 'react';
import { StyleSheet, Text, TextInput, Alert, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import happy from "../images/happy.png"
import confused from "../images/confused.png"
import sad from "../images/sad.png"
import plus from "../images/plus.png"
import image from "../images/image.png"
import show from "../images/show.png"
import user from "../images/user.png"
import community from "../images/community.png"
import notification from "../images/notification.png"
import { Ionicons } from '@expo/vector-icons';

export default function SettingPage() {
    console.disableYellowBox = true;
    
    return (
      <View style={styles.container}>
  
          <TouchableOpacity style={styles.logoutContainer}>
              <Text style={styles.logoutText}>프로필 수정</Text>
          </TouchableOpacity>
  
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
          marginLeft:20
      },
      logoutContainer:{
          marginTop:1,
       
        height: 53,
        backgroundColor:"#c4c4c4"
      },
      logoutText:{
        marginTop:13,
        marginLeft:20,
          color:"#ffffff",
          fontSize:18
      }
  });