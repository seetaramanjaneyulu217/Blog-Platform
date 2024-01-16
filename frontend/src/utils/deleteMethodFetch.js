const deleteMethodFetch = (route, blogId) => {

    let response = fetch(`http://localhost:4000/${route}`, {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ blogId })
    })

    response = response.then(response => response.json())
    return response
}

export default deleteMethodFetch