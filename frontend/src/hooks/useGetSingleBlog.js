import { useEffect, useState } from "react"
import postMethodFetch from "../utils/postMethodFetch"
import toast from "react-hot-toast"

const useGetSingleBlog = (blogId) => {

    const [blog, setBlog] = useState({})
    
    useEffect(() => {
        const response = postMethodFetch('blog/getblogbyid', { blogId })
        response.then(data => {
            if(data.msg === 'Error in getting the blog')
              toast.error(data.msg)
            else
              setBlog(data.msg)
        })
    }, [])

    return blog
}

export default useGetSingleBlog