import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"

const handleBlogPost = (navigate, setLoading, { title, aboutBlog, imageurl }) => {

    const response = postMethodFetch('blog/create', { title, aboutBlog, imageurl })
    response.then(data => {
        if (data.msg === 'Published SuccessFully') {
            toast.success(data.msg)
            navigate('/your-blogs')
        }
        else if (data.msg === 'Publishing the blog failed')
            toast.error(data.msg)
        else if (Array.isArray(data.msg)) {
            data.msg.map(error => (
                toast.error(error)
            ))
        }
        else
            toast.error(data.msg)

        setLoading(false)
    })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
}

export default handleBlogPost