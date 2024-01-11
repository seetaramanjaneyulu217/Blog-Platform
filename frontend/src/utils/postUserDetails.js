const postUserDetails = (route, details) => {
    
    console.log(details);

    fetch(`http://localhost:4000/${route}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(details)
    })
}

export default postUserDetails