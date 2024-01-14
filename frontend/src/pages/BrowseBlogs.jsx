import React from 'react'
import useBrowseBlogs from '../hooks/useBrowseBlogs'
import BlogCard from '../components/BlogCard'

const BrowseBlogs = () => {

    const blogs = useBrowseBlogs()

  return (
    <div className='flex flex-col gap-y-3 mt-20'>
        {
            blogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
            ))
        }
    </div>
  )
}

export default BrowseBlogs