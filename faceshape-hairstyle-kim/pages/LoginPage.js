import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import kakao from "../images/kakao.png"
import login from "../images/login.png"
import SocialWebviewModal from './SocialWebviewModal';

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socialModalVisible: false,
      source: undefined,
    };
  }

 
  //소셜 로그인
  onPressSocial = async (social) => {
    this.setState({
      socialModalVisible: !this.state.socialModalVisible,
      source: `https://hairdoctor.owlsogul.com/auth/kakao/ `,
    });
  };
 
  closeSocialModal = async () => {
    this.setState({
      socialModalVisible: !this.state.socialModalVisible,
    });
    this.props.navigation.navigate('Home');
  };
 
  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>얼굴형 분석</Text>
      <Text style={styles.title2}>나의 헤어스타일 추천</Text>
      <Text style={styles.title3}>Hair Doctor</Text>
      <Image 
      source = {login} 
      resizeMode={"cover"} 
      style={styles.loginimageStyle}
      />
      {this.state.source !== undefined ? (
        <SocialWebviewModal
        visible={this.state.socialModalVisible}
        source={this.state.source}
        closeSocialModal={this.closeSocialModal}
      />
      ) : null}
      <TouchableOpacity 
      onPress={() => this.onPressSocial('kakao')}>
      <Image 
      source = {kakao}
      resizeMode={"cover"} 
      style={styles.kakaoimageStyle}
      />
      </TouchableOpacity>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
 
  },
  title1:{
    marginTop:80,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    color: "#000000",
    marginLeft:20
  },
  title2:{
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "normal",
    marginTop:5,
    marginLeft:20,
    textAlign: "left",
    color: "#000000"
  },
  title3:{
    fontSize: 30,
    fontWeight: "700",
    fontStyle: "normal",
    marginTop:35,
    textAlign: "center",
    color: "#666666"
  },
  loginimageStyle:{
    alignSelf:"center",
    width:295,
    height:250,
  },
  kakaoimageStyle:{
    alignSelf:"center",
    marginTop:50,
  }

});


