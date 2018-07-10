import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,Dimensions,BVLinearGradient,ActivityIndicator,LayoutAnimation,UIManager,TouchableOpacity  } from 'react-native';
import  LinearGradient  from 'react-native-linear-gradient'
import Svg,{ Path } from 'react-native-svg'
import FadeInView from '../Common/Animate';
import Toast, {DURATION} from 'react-native-easy-toast'
import { login,regist } from "../Request/api";
import md5 from "react-native-md5";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../Redux/Actions/userinfo' 
var {height,width} =  Dimensions.get('window');

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      registBtnTitle:"   注册一个",
      loginTitle:"登  入",
      isRegistStatus:false,
      loginBtnClicked:true,
      isLoginMode:true,
      username:"",
      password:"",
      password2:"",
    }
  }
  loginBtnClicked  = () => {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if(!uPattern.test(this.state.username)){
      this.refs.toast.show('账号应为4~16位字母或数字');
      return
    }
    let psw = md5.hex_md5( this.state.password );
    console.log("加密后的密码是:",psw);
    if(this.state.isLoginMode){
      login(this.state.username,this.state.password).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.refs.toast.show(res.msg);
          // save user_id
          const actions = this.props.userInfoActions
          let userinfo = this.props.userinfo
          userinfo.user_id= res.user_id
          actions.update(userinfo)
        } else {
          this.refs.toast.show("登入失败");
        }
        setTimeout(() => {
          this.closeLoading()
          this.props.navigation.goBack();
        }, 1000);
      }).catch((err)=>{
        this.refs.toast.show(err);
      })
    }else{
      if(this.state.password!=this.state.password2){
        this.refs.toast.show('两次密码不一致');
        return
      }
      regist(this.state.username,this.state.password).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.refs.toast.show(res.msg);
        } else {
          this.refs.toast.show("注册失败");
        }
        setTimeout(() => {
          this.closeLoading()
        }, 1000);
      })
    }
    this.showLoading()
  };
  showLoading(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      loginBtnClicked:false
    });
  }
  closeLoading(){
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  this.setState({
    loginBtnClicked:true
  });
  }
  registBtnClicked = ()=>{
    this.setState({
      isLoginMode:!this.state.isLoginMode
    })
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        isRegistStatus:!this.state.isRegistStatus,
        registBtnTitle:!this.state.isRegistStatus == true?"   立刻登入":"   注册一个",
        loginTitle:!this.state.isRegistStatus == true?"注  册":"登  入"
      });
    
  }
  render() {
    return (
      <LinearGradient colors={["rgba(255,255,253,0)","rgba(78,78,78,.49)"]} style={styles.layout}>
        <View style={styles.layout} >
        <Toast position='center' ref="toast"/>
          <Text style ={styles.title}> XNote </Text>
          <View style={styles.accountArea}>
            <View style ={styles.account}>
              <Svg height="20" width="20">
                    <Path stroke="white" strokeWidth="1" fill="transparent" d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"/>
              </Svg>
             <TextInput
              style={styles.inputInfo}
              onChangeText={(text) => this.setState({username:text})}                                                                        
              placeholder="username"/>
              <View style={styles.line}></View>
            </View>
            <View style ={styles.account}>
              <Svg height="20" width="20">
                <Path stroke="white" strokeWidth="1" fill="transparent" d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"/>
              </Svg>
             <TextInput
              style={styles.inputInfo}
              onChangeText={(text) => this.setState({password:text})}    
              secureTextEntry={true}                                                                     
              placeholder="password"/>
            </View>
            {this.state.isRegistStatus
            ?
            <FadeInView>
            <View style ={styles.account}>
              <Svg height="20" width="20">          
                <Path stroke="white" strokeWidth="1" fill="transparent" d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"/>
              </Svg>
             <TextInput
              style={styles.inputInfo}
              onChangeText={(text) => this.setState({password2:text})}                                                                        
              placeholder="password"
              secureTextEntry={true} 
              /> 
            </View></FadeInView>:<View></View>}
          </View>
          <View style={styles.loginArea}>
          {this.state.loginBtnClicked
          ?
             <TouchableOpacity onPress={this.loginBtnClicked} ref="loginBtn">
                <View style={styles.loginBtn} >
                <Text style={styles.loginBtnText} >{this.state.loginTitle}</Text>
                </View>
             </TouchableOpacity>
          :
             <TouchableOpacity >
                <View style={styles.loginBtnMini} >
                <ActivityIndicator color="white"></ActivityIndicator>
                </View>
             </TouchableOpacity>}
          
            <Text style={{alignSelf:'center'}}>
              <Text  style={{color:"white"}} >没有账号?</Text>
              <Text style={styles.registTitle} onPress={this.registBtnClicked}>{this.state.registBtnTitle}</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>

    );
  }
}
const styles = StyleSheet.create({

  layout: {
    ...{height,width},
    justifyContent: 'space-between',
    alignItems:"center",
  },
  accountArea:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:"space-around",
    width:width,
  },
  account:{
    flexDirection: 'row',
    alignItems: 'center',
    width:width*0.8,
    margin:"auto",
    alignSelf:"center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor:"hsla(0,0%,100%,.2)"
  },

  title:{
    width:width*0.8,
    fontSize: 100,
    fontWeight: 'bold',
    color:"#2c3e50",
    top:80
  },
  inputInfo: {
    height: 40,
    width:width*0.6,
    color:"gray",
    marginLeft: 20,
  },
  loginArea:{
    bottom:20
  },
  
  loginBtn:{
    width: width*0.8,
    height: 44,
    backgroundColor:"#f36",
    borderRadius: 25,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
  },
  loginBtnMini:{
    width: 44,
    height: 44,
    backgroundColor:"#f36",
    borderRadius: 25,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
    alignSelf:"center"
  },
  loginBtnText:{
    fontSize: 20,
    color:"white"
  },
  loginBtnTextMini:{
    fontSize: 12,
    color:"white"
  },
  registTitle:{
    color:"#f36",
  }
});
// -------------------redux   react 绑定--------------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
      userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
