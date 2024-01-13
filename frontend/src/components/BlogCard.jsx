import React from 'react'
import { DEFAULT_BLOG_IMAGE } from '../utils/constants'
import { MessageSquare, MoreVertical, ThumbsUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, Space } from 'antd';
import { Pencil, Trash } from "lucide-react";

const BlogCard = ({ blog }) => {

    const navigate = useNavigate()

    const items = [
        {
            key: '1',
            label: (
                <Link className="text-lg" to={`/blog/${blog._id}/edit`}>
                    Edit
                </Link>
            ),
            icon: <Pencil strokeWidth={1} className="text-blue-500" />
        },
        {
            key: '2',
            label: (
                <Link className="text-lg">
                    Delete
                </Link>
            ),
            icon: <Trash strokeWidth={1.25} className="text-red-500" />
        }
    ]

    return (
        <div className='flex items-center justify-center gap-x-8'>
            <div onClick={() => navigate(`/blog/${blog._id}`)} className='flex border-2 p-2 cursor-pointer border-[#f5f5fa] bg-[#f5f5fa] rounded-xl w-6/12 mb-9 gap-x-7'>
                {/* For image */}
                <div className='w-3/12'>
                    <img src={blog.imageurl === null ? DEFAULT_BLOG_IMAGE : `https://res.cloudinary.com/dipdggpwh/image/upload/v${blog.imageurl}.png`} className='h-44 w-44' />
                </div>

                {/* For blog title and blogDetails */}
                <div className='w-8/12 mt-[5%] flex flex-col gap-y-3'>
                    <h1 className='text-3xl font-semibold'>{blog.title}</h1>
                    <p className='line-clamp-3'>{blog.aboutBlog}</p>
                </div>
            </div>

            <div className='flex flex-col gap-y-5'>
                {/*  For likes */}
                <div className='flex items-center gap-1 text-2xl cursor-pointer'>
                    <ThumbsUp strokeWidth={1.25} size={30} />
                    <p>0</p>
                </div>

                {/* For comments */}
                <div className='flex items-center gap-1 text-2xl cursor-pointer'>
                    <MessageSquare strokeWidth={1} size={30} />
                    <p>0</p>
                </div>

                {/* For edit and delete options */}
                <div>
                    <Dropdown
                        menu={{
                            items
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            <Space>
                                <MoreVertical size={24} />
                            </Space>
                        </Link>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default BlogCard