import React,{useEffect,useRef,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import commentwrite from "../images/commentwrite.png"
import Loading from '../components/LoadingPage';
import CommunityCard from '../components/CommunityCard';
//원래 서버에서 받아오는 데이터를 json형식으로 예로 듬
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


export default function CommunityPage({navigation,route}) {
    //커뮤니티 글들을 저장하고 있을 상태
    const [state, setState] = useState([
       
    ])
    //얼굴형 카테고리에 따라 다른 커뮤니티 글들을 저장하고 있을 상태
    const [cateState,setCateState] = useState([])
    //준비 상태
    const [ready,setReady] = useState(true)
 
    const communityData = async() =>{
        const response = await axios.get('https://hairdoctor.owlsogul.com/community/showAllList')
        setState(response.data.data)
        console.log(response.data.data)
        setCateState(response.data.data)
    }

//컨텐츠 새로고침,데이터 갱신
const isFocused = useIsFocused()

    useEffect(()=>{
        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(()=>{
            if (isFocused) {
            communityData();
              setReady(false)
              reload()
            }
        },1000)
      },[isFocused])

      const category = (cate) => {
        if(cate == "전체보기"){
            //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
            setCateState(state)
        }else{
            setCateState(state.filter((d)=>{
            return d.category == cate
            }))
        }
        
    }

    const reload = () =>{ 
        axios.get('https://hairdoctor.owlsogul.com/community/showAllList').then(function (response) {
        setState(response.data.data)
        console.log(response.data.data)
        setCateState(response.data.data)})
    }

    return ready ? <Loading/> : (
    <View style={styles.container}>
        <View style={styles.communityContainer}>
            <View style={styles.faceshapeButtonC}>
            <ScrollView style={styles.faceshapeButton} horizontal indicatorStyle={"white"}>
                <TouchableOpacity style={styles.allButton} onPress={()=>{category('전체보기')}}><Text style={styles.allText}>전체보기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.eggButton} onPress={()=>{category('egg')}}><Text style={styles.eggText}>계란형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.diamondButton} onPress={()=>{category('diamond')}}><Text style={styles.diamondText}>마름모형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.heartButton} onPress={()=>{category('heart')}}><Text style={styles.heartText}>하트형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.peanutButton} onPress={()=>{category('peanut')}}><Text style={styles.peanutText}>땅콩형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.circleButton} onPress={()=>{category('circle')}}><Text style={styles.circleText}>둥근형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.sixButton} onPress={()=>{category('six')}}><Text style={styles.sixText}>육각형</Text></TouchableOpacity>
            </ScrollView>
            </View>


            <ScrollView style={styles.communityCard}>  
                <View style={styles.communityCardContainer}>   
                {/* 하나의 카드 영역을 나타내는 View */}     
                    {
                    cateState.map((content,i)=>{
                        return (<CommunityCard content={content} key={i} reload={reload} navigation={navigation}/>)
                    })
                    }
                </View> 
                
            </ScrollView>

            <TouchableOpacity style={{position : "absolute", right: 30, bottom: 30}} onPress={() => navigation.navigate('CommentwritePage')}>
                <View style={styles.commentWrite}>
                <Image style={styles.commentWriteIcon} source={commentwrite}/>
                </View>
                <Text style={styles.commentWriteText}>글쓰기</Text>          
            </TouchableOpacity>
        </View>

        
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
       
    },
    communityContainer:{
        flex:10
    },
    
    title:{
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "left",
        color: "#000000",
        marginLeft:20
    },
    faceshapeButtonC:{        
        
        height: 37,
    },
    faceshapeButton:{
        backgroundColor: "#8f8f8f"
    },
    allButton:{
        width: 72,
        height: 25,
    },
    allText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    eggButton:{
        width: 72,
        height: 25,
    },
    eggText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    diamondButton:{
        width: 72,
        height: 25,
    },
    diamondText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    heartButton:{
        width: 72,
        height: 25,
    },
    heartText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    peanutButton:{
        width: 72,
        height: 25,
    },
    peanutText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    circleButton:{
        width: 72,
        height: 25,
    },
    circleText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    sixButton:{
        width: 72,
        height: 25,
    },
    sixText:{
        fontSize: 12,
        color: "#ffffff",
        textAlign:"center",
        marginTop:7
    },
    communityCard:{
        
        height: 480,
        backgroundColor: "#ffffff",
    },
    communityCardContainer:{
        borderBottomColor:"#8f8f8f",
        borderBottomWidth:3
    },
    
    //글쓰기 버튼
    commentWrite:{
        width: 40,
        height: 40,
        borderRadius:40,
        backgroundColor: "#c4c4c4"
    },
    commentWriteIcon:{
        marginTop:8,
        marginLeft:7,
        width: 25,
        height: 25,
    },
    commentWriteText:{
        marginLeft:6,
        fontSize: 11,
        color: "#000000"
    },
    
});
