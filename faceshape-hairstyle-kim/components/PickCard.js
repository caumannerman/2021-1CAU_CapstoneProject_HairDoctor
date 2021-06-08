import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import happy from "../images/happy.png"
import userface from "../images/userface.png"
import like from "../images/like.png"
import comment from "../images/comment.png"

export default function PickCard({content}) {
    return (
        <View>
            <Image style={styles.pickImage} source={{uri:content.photo}}/>  
        </View>
    )
}

const styles = StyleSheet.create({
     pickImage:{
         width:120,
         height: 150,
     }
})