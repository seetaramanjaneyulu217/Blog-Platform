import toast from "react-hot-toast"
import deleteMethodFetch from "./deleteMethodFetch"
import { userDeletedBlog } from "../store/userActionsSlice"

const handleDeleteBlog = (blogId, dispatch) => {
    const response = deleteMethodFetch('blog/delete', blogId)
    response.then(data => {
        if(data.msg === 'Deletion SuccessFul') {
            toast.success(data.msg)
            dispatch(userDeletedBlog())
        }
        else if(data.msg === 'Deletion failed')
            toast.error(data.msg)
    })
}

export default handleDeleteBlog