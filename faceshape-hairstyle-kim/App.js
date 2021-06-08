import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginPage from './pages/LoginPage';
import CameraPage from './pages/CameraPage';
import FacePage from './pages/FacePage';
import SimulatorPage from './pages/SimulatorPage';
import CommunityPage from './pages/CommunityPage';
import MyPage from './pages/MyPage';
import CelebrityPage from './pages/CelebrityPage';
import CommentwritePage from './pages/CommentwritePage';
import CommentPage from './pages/CommentPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import WriteCamera from './pages/WriteCamera';
import NotificationPage from './pages/NotificationPage';
import CameraWork from './pages/CameraWork';
import SimulCamera from './pages/SimulCamera';

const CameraStack = createStackNavigator();

function CameraStackScreen(){
  return(
    <CameraStack.Navigator>
      <CameraStack.Screen name="얼굴 분석" component={CameraPage}/>
      <CameraStack.Screen name="Camera" component={CameraWork}/>
      <CameraStack.Screen name="FacePage" component={FacePage} options={{ title: '얼굴 분석' }}/>
      <CameraStack.Screen name="CelebrityPage" component={CelebrityPage} options={{ title: '연예인 헤어스타일링' }}/>
    </CameraStack.Navigator>
  )
}


const CommunityStack = createStackNavigator();

function CommunityStackScreen(){
  return(
    <CommunityStack.Navigator>
      <CommunityStack.Screen name="헤닥톡" component={CommunityPage}/>
      <CommunityStack.Screen name="CommentwritePage" component={CommentwritePage} options={{ title: '글쓰기' }}/>
      <CommunityStack.Screen name="WriteCamera" component={WriteCamera} options={{ title: '글쓰기' }}/>
      <CommunityStack.Screen name="CommentPage" component={CommentPage} options={{ title: '헤닥톡' }}/>
    </CommunityStack.Navigator>
  )
}

const MyStack = createStackNavigator();
function MyStackScreen(){
  return(
    <MyStack.Navigator>
      <MyStack.Screen name="My" component={MyPage}/>
      <MyStack.Screen name="ProfilePage" component={ProfilePage} options={{ title: '프로필' }}/>
      <MyStack.Screen name="NotificationPage" component={NotificationPage} options={{ title: '알림' }}/>
    </MyStack.Navigator>
  )
}

const SimulatorStack = createStackNavigator();
function SimulatorStackScreen(){
  return(
    <SimulatorStack.Navigator>
      <SimulatorStack.Screen name="가상체험" component={SimulatorPage}/>
      <CommunityStack.Screen name="SimulCamera" component={SimulCamera} options={{ title: '카메라' }}/>
    </SimulatorStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function HomeTab(){
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '얼굴 분석') {
            iconName = focused
              ? 'ios-happy-sharp'
              : 'ios-happy-outline';
          } else if (route.name === '가상 체험') {
            iconName = focused ? 'ios-eye-sharp'
            : 'ios-eye-outline';
          }else if (route.name === '헤닥톡') {
            iconName = focused ? 'ios-chatbox-ellipses-sharp' : 'ios-chatbox-ellipses-outline';
          }else if (route.name === 'My') {
            iconName = focused ? 'ios-person-sharp' : 'ios-person-outline';
          }

          // 여기에 원하는 컴포넌트를 반환 할 수 있습니다!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#2A0066',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="얼굴 분석" component={CameraStackScreen} />
      <Tab.Screen name="가상 체험" component={SimulatorStackScreen} />
      <Tab.Screen name="헤닥톡" component={CommunityStackScreen} />
      <Tab.Screen name="My" component={MyStackScreen} />
    </Tab.Navigator>

  )
}

const Stack = createStackNavigator();


export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Home" component={HomeTab} />
    </Stack.Navigator>
  </NavigationContainer>
);
}