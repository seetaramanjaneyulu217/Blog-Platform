import { useEffect, useState } from "react"
import postMethodFetch from "../utils/postMethodFetch"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"

const useGetSingleBlog = (blogId, setLoading, likedTheBlog, commentedTheBlog) => {

  const location = useLocation()

  const [blog, setBlog] = useState({})
  const [user, setUser] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {

    if (location.pathname !== `/blog/${blogId}/edit`)
      setLoading(true)

    const response = postMethodFetch('blog/getblogbyid', { blogId })

    response
      .then(data => {
        if (data.msg === 'Error in getting the blog')
          toast.error(data.msg)
        else {
          if (location.pathname !== `/blog/${blogId}/edit`) {
            setLoading(false)
          }
          setBlog(data.msg.blog)
          setUser(data.msg.user)
          setLoggedInUser(data.msg.loggedInUser)
        }
      })
      .catch(error => toast.error('Error'))
      
  }, [likedTheBlog, commentedTheBlog])

  return [blog, user, loggedInUser]
}

export default useGetSingleBlog