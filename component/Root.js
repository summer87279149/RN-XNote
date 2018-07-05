// root就是对App组件包装个redux
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../Redux/Store/configureStore';
import {saveState,loadState} from './Common/Storage';
import App from './App';
import EventBus from "./Common/EventBus"
import {LOGOUT} from "./Common/Constant"
var store  = configureStore();
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
  if(!state.userinfo.user_id.length>0){
    EventBus.emit(LOGOUT)
  }
})


export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

