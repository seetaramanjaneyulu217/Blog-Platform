import React, { useRef, useState } from 'react'
import { DEFAULT_BLOG_IMAGE } from '../utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import useGetSingleBlog from '../hooks/useGetSingleBlog'
import axios from 'axios'
import handleEditBlogPost from '../utils/handleEditBlogPost'
import { BeatLoader } from 'react-spinners'

const EditBlog = () => {

    const { blogId } = useParams()
    const [blog] = useGetSingleBlog(blogId)
    const title = useRef()
    const aboutBlog = useRef()
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("upload_preset", "rap0jfwa")
        setImage(e.target.files[0])
        setFormData(formData)
    }

    const handleEditBlog = async () => {
        setLoading(true)
        if (image) {
            await axios.post(`https://api.cloudinary.com/v1_1/dipdggpwh/image/upload`, formData)
                .then(response => {
                    const match = response.data.url.match(/\/v([\w-]+\/[\w-]+)/)
                    handleEditBlogPost(navigate, setLoading, blogId, { title: title.current.value, aboutBlog: aboutBlog.current.value, imageurl: match[1] })
                })
                .catch(error => console.log(error))
        }

        else {
            handleEditBlogPost(navigate, setLoading, blogId, { title: title.current.value, aboutBlog: aboutBlog.current.value, imageurl: blog.imageurl })
        }
    }

    return (
        <>
            <div className={`${loading ? 'blur-md' : ''} flex justify-center mt-20 gap-x-44`}>
                {/*  For image */}
                <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] cursor-pointer rounded-3xl flex justify-center w-2/5'>
                    <label htmlFor="fileInput">
                        <img alt='editimage' src={image ? URL.createObjectURL(image) : blog.imageurl ? `https://res.cloudinary.com/dipdggpwh/image/upload/v${blog.imageurl}.png` : DEFAULT_BLOG_IMAGE} className='h-96 w-full rounded-3xl cursor-pointer' />
                        <input
                            type="file"
                            id="fileInput"
                            className='hidden'
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {/*  For form */}
                <div className='flex flex-col w-1/3 gap-y-5'>
                    <input ref={title} defaultValue={blog.title} type='text' placeholder='Title of the blog' className='w-3/5 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                    <textarea ref={aboutBlog} defaultValue={blog.aboutBlog} className='h-64 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' placeholder='Write something you want share through this blog'></textarea>
                    <button onClick={handleEditBlog} className='text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>Edit and publish</button>
                </div>
            </div>

            <div>
                {loading && <BeatLoader size={30} color="#5fedb4" speedMultiplier={0.8} cssOverride={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '47%' }} />}
            </div>
        </>
    )
}

export default EditBlog