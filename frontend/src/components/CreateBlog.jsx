import React, { useRef } from 'react'
import { DEFAULT_BLOG_IMAGE } from '../utils/constants'

const CreateBlog = () => {

    const inputRef = useRef()
    const handleFileChange = () => {

    }

    return (
        <div className='flex justify-center mt-20 gap-x-44'>
            {/*  For image */}
            <div className='border-2 border-[#f5f5fa] bg-[#f5f5fa] cursor-pointer rounded-3xl flex justify-center w-2/5'>
                <label htmlFor="fileInput">
                    <img src={DEFAULT_BLOG_IMAGE} className='h-96 w-96 cursor-pointer' />
                    <input
                        type="file"
                        id="fileInput"
                        ref={inputRef}
                        className='hidden'
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {/*  For form */}
            <div className='flex flex-col w-1/3 gap-y-5'>
                <input type='text' placeholder='Title of the blog' className='w-3/5 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                <textarea className='h-60 border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' placeholder='Write something you want share through this blog'></textarea>
                <button className='text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>Publish</button>
            </div>
        </div>
    )
}

export default CreateBlog