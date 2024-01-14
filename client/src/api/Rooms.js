// retriving all rooms data
export const getAllRooms = async () => {
    const response = await fetch('http://localhost:5000/rooms')
    const data = response.json()
    return data
}


// retriving individual room data with id
export const getSingleRoom = async id => {
    const response = await fetch(`http://localhost:5000/room/${id}`)
    const data = response.json()
    return data
}


// api creating rooms for host
export const postRoom = async roomData => {
    const url = 'http://localhost:5000/post-rooms'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(roomData)
    })
    const data = await response.json();
    return data
}