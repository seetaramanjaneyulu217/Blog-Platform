const getMethodFetch = (route) => {

    const token = window.localStorage.getItem("token")

    let response = fetch(`http://localhost:4000/${route}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    response = response.then(response => response.json())
    return response
}

export default getMethodFetch