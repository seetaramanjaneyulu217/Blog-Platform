import { useEffect, useState } from "react"
import getMethodFetch from "../utils/getMethodFetch"
import toast from "react-hot-toast"

const useBrowseBlogs = (setLoading) => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    setLoading(true)
    const response = getMethodFetch('blog/browseblogs')
    response
      .then(data => {
        if (data.msg === 'Error in getting the blogs')
          toast.error(data.msg)
        else {
          setLoading(false)
          setBlogs(data.msg)
        }
      })
      .catch(error => toast.error('Error'))
  }, [])

  return blogs
}

export default useBrowseBlogs