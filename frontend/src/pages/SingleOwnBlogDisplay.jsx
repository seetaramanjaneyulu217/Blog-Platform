import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'
import SingleBlogDisplayTemplate from '../components/SingleBlogDisplayTemplate'

const SingleOwnBlogDisplay = () => {

  const { blogId } = useParams()
  const [blog, user] = useGetSingleBlog(blogId)

  return (
    <div>
      <SingleBlogDisplayTemplate blog={blog} user={user} />
    </div>
  )
}

export default SingleOwnBlogDisplay