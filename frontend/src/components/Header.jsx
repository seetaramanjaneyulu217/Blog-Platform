import React from 'react'
import { LOGO } from '../utils/constants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import postMethodFetch from '../utils/postMethodFetch'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const Header = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const userLoggedIn = Cookies.get("userLoggedIn")

  const handleLogout = () => {
    const response = postMethodFetch('user/logout', {})
    response
    .then(data => {
      if(data.msg === 'Logout successful') {
        toast.success(data.msg)
        Cookies.remove("userLoggedIn")
        navigate('/')
      }
    })
  }

  return (
    <header className='sticky top-0 bg-white flex justify-between py-8 px-14 items-center'>
      {/* for logo */}
      <div className='flex items-center gap-2'>
        <img alt='logo' src={LOGO} className='h-14 w-14' />
        <h1 onClick={() => navigate('/')} className={`${location.pathname === '/' ? 'text-4xl' : 'text-3xl'} text-[#a1a1f7] font-semibold cursor-pointer`}>BlogPedia</h1>
      </div>

      {/* for signup Link */}
      {
        location.pathname === '/signup'
          ? ""
          : !userLoggedIn
            ? <div>
              <Link to='/signup' className='border-2 border-[#5fedb4] bg-[#5fedb4] text-white text-lg font-semibold py-2 px-5 rounded-lg'>SignUp</Link>
            </div>
            : <div className='flex gap-7'>
              {
                location.pathname !== '/your-blogs' &&
              <button onClick={() => navigate('/your-blogs')} className='text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>Get my blogs</button>
              }
              {
                location.pathname !== '/blogs/browse' &&
                <button onClick={() => navigate('/blogs/browse')} className='flex items-center text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>
                  <p>Browse blogs</p>
                </button>
              }
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