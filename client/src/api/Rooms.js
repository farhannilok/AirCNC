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