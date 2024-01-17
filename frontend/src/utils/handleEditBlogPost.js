import toast from "react-hot-toast"
import putMethodFetch from "./putMethodFetch"

const handleEditBlogPost = (navigate, setLoading, blogId, { title, aboutBlog, imageurl }) => {

    const response = putMethodFetch('blog/edit', { title, aboutBlog, imageurl, blogId })
    response.then(data => {
        if (data.msg === 'Edit SuccessFul') {
            toast.success(data.msg)
            navigate('/your-blogs')
        }
        
        else if(data.msg === 'Edit failed')
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
        })
}

export default handleEditBlogPost