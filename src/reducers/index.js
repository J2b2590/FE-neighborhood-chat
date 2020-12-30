import { combineReducers } from 'redux'
import manageLogin from './manageLogin'
import manageRooms from './manageRooms'
import manageFavs from './manageFavs'



export default combineReducers({
  user: manageLogin,
  room: manageRooms,
  favs: manageFavs
  
})