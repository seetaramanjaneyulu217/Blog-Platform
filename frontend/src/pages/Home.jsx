import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div>
        <button onClick={() => navigate('/your-blogs')} className='text-white font-semibold gap-1 border-2 border-[#5fedb4] bg-[#5fedb4] rounded-lg py-2 px-5'>Get my blogs</button>
    </div>
  )
}

export default Home