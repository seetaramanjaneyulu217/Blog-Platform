import { likedBlog } from "../store/blogSlice"
import postMethodFetch from "./postMethodFetch"
import toast from 'react-hot-toast'

const handleLikeBlog = (blogId, dispatch) => {
  const response = postMethodFetch('blog/likeblog', { blogId })
  response
    .then(data => {
      if (data.msg === 'You have already liked the blog')
        toast.success(data.msg)
      else if (data.msg === 'Like Success') {
        toast.success(data.msg)
        dispatch(likedBlog())
      }
      else
        toast.error(data.error)
    })
    .catch(error => {
      console.log(error)
    })
}

export default handleLikeBlog