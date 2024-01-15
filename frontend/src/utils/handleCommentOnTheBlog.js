import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"

const handleCommentOnTheBlog = (comment, blogId, setState) => {
  const response = postMethodFetch('blog/commentonblog', { comment, blogId })
  response
    .then(data => {
      if (data.msg === 'Fill the comment field')
        toast.error(data.msg)
      else if (data.msg === 'Commented SuccessFully on the blog') {
        toast.success(data.msg)
        setState(prev => !prev)
      }
      else
        toast.error(data.msg)
    })
}

export default handleCommentOnTheBlog