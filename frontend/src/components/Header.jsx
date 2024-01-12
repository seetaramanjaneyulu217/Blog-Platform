import React from 'react'
import { LOGO } from '../utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

  const location = useLocation()
  const naviagte = useNavigate()

  return (
    <header className='py-8 px-14 grid grid-cols-12 items-center'>
      {/* for logo */}
      <div onClick={() => naviagte('/')} className='flex items-center gap-2 col-span-11 cursor-pointer'>
        <img src={LOGO} className='h-14 w-14' />
        <h1 className='text-4xl text-[#a1a1f7] font-semibold'>BlogPedia</h1>
      </div>

      {/* for signup Link */}
      {
        location.pathname === '/signup' 
          ? ""
          : <div className='cols-span-1'>
              <Link to='/signup' className='border-2 border-[#5fedb4] bg-[#5fedb4] text-white text-lg font-semibold py-2 px-5 rounded-lg'>SignUp</Link>
            </div>
      }
    </header>
  )
}

export default Header