import { combineReducers } from 'redux'
import manageLogin from './manageLogin'
import manageRooms from './manageRooms'


export default combineReducers({
  user: manageLogin,
  room: manageRooms
  
})