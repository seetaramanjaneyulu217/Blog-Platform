const userDetailsErrors = (error) => {
    
    // this if statement is for checking for the duplicate user.
    if(error.code === 11000) return "User already present"
    // this else statement is for checking the validation of the user data
    else {
        const { username, email, password } = error.errors
        const errors = [username, email, password]

        // if all the fields are valid then return an success message
        if(username === undefined && email === undefined && password === undefined)
           return "All details are valid"
        // else return all the errors
        else {
            const filteredErrors = errors.filter(error => error !== undefined)
            const finalErrors = []
            filteredErrors.map(error => finalErrors.push(error.message))
            return finalErrors
        }
    }
}

module.exports = userDetailsErrors