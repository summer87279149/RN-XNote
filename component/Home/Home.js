import React, { Component } from 'react';
import { View,Image, ActivityIndicator,Text,Button,StyleSheet,WebView,TouchableOpacity,Dimensions,FlatList  } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../Redux/Actions/userinfo' 
import {LOGOUT,LOGIN} from "../Common/Constant"
import {saveState,loadState} from '../../component/Common/Storage';
import emitter from "../Common/EventBus"
import Toast, {DURATION} from 'react-native-easy-toast'
import {getAllDataThisYear,getThisYear,FormatDate,getCurrentYearMonth,random} from '../Common/TimeHander'
import {getTrainKinds, getTrainDateAndID} from '../Request/api'
var {height,width} =  Dimensions.get('window');

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
        return {
            title: "主页",
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
 constructor(props){
   super(props)
   this.state = {
     counts:0,
     canshow:false,
     train_kinds_arr:[],
   }
 }

  componentDidMount = () => {
    this.emitter = emitter.addListener(LOGOUT,()=>{
      this.props.navigation.navigate("Login")
    })
    this.checkLogin()
  }
  request = (userid)=>{
    getTrainKinds(userid).then(res => {
      console.log(this.props.userinfo.user_id)  
      console.log(res)
      if (res.code == 200) {
        let arr = []
        let dataCounts = res.data.length
        for (let obj of res.data) {
          getTrainDateAndID(this.props.userinfo.user_id, obj.train_kind).then(res => {
            let timeArr = []
            let a;
            for (let obj2 of res.data) {
              a = [FormatDate(obj2.cteate_time), 1]
              timeArr.push(a)
            }
            obj.train_days = timeArr
            this.setState({
              counts:this.state.counts+1
            })
            if (this.state.counts == dataCounts) {
              this.setState({
                canshow : true
              })
            }
          })
          switch (obj.train_kind) { 
            case 0:
              obj.name = "胸部训练"
              break;
            case 1:
              obj.name = "背部训练"
              break;
            case 2:
              obj.name = "腿部训练"
              break;
            case 3:
              obj.name = "腰腹训练"
              break;
            case 4:
              obj.name = "肩臂训练"
              break;
            case 5:
              obj.name = "有氧运动"
              break;
            default:
              obj.name = "未知运动"
              break;
          }
          arr.push(obj)
        }
        // console.log("train_kinds_arr是:",arr)
        this.setState({
          train_kinds_arr:arr,
        })
        
      } 
    }).catch((err) => {
      this.refs.toast.show('网络错误');
    });
  }
 
  checkLogin(){
    loadState().then((result)=>{
      console.log("本地缓存的redux是")
      console.log(result)
      if(result.userinfo.user_id.length>0){
        this.props.userInfoActions.update(result.userinfo)
        this.request(result.userinfo.user_id)
      }else{
        this.props.navigation.navigate("Login")
      }
    }).catch(()=>{
    })
  }
  
  getOptions = (index) => {
    let dateList = getAllDataThisYear()
    let lunarData = [];
    for (let i = 0; i < dateList.length; i++) {
      lunarData.push([
        dateList[i],
        dateList[i].substr(dateList[i].length-2,2)
      ]);
    }
    console.log('lunarData==',lunarData);
    
    if (!this.state.train_kinds_arr.length > 0) {
      return
    }
    // console.log('index=',index);
    // console.log('this.state.train_kinds_arr=',this.state.train_kinds_arr);
    let bar = {
      title: {
        text: "本月" + this.state.train_kinds_arr[index].name + '记录图',
        textStyle: {
          fontSize: 15,
        }
      },
      tooltip: {},
      visualMap: {
        type: "piecewise",
        show: true,
        pieces: [{
            gt: 2,
            label: '休息日',
            color: "#eef"
          },
          {
            value: 1,
            label: '训练日',
            color: "lightskyblue"
          },
        ],
      },
      calendar: {
        range: getCurrentYearMonth(),
        orient: 'vertical',
        dayLabel: {
          // nameMap: 'cn',
          show:true
        },
        monthLabel: {
          nameMap: 'cn'
        },
        
        yearLabel: {
          show: false
        },
        width: width*0.6,
        height: "180"
      },
      series: [{
        type: 'scatter', //
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              let d = new Date(params.value[0]);
              return d.getDate();
            },
            textStyle: {
              color: '#aaa'
            }
          }
        },
        data: lunarData
      }, {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.state.train_kinds_arr[index].train_days,
        tooltip: {
          formatter: function (params) {
            return params.value[0];
          },
        }
      }]
    }
    console.log("bar")
    console.log(bar)
    return bar
  }
  postMessage = (index) => {
    console.log("index=",index);
      let jsonValue = JSON.stringify(this.getOptions(index))
      if (this.refs["webview"+index]) {//用"webview"+index的方式区别每个WebView组件
        this.refs["webview"+index].postMessage(jsonValue);
      }else{
        setTimeout(() => {
          // alert(index)
          // console.log('this.refs=',this.refs);
          console.log('jsonValue=',JSON.parse(jsonValue).title);
          console.log('this.refs["webview"+index]',this.refs["webview"+index]);
          

          this.refs["webview"+index].postMessage(jsonValue);
          
        }, 500);
      }

  }
  render() {

    makeCharts = (item,index)=>{
      return (  <View style={styles.cell} key={index}>
          <View style={styles.cellTitle}>
              <Text style={styles.cellLeft}>{item.name}
              </Text>
            <TouchableOpacity onPress = {()=>{
              // this.webview.postMessage('"Hello" 我是RN发送过来的数据');
            }}>
              <Text style={styles.cellRight}>
                查看详情 >
              </Text> 
            </TouchableOpacity>
          </View>
          <WebView
            // scrollEnabled={false}
            scalesPageToFit= {false}
            javaScriptEnabled = {true}
            ref={(webview)=>{this.refs["webview"+index] = webview}}
            style={{
              height: 250,
              width:width,
            }}
            source={require('./Charts.html')}
            onLoadingFinish={this.postMessage(index)}
          />
        </View>
      )
    }
    return (
      <View>
      <Toast position='center' ref="toast"/>
        {this.state.train_kinds_arr.length>0&&this.state.canshow
        ?
        <FlatList
          keyExtractor={(item,index)=>item.name}
          data={this.state.train_kinds_arr}
          renderItem={({item,index}) => makeCharts(item,index)}
        />
        :
        <ActivityIndicator color="blue"></ActivityIndicator>
        }
      </View>
      
    );
  }
   // 组件销毁前移除事件监听
   componentWillUnmount(){
    emitter.removeListener(this.eventEmitter);
  }
}
const styles = StyleSheet.create({
  setting:{
    width:30,
    height:30,
    marginLeft: 10,  
      
  },
  cell:{
    height:300,
    width:width,
  },
  cellTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:25,
  },
  cellLeft:{
    marginLeft: 10,
  },
  cellRight:{
   marginRight:10
  }
});

// -------------------redux --------------------
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
)(Home)


