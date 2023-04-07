import React from 'react'

function ForgotPassword() {
  return (
    <div className='flex flex-row lg:h-screen'>
        <div className='lg:w-[50%] md:w-[70%] md:mx-auto h-screen w-full 
        flex flex-col md:px-20 px-12 py-16 justify-center text-center md:text-start gap-4'>
          <div className='flex gap-4 items-center self-center md:self-start'>
            <img src={require("../assets/symbol.png")} alt="symbol" className='w-14 h-14 object-fill mx-auto md:mx-0' />
            <h1 className='font-bold text-2xl symbol'>Chillify</h1>
          </div>
            <h1 className='text-3xl font-bold'>Password recovery</h1>
            <p className='text-sm text-textColorLight'>
              Please enter your email address and we will send you a link to reset your password.
            </p>
            
            <form className='flex flex-col gap-4 border-b items-center md:items-stretch border-bgColorLight py-8 '>
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                  <label htmlFor="email" className='self-start'>E-mail</label>
                  <input type="text" name='email' placeholder="Email" className='text-sm rounded-md px-2  outline-none text-bgColorLight'/>
                </div>
            </form>
            <div className='flex flex-col items-center justify-between gap-4'>
                <button type="submit" className='py-1 px-2 rounded-md border-bgColorLight bg-bgPlayerColorDark border'>Reset your password</button>
            </div>
            <p className='text-center text-bgPlayerColorLight cursor-pointer font-bold'>Back to login</p>
        </div>

        <img src={require("../assets/cover-img3.png")} alt="cover-img" className='w-[50%] h-full object-cover hidden lg:block' />
    </div>
  )
}

export default ForgotPassword
