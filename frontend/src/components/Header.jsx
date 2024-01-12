import React from 'react'
import { LOGO } from '../utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const token = window.localStorage.getItem("token")

  return (
    <header className='py-8 px-14 grid grid-cols-12 items-center'>
      {/* for logo */}
      <div className='flex items-center gap-2 col-span-11'>
        <img src={LOGO} className='h-14 w-14' />
        <h1 onClick={() => navigate('/')} className='cursor-pointer text-4xl text-[#a1a1f7] font-semibold'>BlogPedia</h1>
      </div>

      {/* for signup Link */}
      {
        location.pathname === '/signup'
          ? ""
          : !token ? <div className='cols-span-1'>
            <Link to='/signup' className='border-2 border-[#5fedb4] bg-[#5fedb4] text-white text-lg font-semibold py-2 px-5 rounded-lg'>SignUp</Link>
          </div>
          : <div className='cols-span-1'>
          <button onClick={ () => { 
            window.localStorage.removeItem("token")
            navigate('/') }} className='border-2 border-red-500 bg-red-500 text-white text-lg font-semibold py-2 px-5 rounded-lg'>Logout</button>
        </div>
      }
    </header>
  )
}

export default Header