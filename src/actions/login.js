export const login = user => {
    
    return{
        type: 'LOGIN',
        user
    }
}

export const logOut = user => {
    // window.localStorage.removeItem("token")
    return{
        type: 'LOGOUT',
        user
    }
}

export const autoLogin = isLoggedIn => {

    return{
        type: 'CHECK_LOGIN',
        isLoggedIn
    }
}
