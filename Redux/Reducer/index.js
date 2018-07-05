import { combineReducers } from 'redux'
import userinfo from './userinfo'
import otherinfo from './otherinfo'

export default combineReducers({
    userinfo,
    otherinfo
})