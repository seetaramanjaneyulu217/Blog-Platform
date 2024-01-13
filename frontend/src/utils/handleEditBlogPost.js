import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"

const handleEditBlogPost = (navigate, blogId, { title, aboutBlog, imageurl }) => {

    const response = postMethodFetch('blog/edit', { title, aboutBlog, imageurl, blogId })
    response.then(data => {
        if (data.msg === 'Edit SuccessFul') {
            toast.success(data.msg)
            navigate('/')
        }
        else if (Array.isArray(data.msg)) {
            data.msg.map(error => (
                toast.error(error)
            ))
        }
        else
            toast.error(data.msg)
    })
        .catch(error => {
            console.log(error)
        })
}

export default handleEditBlogPost