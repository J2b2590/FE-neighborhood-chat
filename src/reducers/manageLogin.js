export default function manageLogin(state = {
    
}, action) {

    switch (action.type) {
        case "LOGIN":
            return {...action.user.user}

        case "LOGOUT":
            return { }

        case "CHECK_LOGIN":
            return {...action.isLoggedIn}

        default:
          return state;
      }
}