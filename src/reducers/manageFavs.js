export default function manageFavs(state = [] , action) {
    
    switch (action.type) {
    
        case "ADD_FAVORITE":
            console.log("add Fav")
            return [...state, action.favoriteRoom.room]

        default:
          return state;
 
      }
}