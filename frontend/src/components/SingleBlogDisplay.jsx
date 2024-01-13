import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'

const SingleBlogDisplay = () => {

    const { blogId } = useParams()
    const blog = useGetSingleBlog(blogId)

  return (
    <div className='flex flex-col w-1/4 mx-auto'>
        {/*  for title */}
        <h1 className='text-5xl font-bold'>{blog.title}</h1>
        <img className='h-96 w-96' src={`https://res.cloudinary.com/dipdggpwh/image/upload/v${blog.imageurl}.png`} />
        <p>
            {blog.aboutBlog}
        </p>
    </div>
  )
}

export default SingleBlogDisplay