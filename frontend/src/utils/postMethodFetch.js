const postMethodFetch = (route, details) => {

    let response = fetch(`http://localhost:4000/${route}`, {
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