import { combineReducers } from 'redux'
import manageLogin from './manageLogin'


export default combineReducers({
  user: manageLogin
  
})