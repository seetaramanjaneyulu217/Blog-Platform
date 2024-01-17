import React, { useState } from 'react'
import { DEFAULT_BLOG_IMAGE } from '../utils/constants'
import { MessageSquare, MoreVertical, ThumbsUp } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Dropdown, Space, Modal } from 'antd';
import { Pencil, Trash } from "lucide-react";
import handleDeleteBlog from '../utils/handleDeleteBlog';
import { useDispatch, useSelector } from 'react-redux';

const BlogCard = ({ blog }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const deletedBlog = useSelector(state => state.useractions.deletedBlog)

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
                <Link className="text-lg" onClick={() => setOpen(true)}>
                    Delete
                </Link>
            ),
            icon: <Trash strokeWidth={1.25} className="text-red-500" />
        }
    ]

    return (
        <div className='flex items-center justify-center gap-x-8'>
            <div onClick={() =>  { location.pathname !== '/blogs/browse' ? navigate(`/blog/${blog._id}/view`) : navigate(`/blog/${blog._id}/others/view`) }} className='flex border-2 p-2 cursor-pointer border-[#f5f5fa] bg-[#f5f5fa] rounded-xl w-6/12 mb-9 gap-x-7'>
                {/* For image */}
                <div className='w-3/12'>
                    <img alt='blogimage' src={blog.imageurl === null ? DEFAULT_BLOG_IMAGE : `https://res.cloudinary.com/dipdggpwh/image/upload/v${blog.imageurl}.png`} className='h-44 w-full rounded-xl' />
                </div>

                {/* For blog title and blogDetails */}
                <div className='w-8/12 flex flex-col gap-y-3'>
                    <h1 className='text-3xl font-semibold line-clamp-3'>{blog.title}</h1>
                    <p className='line-clamp-2'>{blog.aboutBlog}</p>
                </div>
            </div>

            <div className='flex flex-col gap-y-5'>
                {/* For edit and delete options */}
                {
                    location.pathname !== '/blogs/browse' && <div>
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
                }
            </div>

            <Modal
                open={open}
                title="Are you sure to delete this blog ?"
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={() => (
                    <div className='flex justify-end gap-x-3'>
                        <button onClick={() => setOpen(false)} className='text-white border-2 border-blue-300 bg-blue-300 hover:bg-white hover:text-blue-300 p-2 rounded-lg py-1 px-3'>No, Cancel</button>
                        <button onClick={() => {
                            handleDeleteBlog(blog._id, dispatch)
                            setOpen(false)
                        }} className='text-white border-2 border-red-400 bg-red-400 hover:bg-white hover:text-red-400 p-2 rounded-lg py-1 px-3'>Yes, delete</button>
                    </div>
                )}
            >
            </Modal>
        </div>
    )
}

export default BlogCard