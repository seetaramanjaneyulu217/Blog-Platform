import React, { useRef, useState } from 'react'
import { DEFAULT_BLOG_IMAGE } from '../utils/constants'
import handleBlogPost from '../utils/handleBlogPost'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import Cookies from 'js-cookie'

const CreateBlog = () => {
    
    const title = useRef()
    const aboutBlog = useRef()
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userLoggedIn = Cookies.get("userLoggedIn")

    const handleFileChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append("upload_preset", "rap0jfwa")
        setImage(e.target.files[0])
        setFormData(formData)
    }

    const handleBlog = async () => {
        setLoading(true)
        if (image) {
            await axios.post(`https://api.cloudinary.com/v1_1/dipdggpwh/image/upload`, formData)
                .then(response => {
                    const match = response.data.url.match(/\/v([\w-]+\/[\w-]+)/)
                    handleBlogPost(navigate, setLoading, { title: title.current.value, aboutBlog: aboutBlog.current.value, imageurl: match[1] })
                })
                .catch(error => console.log(error))
        }
        else {
            handleBlogPost(navigate, setLoading, { title: title.current.value, aboutBlog: aboutBlog.current.value, imageurl: null })
        }
    }


    if(!userLoggedIn) {
        navigate('/')
        return
    }
    return (
        <>
            <div className={`${loading ? 'blur-md' : ''} flex justify-center mt-20 gap-x-44`}>
                {/*  For image */}
                <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] cursor-pointer rounded-3xl flex justify-center w-2/5'>
                    <label htmlFor="fileInput">
                        <img alt='blogimage' src={image ? URL.createObjectURL(image) : DEFAULT_BLOG_IMAGE} className='h-96 w-full rounded-3xl cursor-pointer' />
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
                    <input ref={title} type='text' placeholder='Title of the blog' className='w-3/5 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                    <textarea ref={aboutBlog} className='h-64 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' placeholder='Write something you want to share through this blog'></textarea>
                    <button onClick={handleBlog} className='text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>Publish</button>
                </div>
            </div>

            <div>
                {loading && <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '43%'}}><BeatLoader size={30} color="#5fedb4" speedMultiplier={0.8} />
                               <p className='text-xl font-semibold text-[#5fedb4]'>Publishing your blog...</p></div>}
            </div>
        </>
    )
}

export default CreateBlog