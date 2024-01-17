import React from 'react'
import home from '../assets/home.png'
import { LOGO } from '../utils/constants'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Cookies from 'js-cookie'

const Home = () => {

  const userLoggedIn = Cookies.get("userLoggedIn")

  return (
    <div>
      <div className='flex w-11/12 mx-auto mt-[3.7%] rounded-3xl'>
        <div className='w-9/12'>
          <img className='rounded-2xl h-[550px]' src={home} alt='homeimage' />
        </div>
        <h1 className='w-6/12 text-5xl text-[#f5e0b6] mt-[5%] mr-[5%]'>{ userLoggedIn ? 'Enjoy creating blogs and browse others blogs...😄' : 'SignUp and experience the power of blogs they have...😉'}</h1>
      </div>

      <footer className='bg-[#c4c4ec] px-10 py-5 rounded-xl'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <img src={LOGO} className='w-14 h-14' />
            <h1 className='text-3xl font-bold text-white'>BlogPedia</h1>
          </div>

          <div className='flex flex-col gap-y-2'>
            <h1 className='text-white text-2xl'>Contact</h1>

            <div className='flex items-center gap-3'>
              <Instagram strokeWidth={1.5} className='text-orange-400' size={30} />
              <Facebook strokeWidth={1.5} className='text-blue-400' size={30} />
              <Twitter strokeWidth={1.5} className='text-blue-500' size={30} />
            </div>

          </div>
          <div>
            <h1 className='text-white text-xl'>Made with passion ❤️</h1>
          </div>
        </div>

        <h1 className='text-white text-2xl text-center mt-[5%]'>Copyrights@nothing</h1>
      </footer>
    </div>
  )
}

export default Home