import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"

const handleBlogPost = (navigate, { title, aboutBlog, imageurl }) => {

    const response = postMethodFetch('blog/create', { title, aboutBlog, imageurl })
    response.then(data => {
        if (data.msg === 'Published SuccessFully') {
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

export default handleBlogPost