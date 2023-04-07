import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {AiFillExclamationCircle} from 'react-icons/ai'
import axios from '../api/axios'
const SIGNUP_URL = '/auth/signup'

function Signup() {
   const navigate = useNavigate()
   const userRef = React.useRef()
   const errorRef = React.useRef()

   const USER_REGEX = /^[a-zA-Z0-9_-]{3,16}$/
   const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
   const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   const [user, setUser] = React.useState('')
   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')
   const [repeatPassword, setRepeatPassword] = React.useState('')
   const [userError, setUserError] = React.useState('')
   const [emailError, setEmailError] = React.useState('')
   const [passwordError, setPasswordError] = React.useState('')
   const [repeatPasswordError, setRepeatPasswordError] = React.useState('')
   const [error, setError] = React.useState('')
   const [isUserValid, setIsUserValid] = React.useState(false)
   const [isEmailValid, setIsEmailValid] = React.useState(false)
   const [isPasswordValid, setIsPasswordValid] = React.useState(false)
   const [isRepeatPasswordValid, setIsRepeatPasswordValid] = React.useState(false)
   const [isRead, setIsRead] = React.useState(false)
   const [isSubscribed, setIsSubscribed] = React.useState(false)
   const [isFormValid, setIsFormValid] = React.useState(false)

   useEffect(() => {
      userRef.current.focus()
   }, [])
   

   const handleUserChange = (e) => {
      const value = e.target.value
      setUser(value)
      if(!value){
         setIsUserValid(false)
         setUserError('Username is required')
      } else if(user.length < 3){
         setIsUserValid(false)
         setUserError('Username must be at least 3 characters long')
      } else if(!USER_REGEX.test(value)){
         setIsUserValid(false)
         setUserError('Username must contain only letters, numbers, underscores and dashes')
      } else {
         setIsUserValid(true)
         setUserError('')
      }
   }

   const handleEmailChange = (e) => {
      const value = e.target.value 
      setEmail(value)
      if(!value) {
         setIsEmailValid(false)
         setEmailError('Email is required')
      }  else if (!EMAIL_REGEX.test(value)) {
         setIsEmailValid(false)
         setEmailError('Email is not valid')
      } else {
         setIsEmailValid(true)
         setEmailError('')
      }
   }

   const handlePasswordChange = (e) => {
      const value = e.target.value
      setPassword(value)
      if(!value) {
         setIsPasswordValid(false)
         setPasswordError('Password is required')
      }  else if (value.length < 8) {
         setIsPasswordValid(false)
         setPasswordError('Password must be at least 8 characters long')
      } else if (!PWD_REGEX.test(value)) {
         setIsPasswordValid(false)
         setPasswordError('Password must contain at least one letter and one number')
      } else {
         setIsPasswordValid(true)
         setPasswordError('')
      }

      if (value !== repeatPassword && repeatPassword.length > 0) {
         setIsRepeatPasswordValid(false)
         setRepeatPasswordError('Passwords do not match')
      } else {
         setIsRepeatPasswordValid(true)
         setRepeatPasswordError('')
      }

   }

   const handleRepeatPasswordChange = (e) => {
      const value = e.target.value
      setRepeatPassword(value)
      if(!value) {
         setIsRepeatPasswordValid(false)
         setRepeatPasswordError('Password is required')
      }  else if (value !== password) {
         setIsRepeatPasswordValid(false)
         setRepeatPasswordError('Passwords do not match')
      } else {
         setIsRepeatPasswordValid(true)
         setRepeatPasswordError('')
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      // if btn enabled  with JS hack
      const v1 = USER_REGEX.test(user)
      const v2 = EMAIL_REGEX.test(email)
      const v3 = PWD_REGEX.test(password)
      if(!v1 || !v2 || !v3) {
         setError('Invalid input')
         return
      }
      // if btn enabled with React state
      if (isUserValid && isEmailValid && isPasswordValid && isRepeatPasswordValid) {
         console.log('success')
         setIsFormValid(true)
       try {
        const response =  await axios.post(SIGNUP_URL, 
         JSON.stringify({
            username: user,
            email: email,
            password: password,
            repeatPassword: repeatPassword,

         }), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
         })

         console.log(response)
         
       } catch (error) {

         if(error.response){
            setError('No server response')
         } else if(error.response.status === 409){
            setError('Username or email already exists')
         } else {
            setError('Something went wrong')
         }

         errorRef.current.focus()
       }
      } 
   }

  return (
   <>{isFormValid ? 
      <div className='flex flex-col items-center justify-center gap-4 h-screen'>
         <div className='flex gap-4 items-center'>
               <img src={require("../assets/symbol.png")} alt="symbol" className='w-14 h-14 object-fill' />
               <h1 className='font-bold text-2xl symbol'>Chillify</h1>
            </div>
         <h1 className='text-3xl font-bold'>Account created</h1>
         <p className='text-sm text-textColorLight'>You can now login to your account</p>
         <button 
         className='bg-bgPlayerColorDark text-white text-sm font-bold py-2 px-4 rounded-md mt-6'
         onClick={() => navigate('/login')}
         >Login</button>
      </div> 
      :
    <div className='flex flex-row lg:h-screen'>
        <div className='lg:w-[50%] md:w-[70%] md:mx-auto w-full md:h-screen
         flex flex-col md:px-20 px-12 py-8 justify-center text-center md:text-start gap-4'>
            <div className='flex gap-4 items-center self-center md:self-start'>
               <img src={require("../assets/symbol.png")} alt="symbol" className='w-14 h-14 object-fill' />
               <h1 className='font-bold text-2xl'>Chillify</h1>
            </div>
            <h1 className='text-3xl font-bold'>Create account</h1>
            <p className='text-sm text-textColorLight'>Get access to exclusive features by creating an account</p>
            
            <form className='flex flex-col gap-4 border-b items-center md:items-stretch border-bgColorLight py-8 '>
                  {(!isUserValid && userError)  && 
                  <div ref={errorRef} 
                  className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
                  aria-live='assertive'
                  >
                     <AiFillExclamationCircle />
                     <p>{userError}</p>
                  </div>}
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                  <label htmlFor="name" className='self-start'>Name</label>
                  <input
                  ref={userRef} 
                  value={user}
                  type="text" 
                  name='name'
                  autoComplete='off' 
                  placeholder="Name" 
                  className='text-sm rounded-md px-2 outline-none text-bgColorLight'
                  onChange={handleUserChange}
                  />
                </div>
                {(!isEmailValid && emailError)  && 
                <div ref={errorRef} 
                className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
                aria-live='assertive'
                >
                     <AiFillExclamationCircle />
                     <p>{emailError}</p>
                  </div>}
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                  <label htmlFor="email" className='self-start'>E-mail</label>
                  <input 
                  value={email}
                  type="text" 
                  name='email'
                  autoComplete='off'  
                  placeholder="Email" 
                  className='text-sm rounded-md px-2  outline-none text-bgColorLight'
                  onChange={handleEmailChange}
                  />
                </div>
                {(!isPasswordValid && passwordError) && 
                <div ref={errorRef} className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
                aria-live='assertive'
                >
                     <AiFillExclamationCircle />
                     <p>{passwordError}</p>
                  </div>}
               <div className='flex flex-col md:flex-row gap-4 justify-between'>
                  <label htmlFor="password" className='self-start'>Password</label>
                  <input 
                  value={password}
                  type="password" 
                  placeholder="Password" 
                  className='text-sm rounded-md px-2 outline-none text-bgColorLight'
                  onChange={handlePasswordChange}
                  />
               </div>
               {(!isRepeatPasswordValid && repeatPasswordError) && 
               <div ref={errorRef} className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
               aria-live='assertive'
               >
                     <AiFillExclamationCircle />
                     <p>{repeatPasswordError}</p>
                  </div>}
               <div className='flex flex-col md:flex-row gap-4 justify-between'>
                  <label htmlFor="RepeatPassword" className='self-start'>Repeat password</label>
                  <input
                  value={repeatPassword}
                  type="password" 
                  name="RepeatPassword" 
                  placeholder="Repeat password" 
                  className='text-sm rounded-md px-2 outline-none text-bgColorLight'
                  onChange={handleRepeatPasswordChange}
                  />
               </div>
            </form>
            {(error) && 
               <div ref={errorRef} className='flex flex-row gap-2 text-red-500 text-sm items-center justify-end'
               aria-live='assertive'
               >
               <AiFillExclamationCircle />
               <p>{error}</p>
            </div>}
            {/* btn */}
            <div className='flex flex-col items-center justify-between gap-4'>
               <div className='flex gap-2'>
                  <input type="checkbox" className='accent-bgPlayerColorDark ' onClick={() => setIsRead(!isRead) }/>
                  <p className='text-sm text-textColorLight'>I've read and accept the <span className='text-bgPlayerColorLight cursor-pointer font-bold'>Terms & Conditions</span></p>
               </div>
               <div className='flex gap-2'>
                  <input type="checkbox" className='accent-bgPlayerColorDark ' onClick={() => setIsSubscribed(!isSubscribed)}/>
                  <p className='text-sm text-textColorLight'>Subscribe to the newsletter to stay up to date</p>
               </div>
                <button 
                  type="submit" 
                  className={`py-1 px-2 rounded-md border-bgColorLight bg-bgPlayerColorDark border 
                  ${isUserValid && isEmailValid && isPasswordValid && isRepeatPasswordValid && isRead ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={handleSubmit}
                >Create my account</button>
            </div>
            <p className='flex md:flex-row flex-col gap-2 justify-center text-sm text-textColorLight '>Already have an account? 
               <span className='text-bgPlayerColorLight cursor-pointer font-bold' onClick={() => navigate("/login")}>
               Sign in
               </span>
            </p>
        </div>

        <img src={require("../assets/cover-img3.png")} alt="cover-img" className='w-[50%] h-full object-cover hidden lg:block' />
    </div>
   }
   </>
  )
}

export default Signup
