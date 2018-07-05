import React, { Component } from 'react';
import { View,Image, Text,Button,StyleSheet,TouchableOpacity  } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../Redux/Actions/userinfo' 
import {LOGOUT,LOGIN} from "../Common/Constant"
import {saveState,loadState} from '../../component/Common/Storage';
import emitter from "../Common/EventBus"

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
        return {
            title: "测试",
            headerLeft: (
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View>
                  <Image  
                  source={require('../../Resource/IMG/set.png')}
                    style={styles.setting}/>
                </View>
              </TouchableOpacity>
            )
        } 
  };
 
  componentWillMount() {
    this.checkLogin()
  }
  componentDidMount = () => {
    this.emitter = emitter.addListener(LOGOUT,()=>{
      this.props.navigation.navigate("Login")
    })
  }
  // 组件销毁前移除事件监听
  componentWillUnmount(){
    emitter.removeListener(this.eventEmitter);
  }
  checkLogin(){
    loadState().then((result)=>{
      console.log("本地缓存的redux是")
      console.log(result)
      if(result.userinfo.user_id.length>0){
        this.props.userInfoActions.update(result.userinfo)
      }else{
        this.props.navigation.navigate("Login")
      }
    }).catch(()=>{
    })
  }
  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate("Login")}
        title="登入"
      />
    );
  }
}
const styles = StyleSheet.create({
  setting:{
    width:30,
    height:30,
    marginLeft: 10,    
  }
});

// -------------------redux react 绑定--------------------
function mapStateToProps(state) {
  return {
    name: state.userinfo.name
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
)(Home)


