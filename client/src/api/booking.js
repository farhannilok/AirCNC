// API for booking rooms

export const addBooking = async bookingData => {
    const url = 'http://localhost:5000/bookings'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({bookingData})
    })
    const data = await response.json();
    return data
}

// Update room status
export const updateStatus = async (id, status) => {
    const url = `http://localhost:5000/rooms/status/${id}`
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status})
    })
    const data = await response.json();
    return data
}

// get booking data 
export const getMyBooking = async (email) => {
    const response = await fetch(`http://localhost:5000/bookings?email=${email}`)
    const data = await response.json()
    return data;
}

// delete booking
export const cancelBooking = async id => {
    const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'DELETE',
        headers:{
            'content-type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
}