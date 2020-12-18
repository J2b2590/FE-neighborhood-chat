// import { deleteNote } from "../actions/notes"

import { currentRoom } from "../actions/room";

export default function manageRooms(state = [] , action) {
    let currentRoom;
    switch (action.type) {
        
        case "ADD_ROOM":
            return [...state, action.room]

        case "ALL_ROOMS":
            return [action.rooms]

        case "CURRENT_ROOM":
                currentRoom = state.filter(room => room.id === action.roomId)
                return currentRoom

        case "CURRENT_USER":
            debugger
            return [action.currentUser]

        // case "LOGIN":
        //     return action.user.notes

        // case "DELETE_NOTE":
        //     // debugger
        //     deleteNote = state.filter(note => note.id !== action.noteId)
        //     return deleteNote

        // case "EDITED_NOTE":
        //     return [...state, action.note]
        
        default:
          return state;

        

          
      }
}