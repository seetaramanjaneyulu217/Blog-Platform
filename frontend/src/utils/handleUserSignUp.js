import postMethodFetch from "./postMethodFetch"
import toast from 'react-hot-toast'

const handleUserSignUp = (navigate, isSignUpForm, { username, email, password }) => {
    // if user is trying to signup as a new user then 
    // signup route gets executed else login route gets executed 
    // postMethodFetch is an Function for communicating with signup and login routes
    if (isSignUpForm) {
        const response = postMethodFetch("user/signup", { username, email, password })
        response
            .then(data => {
                if (data.msg === "Registered SuccessFully") {
                    toast.success(data.msg)
                    window.localStorage.setItem('token', data.token)
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                }
                else if (data.msg === "User already present")
                    return toast.error(data.msg)
                else {
                    data.msg.map(error => {
                        toast.error(error)
                    })
                }
            })
            .catch(error => console.log(error))
    }
    else {

        let response = postMethodFetch("user/login", { email, password })
        response
            .then(result => {
                if (result.msg === 'Login SuccessFul') {
                    toast.success(result.msg)
                    window.localStorage.setItem('token', result.token)
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)
                }
                else {
                    console.log(result.msg)
                    toast.error(result.msg)
                }
            })
    }
}

export default handleUserSignUp