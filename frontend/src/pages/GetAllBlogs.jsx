import React, { useState } from 'react'
import useGetAllBlogs from '../hooks/useGetAllBlogs'
import BlogCard from '../components/BlogCard'
import { useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const GetAllBlogs = () => {

  const [page, setPage] = useState(1)
  const deletedBlog = useSelector(state => state.useractions.deletedBlog)
  const allBlogs = useGetAllBlogs(deletedBlog)

  return (
    <div className='flex flex-col gap-y-3 mt-20'>
      {
        allBlogs.slice(page * 5 - 5, page * 5).map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      }

      <div className='flex justify-center items-center text-2xl gap-x-5 mb-[5%]'>
        <ChevronLeft onClick={() => page > 1 && setPage(prev => prev - 1)} className='cursor-pointer' strokeWidth={1.25} />
        {
          [...Array(Math.ceil(allBlogs.length / 5))].map((_, i) => (
            <span className={`${page === i + 1 ? 'border-2 border-[#5fedb4] bg-[#5fedb4] text-white px-2 rounded-lg' : ''} cursor-pointer`} onClick={() => setPage(i + 1)} key={i}>{i + 1}</span>
          ))
        }
        <ChevronRight onClick={() => page < Math.ceil(allBlogs.length / 5) && setPage(prev => prev + 1)} className='cursor-pointer' strokeWidth={1.25} />
      </div>
    </div>
  )
}

export default GetAllBlogs