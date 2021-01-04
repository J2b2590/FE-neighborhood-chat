export default function manageFavs(state = [] , action) {
    let newFavs = []
    switch (action.type) {
    
        case "ADD_FAVORITE":
            console.log("add Fav")
            return [...state, action.favoriteRoom.room]

        // case "LOGIN":
        //     return [...state, action.user.favorite_rooms]

        case "DELETE_FAVORITE":
            console.log("delete fav")
            
            newFavs = [...state.filter(t => t.id !== action.id)]
            return newFavs


        default:
          return state;
 
      }
}