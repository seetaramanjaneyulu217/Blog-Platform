import React from 'react'
import { LOGO } from '../utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const token = window.localStorage.getItem("token")

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    navigate('/')
  }

  return (
    <header className='flex justify-between py-8 px-14 items-center'>
      {/* for logo */}
      <div className='flex items-center gap-2'>
        <img src={LOGO} className='h-14 w-14' />
        <h1 onClick={() => navigate('/')} className={`${location.pathname === '/create-blog' ? 'text-3xl' : 'text-4xl'} text-[#a1a1f7] font-semibold cursor-pointer`}>BlogPedia</h1>
      </div>

      {/* for signup Link */}
      {
        location.pathname === '/signup'
          ? ""
          : !token
            ? <div>
              <Link to='/signup' className='border-2 border-[#5fedb4] bg-[#5fedb4] text-white text-lg font-semibold py-2 px-5 rounded-lg'>SignUp</Link>
            </div>
            : <div className='flex gap-7'>
              {
                location.pathname !== '/create-blog' && 
                <button onClick={() => navigate('/create-blog')} className='flex items-center text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>
                  <Plus strokeWidth={2.5} />
                  <p>Create Blog</p>
                </button>
              }
              <button onClick={handleLogout} className='border-2 border-red-500 bg-red-500 text-white text-lg font-semibold py-2 px-5 rounded-lg'>
                Logout
              </button>
            </div>
      }
    </header>
  )
}

export default Header