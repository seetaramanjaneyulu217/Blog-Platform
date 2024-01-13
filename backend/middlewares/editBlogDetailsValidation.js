const editBlogDetailsValidation = (req, res, next) => {
    const { title, aboutBlog } = req.body

    if(title === '' || aboutBlog === '')
        res.json({ msg: "Fill the details completely" })
    else
        next()
}

module.exports = editBlogDetailsValidation