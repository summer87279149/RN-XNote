import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Button,Dimensions,ScrollView ,SafeAreaView} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../Redux/Actions/userinfo' 
var {height,width} =  Dimensions.get('window');
class Drawer extends React.Component {
   logOut = ()=>{
      let action = this.props.userinfo;
      action.user_id = "";
      this.props.navigation.toggleDrawer()
      this.props.userInfoActions.update(action)
    }
    render() {
      return (
        <ScrollView >  
          <SafeAreaView   forceInset={{ top: 'always', horizontal: 'never' }}>  
          <View>
            {/* <DrawerItems {...props} />   */}
            {/* <Text    >用户:{this.props.userinfo.user_id}</Text> */}
            <View style = {styles.tableViewCell}>
              <Button   title="动作管理" onPress={()=>{console.log(this.props)}}></Button>
            </View>
            <View style = {styles.tableViewCell}>
              <Button   title="反馈问题" onPress={()=>{console.log(this.props)}}></Button>
            </View>
            <View style = {styles.tableViewCell}>
              <Button   color="#841584"  title="退出登入" onPress={this.logOut}></Button>
            </View>
            </View>
          </SafeAreaView>  
        </ScrollView> 
      );
    }
  }
  
  const styles = StyleSheet.create({

    tableViewCell:{
      flexDirection: 'row',
      justifyContent: 'center',
      width:width/2,
      marginTop: 15,
      borderBottomWidth: 0.3,
      borderBottomColor:"#d3d3d3",
    },
  });

  // -------------------redux react 绑定--------------------

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
)(Drawer)



