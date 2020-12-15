// import { deleteNote } from "../actions/notes"

export default function manageRooms(state = [] , action) {
    // let deleteNote;
    switch (action.type) {
        
        case "ADD_ROOM":
            return [...state, action.room]

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