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

