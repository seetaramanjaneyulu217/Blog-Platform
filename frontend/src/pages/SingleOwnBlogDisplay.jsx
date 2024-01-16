import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'
import SingleBlogDisplayTemplate from '../components/SingleBlogDisplayTemplate'
import { CircleUserRound } from 'lucide-react'
import SingleBlogLoading from '../components/SingleBlogLoading'
import Cookies from 'js-cookie'

const SingleOwnBlogDisplay = () => {

  const { blogId } = useParams()
  const [loading, setLoading] = useState(false)
  const [blog, user] = useGetSingleBlog(blogId, setLoading)
  const navigate = useNavigate()
  const userLoggedIn = Cookies.get("userLoggedIn")

  if(!userLoggedIn) {
    navigate('/')
    return
  }

  return (
    <div>
      {
        loading
          ? <SingleBlogLoading />
          : <div>
                <SingleBlogDisplayTemplate blog={blog} user={user} />
                {/* Displaying all comments */}
                <h1 className='w-9/12 ml-[9.9%] text-4xl font-bold mb-[1%] mt-[5%]'>All Comments ({blog.comments})</h1>
                <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] rounded-lg p-5 w-9/12 ml-[9.9%] mb-[2%]'>
                  {
                    blog.allComments?.map((comment, index) => (
                      <div key={index} className='flex flex-col gap-y-2 mb-[3%]'>
                        <div className='flex items-center gap-x-1'>
                          <CircleUserRound strokeWidth={1} size={30} />
                          <h1 className='text-xl font-semibold'>{comment.username}</h1>
                        </div>
                        <p className='ml-[3.2%]'>{comment.comment}</p>
                      </div>
                    ))
                  }
                </div>
          </div>
      }
    </div>
  )
}

export default SingleOwnBlogDisplay