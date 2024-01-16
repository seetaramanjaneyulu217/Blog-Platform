const getMethodFetch = (route) => {

    let response = fetch(`http://localhost:4000/${route}`, {
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