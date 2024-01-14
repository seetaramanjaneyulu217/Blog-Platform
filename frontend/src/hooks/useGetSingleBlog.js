import { useEffect, useState } from "react"
import postMethodFetch from "../utils/postMethodFetch"
import toast from "react-hot-toast"

const useGetSingleBlog = (blogId) => {

    const [blog, setBlog] = useState({})
    const [user, setUser] = useState({})
    const [loggedInUser, setLoggedInUser] = useState({})
    
    useEffect(() => {
        const response = postMethodFetch('blog/getblogbyid', { blogId })
        response.then(data => {
            if(data.msg === 'Error in getting the blog')
              toast.error(data.msg)
            else {
              setBlog(data.msg.blog)
              setUser(data.msg.user)
              setLoggedInUser(data.msg.loggedInUser)
            }
        })
    }, [])

    return [blog, user, loggedInUser]
}

export default useGetSingleBlog