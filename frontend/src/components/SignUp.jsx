import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import handleUserSignUp from '../utils/handleUserSignUp'
import Cookies from 'js-cookie'
import { BeatLoader } from 'react-spinners'

const SignUp = () => {

    const [isSignUpForm, setIsSignForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const userLoggedIn = Cookies.get("userLoggedIn")


    if (userLoggedIn) {
        navigate('/')
        return
    }

    return (
        <>
            <div className={`${loading ? 'blur-md' : ''}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col w-1/4 mx-auto mt-14 gap-y-6'>
                        <h1 className='text-3xl font-semibold text-[#a1a1f7]'>{!isSignUpForm ? "SignIn" : "SignUp"} to experience the blog power</h1>
                        {isSignUpForm && <input ref={username} type='text' placeholder='Username' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />}
                        <input ref={email} type='email' placeholder='Email' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={password} type='password' placeholder='Password' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <div className='w-1/4'>
                            <button onClick={() => handleUserSignUp(navigate, setLoading, isSignUpForm, isSignUpForm ? { username: username.current.value, email: email.current.value, password: password.current.value } : { email: email.current.value, password: password.current.value })} className='border-2 border-[#5fedb4] bg-[#5fedb4] text-white text-lg font-semibold py-2 px-5 rounded-lg'>{!isSignUpForm ? "SignIn" : "SignUp"}</button>
                        </div>
                        {!isSignUpForm ? <p>Not registered yet? <span className='text-blue-400 text-lg underline cursor-pointer' onClick={() => setIsSignForm(true)}>SignUp</span></p> : <p className='text-lg text-gray-700'>Already a user? <span className='text-blue-400 text-lg underline cursor-pointer' onClick={() => setIsSignForm(false)}>SignIn</span></p>}
                    </div>
                </form>
            </div>

            <div>
                {loading && <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '37%' }}><BeatLoader size={30} color="#5fedb4" speedMultiplier={0.8} />
                    <p className='text-xl font-semibold text-[#5fedb4]'>Hello user...Welocme to the Blogpedia😉</p></div>}
            </div>
        </>
    )
}

export default SignUp