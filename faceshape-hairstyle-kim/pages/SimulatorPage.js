import React, { Component,useEffect,useRef,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, LogBox, Alert, Modal, Pressable } from 'react-native';
import  {PanGestureHandler,PinchGestureHandler,State} from 'react-native-gesture-handler'
import image from "../images/image.png"
import size from "../images/size.png"
import drag from "../images/drag.png"
import data from '../simulHair.json';
import { useIsFocused } from '@react-navigation/native';
const tag ='[GESTURE]'

export default function SimulatorPage ({navigation,route}) {
    LogBox.ignoreAllLogs();
    //헤어이미지 상태 
    const [Hair,setHair] = useState("")

    //시뮬 헤어정보들을 저장하고 있을 상태
    const [state, setState] = useState([])

    //헤어 카테고리에 따라 다른 헤어정보들을 저장하고 있을 상태
    const [cateState,setCateState] = useState([])

    // 추가된 이미지 상태
    const [img,setImg] = useState({ "image":"https://pbs.twimg.com/profile_images/1193436004436201472/G8Do6f1u.jpg"})
    //컨텐츠 새로고침,데이터 갱신
    const isFocused = useIsFocused()

    useEffect(()=>{
        if (isFocused) {
        // do something with params
        setImg(route.params)
        let hairdata = data.data;
        setState(hairdata)
        setCateState(hairdata)
        } 
    }, [isFocused])

    const category = (cate) => {
        if(cate == "전체보기"){
        //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
            setCateState(state)
        } else{
            setCateState(state.filter((d)=>{
            return d.category == cate
            }))
        }
    }

    
    const translateX = new Animated.Value(0)
    const translateY = new Animated.Value(0)

    const basescale = new Animated.Value(1)
    const pinchscale = new Animated.Value(1)
    const scale  = Animated.multiply(basescale, pinchscale)
    let lastscale = 1
    const lastOffset = { x: 0, y: 0};

    const handleGesture1 = Animated.event([{nativeEvent: {translationX: translateX, translationY:translateY}}], { useNativeDriver: true });
    const handleGesture2 = Animated.event([{nativeEvent: {scale:pinchscale}}], { useNativeDriver: true });
  
    const _onGestureStateChange = (event)=>{
        //console.log(tag,event.nativeEvent)
        if (event.nativeEvent.oldState === State.ACTIVE) {        
            lastscale *= event.nativeEvent.scale;
            basescale.setValue(lastscale);
            pinchscale.setValue(1);
        }
    }

    const _onHandlerStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }
    };

    //console.log(tag,scale)
    
    let TransformStyle = {
        transform:[
            { perspective: 200 },
            { scale: scale },
            { translateY : translateY },
            { translateX : translateX }
        ]
    }

    const [modalVisible, setModalVisible] = useState(true);

    return img == undefined ? (
        <View style={styles.container}>
            <View style={styles.Showcontainer}>
                <View style={styles.userImageContainer}> 
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image style={styles.hairImage1} source={drag}/>
                        <Text style={styles.modalText}>한 손가락으로 드래그를 해주세요.</Text>
                        <Image style={styles.hairImage2} source={size}/>
                        <Text style={styles.modalText}>두 손가락으로 크기조정을 해주세요.</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>창 닫기</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal> 
                    <Image style={styles.userFaceImage} source={{uri:"https://previews.123rf.com/images/backwoodsicon/backwoodsicon2005/backwoodsicon200500329/148299034-healthy-skin-line-black-icon-beautiful-girl-isolated-vector-element-outline-pictogram-for-web-page-m.jpg"}}/>   
               
                {/* 헤어스타일에 대한 사진 클릭시 배경에 사진 띄우기*/}
                <PanGestureHandler onGestureEvent={handleGesture1} onHandlerStateChange={_onHandlerStateChange}>
                    <Animated.View style={styles.wrapper}>
                        <PinchGestureHandler onGestureEvent={handleGesture2} onHandlerStateChange={_onGestureStateChange}>
                            <Animated.Image style={[styles.hairTrans,TransformStyle]}  source={{uri:Hair}}/>
                        </PinchGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </View>
                    
            <View style={styles.cateContainer}>
                <View style={styles.otherImageContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SimulCamera')}>
                    <Image style={styles.otherImageimage} source={image}/>
                    <Text style={styles.otherImageText}>다른 사진</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hairContainer}>
                        <View style={styles.hairCate} horizontal indicatorStyle={"white"}>
                            <TouchableOpacity style={styles.allButton} onPress={()=>{category('전체보기')}}><Text style={styles.allText}>전체보기</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.longButton} onPress={()=>{category('long')}}><Text style={styles.longText}>롱</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mediumButton} onPress={()=>{category('midi')}}><Text style={styles.mediumText}>미디엄</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.shortButton} onPress={()=>{category('short')}}><Text style={styles.shortText}>단발</Text></TouchableOpacity>
                        </View>
                        <ScrollView horizontal indicatorStyle={"white"}>
                           {/* 하나의 카드 영역을 나타내는 View */}
                           {
                                cateState.map((content,i)=>{
                                    return (
                                        <View key={i}>
                                            <TouchableOpacity styles={styles.hair} onPress={() => {setHair(content.hairImage), console.log(content.hairImage)}}>
                                                <View>
                                                    <Image style={styles.hairImage} source={{uri:content.hairImage}}/>
                                                    <Text style={styles.hairText}>{content.hairText}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                                }
                        </ScrollView>
                    
                </View>           
            </View>
        </View>
        
    </View>
  )
  :
  (
    <View style={styles.container}>
        <View style={styles.Showcontainer}>
            <View style={styles.userImageContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image style={styles.hairImage1} source={drag}/>
                    <Text style={styles.modalText}>한 손가락으로 드래그를 해주세요.</Text>
                    <Image style={styles.hairImage2} source={size}/>
                    <Text style={styles.modalText}>두 손가락으로 크기조정을 해주세요.</Text>
                    <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>창 닫기</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>   
                <Image style={styles.userFaceImage} source={{uri:img.image}}/>   
                {/* 헤어스타일에 대한 사진 클릭시 배경에 사진 띄우기*/}
               {/* 헤어스타일에 대한 사진 클릭시 배경에 사진 띄우기*/}
               <PanGestureHandler onGestureEvent={handleGesture1} onHandlerStateChange={_onHandlerStateChange}>
                    <Animated.View style={styles.wrapper}>
                        <PinchGestureHandler onGestureEvent={handleGesture2} onHandlerStateChange={_onGestureStateChange}>
                            <Animated.Image style={[styles.hairTrans,TransformStyle]}  source={{uri:Hair}}/>
                        </PinchGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </View>
                    
            <View style={styles.cateContainer}>
                <View style={styles.otherImageContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SimulCamera')}>
                    <Image style={styles.otherImageimage} source={image}/>
                    <Text style={styles.otherImageText}>다른 사진</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hairContainer}>
                        <View style={styles.hairCate} horizontal indicatorStyle={"white"}>
                            <TouchableOpacity style={styles.allButton} onPress={()=>{category('전체보기')}}><Text style={styles.allText}>전체보기</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.longButton} onPress={()=>{category('long')}}><Text style={styles.longText}>롱</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.mediumButton} onPress={()=>{category('midi')}}><Text style={styles.mediumText}>미디엄</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.shortButton} onPress={()=>{category('short')}}><Text style={styles.shortText}>단발</Text></TouchableOpacity>
                        </View>
                        <ScrollView horizontal indicatorStyle={"white"}>
                             {/* 하나의 카드 영역을 나타내는 View */}
                             {
                                cateState.map((content,i)=>{
                                    return (
                                        <View key={i}>
                                            <TouchableOpacity styles={styles.hair} onPress={() =>{setHair(content.hairImage), console.log(content.hairImage)}}>
                                                <View>
                                                    <Image style={styles.hairImage} source={{uri:content.hairImage}}/>
                                                    <Text style={styles.hairText}>{content.hairText}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                                }
                        </ScrollView>
                    
                </View>           
            </View>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    Showcontainer:{
        flex:10
    },
    userImageContainer:{
        flex:4
    },
    title:{
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "left",
        color: "#000000",
        marginLeft:20
    },
    userFaceImage:{
        width: "100%",
        height: "100%"
    },
    cateContainer:{
        flex:1.2,
        flexDirection:"row",
        backgroundColor: "#8f8f8f"
    },
    otherImageContainer:{
        flex:1,
        borderRightWidth:2,
        borderRightColor:"#ffffff"
    },
   otherImageimage:{
       marginTop:43,
       alignSelf:"center",
        width: 30,
        height: 30,
    },
    otherImageText:{
        marginTop:5,
        fontSize: 12,
        textAlign: "center",
        color: "#2e3a59"
    },
    hairContainer:{
        flex:5
    },
    
    hairCate:{
        flexDirection:"row"
    },
    allButton:{
        backgroundColor:"#F6F6F6",
        borderRadius:20,
        width: 63,
        height: 30,
        marginLeft:9,
        marginTop:10,
        borderWidth:1.7,
        borderColor:"#bbbbbb"
    },
    longButton:{
        backgroundColor:"#F6F6F6",
        borderRadius:20,
        width: 63,
        height: 30,
        marginLeft:9,
        marginTop:10,
        borderWidth:1.7,
        borderColor:"#bbbbbb"
    },
    mediumButton:{
        backgroundColor:"#F6F6F6",
        borderRadius:20,
        width: 63,
        height: 30,
        marginLeft:9,
        marginTop:10,
        borderWidth:1.7,
        borderColor:"#bbbbbb"
    },
    shortButton:{
        backgroundColor:"#F6F6F6",
        borderRadius:20,
        width: 63,
        height: 30,
        marginLeft:9,
        marginTop:10,
        borderWidth:1.7,
        borderColor:"#bbbbbb"
        
    },
    allText:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#2e3a59",
        textAlign:"center",
        marginTop:5
    },
    longText:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#2e3a59",
        textAlign:"center",
        marginTop:5
    },
    mediumText:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#2e3a59",
        textAlign:"center",
        marginTop:5
    },
    shortText:{
        fontSize: 14,
        fontWeight:'bold',
        color: "#2e3a59",
        textAlign:"center",
        marginTop:5
    },
    hair:{
        width: 72,
        height: 72,
        marginLeft:11,
        marginTop:7
    },
    hairImage:{
        backgroundColor:"#ffffff",
        width: 68,
        height: 68,
        marginLeft:11,
        marginTop:10,
        borderRadius:8,
        borderWidth:1.7,
        borderColor:"#bbbbbb"
    },
    hairImage1:{marginLeft:8},
    hairImage2:{},
    hairText:{
        fontSize:13,
        marginLeft:9,
        marginTop:5,
        textAlign:"center",
        color:"#ffffff"
    },
    hairTrans:{
        position : "absolute", right: 30, bottom:20 , width: 300, height: 400, alignSelf:'center'
        //, borderWidth:1, borderColor:"#FF0000",borderRadius:20
    },
      wrapper: {
        ...StyleSheet.absoluteFillObject,
      },
      modalView: {
        marginTop:100,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        width:180,
        marginTop:10,
        alignSelf:"center",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#F194FF",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});