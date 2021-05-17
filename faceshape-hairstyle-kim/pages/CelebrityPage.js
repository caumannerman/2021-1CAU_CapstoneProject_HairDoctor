import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, AppRegistry,LogBox} from 'react-native';
import recommend from "../images/recommend.png"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react/cjs/react.development';
import recommandEx from '../recommand.json';
import Loading from '../components/LoadingPage';

export default function CelebrityPage() {

    LogBox.ignoreAllLogs();
   
    //얼굴형의 연예인 리스트 상태변수
    const [state,setState] = useState([
        {
            id : 1
            ,celebrity_name : ''   
            ,profile_photo : ''   
        },
        {
            id : 2
            ,celebrity_name : ''   
            ,profile_photo : ''   
        },
        {
            id : 3
            ,celebrity_name : ''   
            ,profile_photo : ''   
        },
        {
            id : 4
            ,celebrity_name : ''   
            ,profile_photo : ''  
        },
        {
            id : 5
            ,celebrity_name : ''   
            ,profile_photo : ''  
        }

    ])
   //해당 연예인 사진리스트 상태변수
    const [celeList,setCeleList] = useState([
        {
            celebrity_id: 1,
            celebrity_name: '',
            recommend: '',
            photo : '',
            pick:''
           
        },
        {
            celebrity_id: 2,
            celebrity_name: '',
            recommend: '',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-b5eO3YQuNIZ8d9xZWOFUl4_Dx5u4iH9Bxw&usqp=CAU'
            ,pick:''
        }, 
        {
            celebrity_id: 3,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
        },
        {
            celebrity_id: 4,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 5,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 6,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 7,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 8,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 9,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 10,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 11,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 12,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 13,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 14,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 15,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 16,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 17,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        },
        {
            celebrity_id: 18,
            celebrity_name: '',
            recommend: '',
            photo: '',
            pick:''
           
        }
    
    ])
     //준비 상태
     const [ready,setReady] = useState(true)

     const [ID,setID] = useState("")
    const [facetypeState,setfacetype] = useState({"facetype":"egg"})

    const getUserId= async () => {
        const id = JSON.parse(await AsyncStorage.getItem("user_id"))
        console.log(id);
        setID(id);

        const response = await axios.post(`https://hairdoctor.owlsogul.com/face/Facetype`, {
                             user_id: id
                             })
       // console.log(response.data)
        setfacetype(response.data)

        const ures = await axios.get(`https://hairdoctor.owlsogul.com/face/getCeleList`, {
            params: { facetype: response.data.facetype}
           }) 
        
           setState(ures.data)   
    }

    const userfacetype = facetypeState.facetype
    console.log(userfacetype)


    //연예인 사진 찜 상수
    const picktext1=celeList[0].pick 
    const picktext2=celeList[1].pick
    const picktext3=celeList[2].pick
    const picktext4=celeList[3].pick
    const picktext5=celeList[4].pick
    const picktext6=celeList[5].pick
    const picktext7=celeList[6].pick
    const picktext8=celeList[7].pick
    const picktext9=celeList[8].pick
    const picktext10=celeList[9].pick
    const picktext11=celeList[10].pick
    const picktext12=celeList[11].pick
    const picktext13=celeList[12].pick
    const picktext14=celeList[13].pick
    const picktext15=celeList[14].pick
    const picktext16=celeList[15].pick
    const picktext17=celeList[16].pick
    const picktext18=celeList[17].pick

    
    useEffect(() => {
        getUserId();

        
     },[]);
   
    const nextId = useRef(3); //이후 갯수는 업데이트 필요

    const onCreate = () => {
        const text = 
        {
            id : nextId.current,
            celebrity_name : state[id-1].celebrity_name
            //이미변수명 : state[id-1].이미지변수명
        }
        setState(text);
        nextId.current +=1;
    }

        //해당 얼굴형의 연예인 리스트 상수    
        const celebrityText1=state[0].celebrity_name
        const celebritymainImage1=state[0].profile_photo
        const celebrityText2=state[1].celebrity_name
        const celebritymainImage2=state[1].profile_photo
        const celebrityText3=state[2].celebrity_name
        const celebritymainImage3=state[2].profile_photo
        const celebrityText4=state[3].celebrity_name
        const celebritymainImage4=state[3].profile_photo
        const celebrityText5=state[4].celebrity_name
        const celebritymainImage5=state[4].profile_photo
        //const celebrityText4=state[3].celebrity_name      

        //해당 연예인의 사진 상수
        const celebrityRecommendImage1=celeList[0].photo
        const celebrityRecommendImage2=celeList[1].photo
        const celebrityRecommendImage3=celeList[2].photo
        const celebrityImage1=celeList[3].photo
        const celebrityImage2=celeList[4].photo
        const celebrityImage3=celeList[5].photo
        const celebrityImage4=celeList[6].photo
        const celebrityImage5=celeList[7].photo
        const celebrityImage6=celeList[8].photo
        const celebrityImage7=celeList[9].photo
        const celebrityImage8=celeList[10].photo
        const celebrityImage9=celeList[11].photo
        const celebrityImage10=celeList[12].photo
        const celebrityImage11=celeList[13].photo
        const celebrityImage12=celeList[14].photo
        const celebrityImage13=celeList[15].photo
        const celebrityImage14=celeList[16].photo
        const celebrityImage15=celeList[17].photo
        

    //얼굴형 마다 추천 헤어스타일 정보 가져오기 recommand.js
    let data = recommandEx.data
    const filteredData = data.filter(data => data.type == userfacetype)
    console.log(filteredData)
    const hairDesc=filteredData[0].hairDesc
    const recommandhairText1=filteredData[0].recommandhairText1
    const recommandhairText2=filteredData[0].recommandhairText2
    const recommandhairText3=filteredData[0].recommandhairText3
    const recommandhairImage1=filteredData[0].recommandhairImage1
    const recommandhairImage2=filteredData[0].recommandhairImage2
    const recommandhairImage3=filteredData[0].recommandhairImage3

    
    //user_id 상수취급
    const user_id=1

//외부링크가져오기
const link = () => {
    Linking.openURL("https://www.youtube.com/watch?v=xe0HbOlwmYA&t=168s")
}
return (
        <View style={styles.container}>
            <View style={styles.celebrityListContainer}>
                <ScrollView style={styles.celebrityList} horizontal indicatorStyle={"white"}>
                    <TouchableOpacity style={styles.celebrity1}  
                        onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                params: { celebrity_name:celebrityText1, user_id:ID} 
                                }) 
                                .then(function (response) 
                                {                
                                    console.log(response.data.list)          
                                    setCeleList(response.data.list)            
                                }) 
                                .catch(function (error) { }) 
                                }
                    >
                        <Image style={styles.celebritymainImage} source={{uri:celebritymainImage1}}/>
                        <Text style={styles.celebrityText}>{celebrityText1}</Text>
                    </TouchableOpacity>                        
                    <TouchableOpacity style={styles.celebrity2} 
                        onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                params: { celebrity_name:celebrityText2, user_id:ID } 
                                }) 
                                .then(function (response) 
                                {                
                                    console.log(response.data.list)          
                                    setCeleList(response.data.list)                
                                }) 
                                .catch(function (error) { }) 
                                }>
                        <Image style={styles.celebritymainImage} source={{uri:celebritymainImage2}}/>
                        <Text style={styles.celebrityText}>{celebrityText2}</Text>
                    </TouchableOpacity>                        
                    <TouchableOpacity style={styles.celebrity3}
                        onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                            params: { celebrity_name:celebrityText3, user_id:ID } 
                           }) 
                            .then(function (response) 
                            {                
                                console.log(response.data.list)          
                                setCeleList(response.data.list)                
                            }) 
                            .catch(function (error) { }) 
                            }
                         >
                        <Image style={styles.celebritymainImage} source={{uri:celebritymainImage3}}/>
                        <Text style={styles.celebrityText}>{celebrityText3}</Text>                        
                    </TouchableOpacity>                      
                    <TouchableOpacity style={styles.celebrity3}
                        onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                            params: { celebrity_name:celebrityText4, user_id:ID } 
                           }) 
                            .then(function (response) 
                            {                
                                console.log(response.data.list)          
                                setCeleList(response.data.list)                
                            }) 
                            .catch(function (error) { }) 
                            }
                         >
                        <Image style={styles.celebritymainImage} source={{uri:celebritymainImage4}}/>
                        <Text style={styles.celebrityText}>{celebrityText4}</Text>                        
                    </TouchableOpacity>                                        
                    <TouchableOpacity style={styles.celebrity3}
                        onPress={() =>axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                            params: { celebrity_name:celebrityText5, user_id:ID } 
                           }) 
                            .then(function (response) 
                            {                
                                console.log(response.data.list)          
                                setCeleList(response.data.list)                
                            }) 
                            .catch(function (error) { }) 
                            }
                         >
                        <Image style={styles.celebritymainImage} source={{uri:celebritymainImage5}}/>
                        <Text style={styles.celebrityText}>{celebrityText5}</Text>                        
                    </TouchableOpacity>                                        
                </ScrollView>
            </View>
      
            <View style={styles.ImageListContainer}>
                <ScrollView style={styles.ImageList}>
                    <View style={styles.celebrityRecommendImageContainer}>
                        <View style={styles.celebrityRecommend}>
                            {/*<Image style={styles.celebrityRecommendImage} source={userface}/>*/} 
                            <Image style={styles.celebrityRecommendImage} source={{uri:celebrityRecommendImage1}}/>
                            <View style={{position : "absolute", top: 2, left:2}}>
                                <Icon name="ios-checkmark-done-circle-sharp" size={30} color="purple"/>
                            </View>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                                onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                   celebrity_id: celeList[0].celebrity_id,
                                    user_id: ID
                                    }) 
                                    .then(function (response) 
                                    {                
                                        console.log(response.data.name)
                                         axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                        params: { celebrity_name:response.data.name, user_id:ID } 
                                         }).then(function (res) 
                                         {                
                                             console.log(res.data.list)          
                                             setCeleList(res.data.list)                
                                         }) 
                                        .catch(function (error) { }) 
                                    }) 
                                    .catch(function (error) { })  
                                }
                                }>
                                <Icon
                                    name="ios-heart"
                                    color={picktext1=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrityRecommend}>
                            <Image style={styles.celebrityRecommendImage} source={{uri:celebrityRecommendImage2}}/>
                            <View style={{position : "absolute", top: 2, left:2}}>
                                <Icon name="ios-checkmark-done-circle-sharp" size={30} color="purple"/>
                            </View>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                                onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                    celebrity_id: celeList[1].celebrity_id,
                                    user_id: ID
                                    }) 
                                    .then(function (response) 
                                    {                
                                        console.log(response.data.name)
                                         axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                        params: { celebrity_name:response.data.name, user_id:ID } 
                                         }).then(function (res) 
                                         {                
                                             console.log(res.data.list)          
                                             setCeleList(res.data.list)                
                                         }) 
                                        .catch(function (error) { })           
                                    }) 
                                    .catch(function (error) { }) 
                                    //setPick2(picktext2)
                                }
                                    }
                               >
                                    <Icon
                                        name="ios-heart"
                                        color={picktext2=='true' ? "red":"white"}
                                        size={18}
                                    />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrityRecommend}>
                            <Image style={styles.celebrityRecommendImage} source={{uri:celebrityRecommendImage3}}/>
                            <View style={{position : "absolute", top: 2, left:2}}>
                                <Icon name="ios-checkmark-done-circle-sharp" size={30} color="purple"/>
                            </View>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[2].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })              
                                 }) 
                                 .catch(function (error) { }) 
                            }}
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext3=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.celebrityImageContainer}>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage1}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[3].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })              
                                 }) 
                                 .catch(function (error) { }) 
                                
                                 }}
                                
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext4=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage2}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[4].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                
                                 }) 
                                 .catch(function (error) { })
                                 
                                } }
                                
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext5=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage3}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[5].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                 
                                 }) 
                                 .catch(function (error) { }) 
                                
                                } }
                                
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext6=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.celebrityImageContainer}>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage4}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[6].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })          
                                 }) 
                                 .catch(function (error) { }) 
                                
                                 }}
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext7=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage5}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[7].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                  
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                }}
                                
                                 >
                                  <Icon
                                      name="ios-heart"
                                      color={picktext8=='true' ? "red":"white"}
                                      size={18}
                                  />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage6}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[8].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                  
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                 }}
                                
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext9=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.celebrityImageContainer}>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage7}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[9].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })               
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                } }
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext10=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage8}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[10].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                  
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                }}
                             
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext11=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage9}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[11].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })              
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                 }}
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext12=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.celebrityImageContainer}>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage10}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[12].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })             
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                } }
                                 >
                                <Icon
                                    name="ios-heart"
                                    color={picktext13=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage11}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[13].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })              
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                } }
                                 >
                                <Icon
                                    name="ios-heart"
                                    color={picktext14=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage12}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[14].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })               
                                 }) 
                                 .catch(function (error) { }) 
                                 }}
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext15=='true' ? "red":"white"}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={styles.celebrityImageContainer}>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage13}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[15].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })                 
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                }}
                                   >
                                <Icon
                                    name="ios-heart"
                                    color={picktext16=='true' ? "red":"white"}  
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage14}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[16].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { })             
                                 }) 
                                 .catch(function (error) { }) 
                                
                                 }}
                               >
                                <Icon
                                    name="ios-heart"
                                    color={picktext17=='true' ? "red":"white"}  
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celebrity}>
                            <Image style={styles.celebrityImage} source={{uri:celebrityImage15}}/>
                            <TouchableOpacity style={{position : "absolute", bottom: 5, right:5}}
                            onPress={() =>{axios.post(`https://hairdoctor.owlsogul.com/face/updateFavorite`, {
                                celebrity_id: celeList[17].celebrity_id,
                                 user_id: ID
                                 }) 
                                 .then(function (response) 
                                 {                
                                    console.log(response.data.name)
                                    axios.get(`https://hairdoctor.owlsogul.com/face/getCelebrity`, {
                                   params: { celebrity_name:response.data.name, user_id:ID } 
                                    }).then(function (res) 
                                    {                
                                        console.log(res.data.list)          
                                        setCeleList(res.data.list)                
                                    }) 
                                   .catch(function (error) { }) 
                                 }) 
                                 .catch(function (error) { }) 
                                 
                                 }}
                                 >
                                <Icon
                                    name="ios-heart"
                                    color={picktext18=='true' ? "red":"white"}  
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>         
                </ScrollView>
            </View>


            
                <View style={styles.recommendContainer}>
                    <View style={styles.recommendtitle}>
                        <Image style={styles.recommendtitleIcon} source={recommend}/>
                        <Text style={styles.recommendtitleText}>추천 헤어스타일</Text>
                    </View>
                    <Text style={styles.recommendDescText}>{hairDesc}</Text>
                    <View style={styles.recommendhairstyle}>
                        <View style={styles.recommendhair1}>
                            <Text style={styles.recommendhairText}>{recommandhairText1}</Text>
                            <TouchableOpacity onPress={()=>link()}>
                            <Image style={styles.recommendhairImage} source={{uri:recommandhairImage1}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recommendhair2}>
                            <Text style={styles.recommendhairText}>{recommandhairText2}</Text>
                            <TouchableOpacity onPress={()=>link()}>
                            <Image style={styles.recommendhairImage} source={{uri:recommandhairImage2}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recommendhair3}>
                            <Text style={styles.recommendhairText}>{recommandhairText3}</Text>
                            <TouchableOpacity onPress={()=>link()}>
                            <Image style={styles.recommendhairImage} source={{uri:recommandhairImage3}}/>
                            </TouchableOpacity>
                        </View>
                </View>
                
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    title:{
        marginTop:10,
        marginLeft:10,
        fontSize: 20,
        textAlign: "left",
        color: "#000000"
    },
    //
    celebrityListContainer:{
        flex:0.9,
        
        height: 90,
        backgroundColor: "#c4c4c4"
    },
    celebrityList:{
        marginTop:6,
        marginLeft:5
    },
    celebrity1:{
        width: 87,
        height: 97,
        marginLeft:10
    },
    celebritymainImage:{
        width: 68,
        height: 68,
        alignSelf:"center"
    },
    celebrityText:{
        fontSize: 13,
        textAlign: "center",
        color: "#262626"
    },
    celebrity2:{
        width: 87,
        height: 97,
        marginLeft:10
    },
    celebrity3:{
        width: 87,
        height: 97,
        marginLeft:10
    },
    celebrity4:{
        width: 87,
        height: 97,
        marginLeft:10
    },
    //
    ImageListContainer:{
        flex:3,
        height: 267,
    },
    ImageList:{
        height: 267,
    },
    celebrityRecommendImageContainer:{
        flex:1,
        height: 150,
        flexDirection:"row"
    },
    celebrityRecommend:{
        flex:1,
        height: 150,
    },
    celebrityRecommendImage:{
        width: '100%',
        height: 150
    },
    //
    celebrityImageContainer:{
        flex:1,
        height: 150,
        flexDirection:"row"
    },
    celebrity:{
        flex:1,
        height: 150,
    },
    celebrityImage:{
        width: '100%',
        height: 150,
    },
    //
    recommendContainer:{
        flex:2,
        //height: 186,
        borderColor:"#7705ad",
        borderWidth:3,
        padding:5
    },
    recommendtitle:{
        flexDirection:"row"
    },
    recommendtitleIcon:{
        width: 14,
        height: 14
    },
    recommendtitleText:{
        fontSize: 14,
        fontWeight:"700",
        textAlign: "left",
        color: "#000000"
    },
    recommendDescText:{
        marginLeft:3,
        marginRight:3,
        fontWeight:"500",
        fontSize: 12,
        textAlign: "left",
        color: "#000000"
    },
    recommendhairstyle:{
        alignSelf:"center",
        marginTop:4,
        width: 327,
        height: 96,
        flexDirection:"row"
    },
    recommendhair1:{
        width: 109,
        height: 96,
        
    },
    recommendhairText:{
        fontSize: 13,
        color: "#7705ad",
        marginLeft:17
    },
    recommendhairImage:{
        width: 75,
        height: 75,
        marginLeft:17
    },
    recommendhair2:{
        width: 99,
        height: 96,
    },
    recommendhair3:{
        width: 99,
        height: 96,
        marginLeft:10
    }
});