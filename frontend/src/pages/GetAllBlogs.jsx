import React from 'react'
import useGetAllBlogs from '../hooks/useGetAllBlogs'
import BlogCard from '../components/BlogCard'

const GetAllBlogs = () => {

    const allBlogs = useGetAllBlogs()

  return (
    <div className='flex flex-col gap-y-3 mt-20'>
        {
            allBlogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
            ))
        }
    </div>
  )
}

export default GetAllBlogs