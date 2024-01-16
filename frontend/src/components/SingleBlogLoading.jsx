import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleBlogLoading = () => {
    return (
        <SkeletonTheme>
            <div className='flex flex-col mt-[6%] w-9/12 ml-[10%] gap-y-10'>
                {/*  for title */}
                <h1 className='text-4xl font-semibold'><Skeleton /></h1>

                <div className='flex flex-col items-end'>
                    <h1 className='text-lg font-semibold'>Author: <span className='text-lg font-medium'><Skeleton /></span></h1>
                    <h1 className='text-lg font-semibold'>
                        Published on: <span className='text-lg font-medium'><Skeleton /></span>
                    </h1>
                </div>

                <div className='w-full'>
                    <Skeleton count={6} />
                </div>

                <p className='text-xl'>
                    <Skeleton count={3} />
                </p>
            </div>
        </SkeletonTheme>
    )
}

export default SingleBlogLoading