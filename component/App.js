/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {Text,Dimensions,} from 'react-native';
import { createStackNavigator,createDrawerNavigator  } from 'react-navigation';
import Home from './Home/Home.js'
import Drawer from './Drawer/Drawer'
import Login from './Login/Login'
var {height,width} =  Dimensions.get('window');

const HomeStack = createStackNavigator({
  Home: {
    screen:Home,
    navigationOptions: ({ navigation }) => ({
       headerStyle:{//导航栏样式
         backgroundColor:'#1296db'
       }, 
       headerTitle:<Text style={{color:'white',fontSize:18}}>测试</Text>,//导航栏标题
    }),
  },
});
//Mainstack = HomeStack + modal页
const MainStack = createStackNavigator({
  Home:{
    screen:HomeStack
  },
  Login:{
    screen:Login
  },
}, 
{
  mode: 'modal',
  headerMode: 'none',
})


// MyApp = Mainstack + Drawer
const MyApp = createDrawerNavigator({
  MainStack: {
    screen: MainStack,
  },
},{
  drawerWidth:width/2,
  contentComponent:Drawer//
});

export default MyApp



