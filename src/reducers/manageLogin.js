export default function manageLogin(state = {
    
}, action) {

    switch (action.type) {
        
        case "LOGIN":
            return {...action.user.user}

        case "LOGOUT":
            return { }

        case "CHECK_LOGIN":
            return {...action.isLoggedIn}

        case "ADD_FAVORITE":
            console.log("add Fav")    
            return {...action.favoriteRoom.user}

        case "UPDATE_FAVORITE":
            return {...action.updateFavorite.user}

        default:
          return state;
      }
}