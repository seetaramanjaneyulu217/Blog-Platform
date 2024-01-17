const deleteMethodFetch = (route, blogId) => {

    let response = fetch(`https://blog-app-backend-9a12.onrender.com/${route}`, {
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