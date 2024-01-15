import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {

    return (
        <div className='mt-[1%]'>
            <div className='flex items-center justify-center gap-x-8'>
                <div className='flex border-2 p-2 cursor-pointer border-[#f5f5fa] bg-[#f5f5fa] rounded-xl w-6/12 mb-9 gap-x-7'>
                    {/* For image */}
                    <div className='w-3/12 h-full'>
                        <Skeleton/>
                    </div>

                    {/* For blog title and blogDetails */}
                    <div className='w-8/12 flex flex-col gap-y-3'>
                        <h1 className='text-3xl font-semibold line-clamp-3'><Skeleton count={3}/></h1>
                        <p className='line-clamp-2'><Skeleton count={3}/></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading