const blogDetailsErrors = (error) => {

    const { title, aboutBlog } = error.errors
    const errors = [title, aboutBlog]

    // if all the fields are valid then return an success message
    if (title === undefined && aboutBlog === undefined)
        return "All details are valid"
    // else return all the errors
    else {
        const filteredErrors = errors.filter(error => error !== undefined)
        const finalErrors = []
        filteredErrors.map(error => finalErrors.push(error.message))
        return finalErrors
    }
}

module.exports = blogDetailsErrors