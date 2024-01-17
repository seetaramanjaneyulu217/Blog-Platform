import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  const userLoggedIn = Cookies.get("userLoggedIn")

  return (
    <div className='flex w-11/12 mx-auto items-center mt-[3.7%]'>
      <h1 className='w-3/12 text-5xl'>Explore the world of Blogs here</h1>
      <div className='w-8/12'>
        <img className='rounded-2xl h-[550px]' src='https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg' />
      </div>
    </div>
  )
}

export default Home