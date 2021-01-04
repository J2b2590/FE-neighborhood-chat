export const addRoom = room => {
    return{
        type: 'ADD_ROOM',
        room
    }
}

export const popRooms = rooms =>{
    return{
        type: 'ALL_ROOMS',
        rooms
    }
}

export const currentRoom = roomId => {
    return{
        type: 'CURRENT_ROOM',
        roomId
    }
}

export const currentUserInRoom = currentUser => {
    return{
        type: "CURRENT_USER",
        currentUser
    }
}


export const addFavorite = favoriteRoom => {
    return{ 
        type: "ADD_FAVORITE",
        favoriteRoom
    }
}

export const deleteFavorite = id =>{
    return{
        type: "DELETE_FAVORITE",
        id: id.room.id
    }
}

