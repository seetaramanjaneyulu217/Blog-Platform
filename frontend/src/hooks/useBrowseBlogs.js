import { useEffect, useState } from "react"
import getMethodFetch from "../utils/getMethodFetch"
import toast from "react-hot-toast"

const useBrowseBlogs = () => {
    
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const response = getMethodFetch('blog/browseblogs')
        response
        .then(data => {
            if(data.msg === 'Error in getting the blogs')
              toast.error(data.msg)
            else 
              setBlogs(data.msg)
        })
        .catch()
    }, [])

    return blogs
}

export default useBrowseBlogs