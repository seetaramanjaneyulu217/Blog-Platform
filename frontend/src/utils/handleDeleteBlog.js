import toast from "react-hot-toast"
import deleteMethodFetch from "./deleteMethodFetch"

const handleDeleteBlog = (blogId) => {
    console.log(blogId)
    const response = deleteMethodFetch('blog/delete', blogId)
    response.then(data => {
        if(data.msg === 'Deletion SuccessFul') {
            toast.success(data.msg)
        }
        else if(data.msg === 'Deletion failed')
            toast.error(data.msg)
    })
}

export default handleDeleteBlog