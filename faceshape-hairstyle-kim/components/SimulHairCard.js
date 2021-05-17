import React, { Component,useEffect,useRef,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';

export default function SimulHairCard ({content}) {
 return (
    <View>
        <TouchableOpacity styles={styles.hair} onpress>
            <View>
                <Image style={styles.hairImage} source={{uri:content.hairImage}}/>
                <Text style={styles.hairText}>{content.hairText}</Text>
            </View>
        </TouchableOpacity>
    </View>
 )
}

const styles = StyleSheet.create({
    hair:{
        width: 72,
        height: 72,
        marginLeft:11,
        marginTop:10
    },
    hairImage:{
        width: 70,
        height: 70,
        marginLeft:11,
        marginTop:10
    },
    hairText:{
        fontSize:12,
        marginLeft:9,
        marginTop:3,
        textAlign:"center",
        color:"#ffffff"
    }
});

