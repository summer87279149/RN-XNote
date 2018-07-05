import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
} from 'react-native';
var {height,width} =  Dimensions.get('window');
export default class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right:new Animated.Value(-width),
    };
    
  }
  componentDidMount() {
    Animated.spring(                            // 随时间变化而执行的动画类型
      this.state.right,                      // 动画中的变量值
      {
        toValue: 0,                             // 透明度最终变为1，即完全不透明
      }
    ).start();                                  // 开始执行动画
  }

  
  render() {
    return (
      <Animated.View                            // 可动画化的视图组件
        style={{
          ...this.props.style,
          right:this.state.right
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}