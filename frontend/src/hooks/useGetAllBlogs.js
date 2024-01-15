import { useEffect, useState } from "react"
import getMethodFetch from "../utils/getMethodFetch"
import toast from "react-hot-toast"

const useGetAllBlogs = (deletedBlog) => {

  const [allBlogs, setAllBlogs] = useState([])

    useEffect(() => {
        const response = getMethodFetch('blog/getallblogs')
        response
        .then(data => {
            if(data.msg === 'Error in getting your blogs')
              toast.error(data.msg)
            else
              setAllBlogs(data.msg)
        })
        .catch(error => console.log(error))
    }, [deletedBlog])

    return allBlogs
}

export default useGetAllBlogs