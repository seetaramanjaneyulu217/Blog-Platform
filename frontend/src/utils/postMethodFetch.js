const postMethodFetch = (route, details) => {

    const token = window.localStorage.getItem("token")

    let response = fetch(`http://localhost:4000/${route}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(details)
    })

    response = response.then(response => response.json())
    return response
}

export default postMethodFetch