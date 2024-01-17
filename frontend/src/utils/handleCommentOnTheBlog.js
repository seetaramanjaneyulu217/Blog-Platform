import toast from "react-hot-toast"
import postMethodFetch from "./postMethodFetch"
import { commentedBlog } from "../store/blogSlice"

const handleCommentOnTheBlog = (comment, setLoading, blogId, dispatch) => {
  setLoading(true)
  const response = postMethodFetch('blog/commentonblog', { comment, blogId })
  response
    .then(data => {
      if (data.msg === 'Fill the comment field')
        toast.error(data.msg)
      else if (data.msg === 'Commented SuccessFully on the blog') {
        toast.success(data.msg)
        dispatch(commentedBlog())
      }
      else
        toast.error(data.msg)

      setLoading(false)
    })
    .catch(error => {
      toast.error('Error')
    })
}

export default handleCommentOnTheBlog