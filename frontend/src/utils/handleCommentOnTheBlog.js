import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"

const handleCommentOnTheBlog = (comment, blogId) => {
    const response = postMethodFetch('blog/commentonblog', { comment: comment.current.value, blogId })
    response
    .then(data => {
        if(data.msg === 'Commented SuccessFully on the blog') {
          toast.success(data.msg)
          comment.current.value = ''
        }
        else
          toast.error(data.msg)
    })
}

export default handleCommentOnTheBlog