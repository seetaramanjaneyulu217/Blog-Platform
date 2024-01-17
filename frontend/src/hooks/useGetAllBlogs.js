import { useEffect, useState } from "react"
import getMethodFetch from "../utils/getMethodFetch"
import toast from "react-hot-toast"

const useGetAllBlogs = (deletedBlog, setLoading) => {

  const [allBlogs, setAllBlogs] = useState([])
  
    useEffect(() => {
        setLoading(true)
        const response = getMethodFetch('blog/getallblogs')
        response
        .then(data => {
            if(data.msg === 'Error in getting your blogs')
              toast.error(data.msg)
            else {
              setLoading(false)
              setAllBlogs(data.msg)
            }
        })
        .catch(error => toast.error('Error'))
    }, [deletedBlog])

    return allBlogs
}

export default useGetAllBlogs