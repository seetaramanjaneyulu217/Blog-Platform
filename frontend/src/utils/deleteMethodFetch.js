const deleteMethodFetch = (route, blogId) => {

    const token = window.localStorage.getItem("token")

    let response = fetch(`http://localhost:4000/${route}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId })
    })

    response = response.then(response => response.json())
    return response
}

export default deleteMethodFetch