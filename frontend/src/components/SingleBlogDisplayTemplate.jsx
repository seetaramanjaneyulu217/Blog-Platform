import React from 'react'
import moment from 'moment-timezone'


const SingleBlogDisplayTemplate = ({ blog, user }) => {
  return (
    <div className='flex flex-col mt-[6%] w-9/12 ml-[10%] gap-y-10'>
      {/*  for title */}
      <h1 className='text-4xl font-semibold'>{blog.title}</h1>

      <div className='flex flex-col items-end'>
        <h1 className='text-lg font-semibold'>Author: <span className='text-lg font-medium'>{user.username}</span></h1>
        <h1 className='text-lg font-semibold'>
          Published on: <span className='text-lg font-medium'>{moment(blog.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A')}</span>
        </h1>
        <h1 className='text-lg font-semibold'>
          Updated on: <span className='text-lg font-medium'>{moment(blog.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A')}</span>
        </h1>
      </div>

      {blog.imageurl !== null && <div className='w-full'>
        <img alt='blogimage' className='h-96 rounded-2xl' src={`https://res.cloudinary.com/dipdggpwh/image/upload/v${blog.imageurl}.png`} />
      </div>}

      <p className='text-xl'>
        {blog.aboutBlog}
      </p>

    </div>
  )
}

export default SingleBlogDisplayTemplate