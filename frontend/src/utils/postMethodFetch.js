const postMethodFetch = (route, details) => {

    let response = fetch(`https://blog-app-backend-9a12.onrender.com/${route}`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(details)
    })

    response = response.then(response => response.json())
    return response
}

export default postMethodFetch