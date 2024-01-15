import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'
import SingleBlogDisplayTemplate from '../components/SingleBlogDisplayTemplate'
import { CircleUserRound, Heart, MessageSquare } from 'lucide-react'
import handleLikeBlog from '../utils/handleLikeBlog'
import { useDispatch, useSelector } from 'react-redux'
import handleCommentOnTheBlog from '../utils/handleCommentOnTheBlog'

const SingleOthersBlogDisplay = () => {

    const { blogId } = useParams()
    const likedTheBlog = useSelector(state => state.blog.likedTheBlog)
    const commentedTheBlog = useSelector(state => state.blog.commentedTheBlog)
    const [blog, user, loggedInUser] = useGetSingleBlog(blogId, likedTheBlog, commentedTheBlog)
    const dispatch = useDispatch()
    const comment = useRef()

    return (
        <div>
            <SingleBlogDisplayTemplate blog={blog} user={user} />

            {/* For likes and comments */}
            <div className='mt-[2%] flex items-center justify-end mr-[15%] gap-x-7 mb-[3%]'>
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


            {/* For comments input and button */}
            <div className='flex flex-col mb-[4%]'>
                <textarea ref={comment} className='w-9/12 ml-[9.9%] border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' placeholder='Comment on this blog'></textarea>
                <div className='w-9/12 ml-[9.9%] flex justify-end mt-[1%]'>
                    <button onClick={ () => handleCommentOnTheBlog(comment.current.value, blogId, dispatch)} className='border-2 border-[#5fedb4] bg-[#5fedb4] p-3 py-2 px-5 rounded-lg text-white font-semibold'>Comment</button>
                </div>
            </div>


            {/* Displaying all comments */}
            <h1 className='w-9/12 ml-[9.9%] text-4xl font-bold mb-[1%]'>All Comments ({blog.comments})</h1>
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
    )
}

export default SingleOthersBlogDisplay