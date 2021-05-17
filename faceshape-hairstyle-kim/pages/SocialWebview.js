import React, { Component } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';
// const { setItem } = useAsyncStorage('토큰 key 값');
export default class SocialWebview extends Component {
  constructor(props) {
    super(props);
  }
  INJECTED_JAVASCRIPT =
    '(function() {if(window.document.getElementsByTagName("pre").length>0){window.ReactNativeWebView.postMessage((window.document.getElementsByTagName("pre")[0].innerHTML));}})();';
  _handleMessage = async (event) => {
    console.log(JSON.parse(event.nativeEvent.data));
    let result = JSON.parse(event.nativeEvent.data);
    console.log(result.data.user_id);
    let user_id = result.data.user_id
    let success = result.success;
    console.log(result);
    if (success) {
      let userToken = result.Authorization;
      try {
        console.log(user_id);
        user_id_json = JSON.stringify(user_id);
        await AsyncStorage.setItem('user_id', user_id_json);
      } catch (e) {
        console.log(e);
      }
    }
    this.props.closeSocialModal();
  };
  render() {
    return (
      <WebView
        //ref={this._refWebView}
        originWhitelist={['*']}
        injectedJavaScript={this.INJECTED_JAVASCRIPT}
        source={this.props.source}
        javaScriptEnabled={true}
        onMessage={this._handleMessage}
      />
    );
  }
}