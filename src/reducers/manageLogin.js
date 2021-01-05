export default function manageLogin(state = {
    
}, action) {
    let newFavs = []
    switch (action.type) {
        
        case "LOGIN":
            return {...action.user.user}

        case "LOGOUT":
            return { }

        case "CHECK_LOGIN":
            return {...action.isLoggedIn}

        case "ADD_FAVORITE":
            // console.log("add Fav")     
            return {
                ...state,
                favorites: [...state.favorites, action.favoriteRoom]
                }

        case "DELETE_FAVORITE":
            console.log("delete fav")
            
            newFavs = state.favorites.filter(f => f.id !== action.id)
            return {
                ...state,
                favorites: newFavs
            }


        case "UPDATE_FAVORITE":
            return {...action.updateFavorites.user}

        default:
          return state;
      }
}