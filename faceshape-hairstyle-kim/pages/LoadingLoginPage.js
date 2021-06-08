import React, { Component } from 'react';
 
import { useAsyncStorage } from '@react-native-community/async-storage';
const { getItem } = useAsyncStorage('키값');
 
export default class LoadingLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
    };
  }
 
  read = async () => {
    try {
      const value = await getItem();
      if (value) {
        this.setState({ isAuthorized: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
 
  async componentDidMount() {
    await this.read();
    if (this.state.isAuthorized === true) {      
      this.props.navigation.replace('HomeTab');
    } else {
      this.props.navigation.replace('LoginPage');
    }  }
};
 
 