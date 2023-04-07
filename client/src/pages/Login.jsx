import React, {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillExclamationCircle } from 'react-icons/ai'
import axios from '../api/axios'
import { setAuth, setUser,setLogin } from '../redux/features/auth'
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const userRef = useRef()
  const errorRef = useRef()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    userRef?.current?.focus()
  }, [])

  useEffect(() => {
    if (error) {
      errorRef?.current?.classList?.add('animate__animated', 'animate__shakeX')
      setTimeout(() => {
        errorRef?.current?.classList?.remove('animate__animated', 'animate__shakeX')
      }, 1000)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      const {data} = await axios.post('/auth/login', 
      JSON.stringify({email, password}),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if(data){
        dispatch(setUser(data?.user))
        dispatch(setAuth(true))
        dispatch(setLogin(true))
      }

      setLoading(false)
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if(!err?.response){
        setError('No Server response. Please try again later.')
      } else if (err?.response?.status === 400) {
        setError('Invalid credentials')
      } else if(err?.response?.status === 401){ 
        setError('Unauthorized')
      } 
      else {
        setError('Something went wrong. Please try again later.')
      }
      errorRef?.current?.focus()
      setLoading(false)
    }
  }

  const handleDemoAccount = async () => {
    try {
      setError('')
      setLoading(true)
      const {data} = await axios.post('/auth/login', 
      JSON.stringify({email: 'lamngo@gmail.com', password: 'lamngo123456'}),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if(data){
        dispatch(setAuth(true))
        dispatch(setUser(data?.user))
        dispatch(setLogin(true))
      }

      setLoading(false)
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if(!err?.response){
        setError('No Server response. Please try again later.')
      } else if (err?.response?.status === 400) {
        setError('Invalid credentials')
      } else if(err?.response?.status === 401){ 
        setError('Unauthorized')
      } 
      else {
        setError('Something went wrong. Please try again later.')
      }
      errorRef?.current?.focus()
      setLoading(false)
    }
  
  }
 
  return (
    <>
    {loading ?
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-bgColorLight'></div>
      </div>
      :
    <div className='flex flex-row h-screen'>
        <div className='lg:w-[50%] md:w-[70%] mx-auto flex flex-col md:px-24 px-8 h-full justify-center text-center md:text-start gap-4'>
          <div className='flex gap-4 items-center self-center md:self-start'>
            <img src={require("../assets/symbol.png")} alt="symbol" className='w-14 h-14 object-fill' />
            <h1 className='font-bold text-2xl symbol'>Chillify</h1>
          </div>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-sm text-textColorLight'>Welcome to my streaming music platform</p>
          
          <form className='flex flex-col gap-4 border-b items-center md:items-stretch border-bgColorLight py-8 '>
            {/* input */}
              <div className='flex flex-col md:flex-row gap-4 justify-between'>
                <label htmlFor="email" className='self-start'>E-mail</label>
                <input 
                ref={userRef} 
                autoComplete="off"
                value={email}
                type="text" 
                name='email' 
                placeholder="Email" 
                className='text-sm rounded-md px-2  outline-none text-bgColorLight'
                onChange={(e) => setEmail(e.target.value)}
                required
                />
              </div>
              <div className='flex flex-col md:flex-row gap-4 justify-between'>
                <label htmlFor="password" className='self-start'>Password</label>
                <input 
                type="password" 
                placeholder="Password" 
                className='text-sm rounded-md px-2 outline-none text-bgColorLight'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
              </div>
              { error  && 
              <div ref={errorRef} 
              className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
              aria-live='assertive'
              >
                <AiFillExclamationCircle />
                <p>{error}</p>
              </div>}
              {/* Forgot password */}
              <p 
              className='text-sm text-textColorLight md:self-end self-center cursor-pointer'
              onClick={() => navigate('/forgot-password')} 
              >
                Forgot password?
              </p>
              {/* btn */}
              <div className='flex flex-row items-center justify-between self-stretch'>
                <div className='flex gap-2'>
                    <input type="checkbox" className='accent-bgPlayerColorDark'/>
                    <p className='text-sm text-textColorLight'>Remember me</p>
                </div>
                  <button 
                    type="submit" 
                    className='py-1 px-2 rounded-md border-bgColorLight bg-bgPlayerColorDark border'
                    onClick={handleSubmit}>
                    Login
                  </button>
              </div>
            </form>
            <button 
              className='text-sm self-center py-1 px-2 rounded-md border-bgColorLight bg-bgPlayerColorDark border'
              onClick={handleDemoAccount}
            >
              Login as Demo account
            </button>
            <p 
            className='flex md:flex-row flex-col gap-2 justify-center text-sm text-textColorLight'
            >
              Don't have an account? 
              <span 
                className='text-bgPlayerColorLight cursor-pointer font-bold'
                onClick={() => navigate('/signup')}
                >
                  Sign up
              </span>
            </p>

        </div>
        {/* cover image */}
        <img src={require("../assets/cover-img3.png")} alt="cover-img" className='w-[50%] h-full object-cover hidden lg:block' />
    </div>}
  </>
  )
}

export default Login
