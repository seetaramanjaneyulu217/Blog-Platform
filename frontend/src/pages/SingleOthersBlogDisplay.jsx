import React from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'
import SingleBlogDisplayTemplate from '../components/SingleBlogDisplayTemplate'
import { Heart, MessageSquare } from 'lucide-react'
import handleLikeBlog from '../utils/handleLikeBlog'
import { useDispatch, useSelector } from 'react-redux'

const SingleOthersBlogDisplay = () => {

    const { blogId } = useParams()
    const [blog, user, loggedInUser] = useGetSingleBlog(blogId)
    const dispatch = useDispatch()
    const bloglike = useSelector(state => state.blog.likedTheBlog)

    return (
        <div>
            <SingleBlogDisplayTemplate blog={blog} user={user} />

            <div className='flex items-center justify-end mr-[15%] gap-x-7'>
                {/*  For likes */}
                <div className='flex items-center gap-1 text-2xl cursor-pointer'>
                    <Heart onClick={() => handleLikeBlog(blogId, dispatch)} color={`${loggedInUser.likedBlogs?.includes(blogId) ? 'red' : 'black'}`} fill={`${loggedInUser.likedBlogs?.includes(blogId) ? 'red' : 'none'}`} strokeWidth={1.25} size={30} />
                    <p>{blog.likes}</p>
                </div>

                {/* For comments */}
                <div className='flex items-center gap-1 text-2xl cursor-pointer'>
                    <MessageSquare strokeWidth={1} size={30} />
                    <p>{blog.comments}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleOthersBlogDisplay