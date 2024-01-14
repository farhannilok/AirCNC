
export const saveUser = user => {
    const currentUser = {
        email: user.email
    };
    // send user email to db
    fetch(`http://localhost:5000/users/${user.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
// setting user role
export const becomeHost = email => {
    const currentUser = {
        role: 'host',
    };
    // set a role for the user who wants to become a host
    return fetch(`http://localhost:5000/users/${email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
}

// get user role
export const getRole = async email => {
    const request = await fetch(`http://localhost:5000/users/${email}`)
    const role = await request.json();
    return role;
}