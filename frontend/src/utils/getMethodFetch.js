const getMethodFetch = (route) => {

    let response = fetch(`https://blog-app-backend-9a12.onrender.com/${route}`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
        }
    })

    response = response.then(response => response.json())
    return response
}

export default getMethodFetch