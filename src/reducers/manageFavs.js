export default function manageFavs(state = [] , action) {
    let newFavs = []
    switch (action.type) {
    

        case "DELETE_FAVORITE":
            console.log("delete fav")
          
            newFavs = [...state.filter(f => f.id !== action.id)]
            return newFavs

        default:
          return state;
 
      }
}
