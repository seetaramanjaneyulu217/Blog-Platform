import React from 'react'
import useGetAllBlogs from '../hooks/useGetAllBlogs'

const GetAllBlogs = () => {

    const allBlogs = useGetAllBlogs()
    console.log(allBlogs)

  return (
    <div>GetAllBlogs</div>
  )
}

export default GetAllBlogs