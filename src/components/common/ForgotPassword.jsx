import React from 'react'
import '../../assets/css/forgotpassword.css'

export default function ForgotPassword() {
  return (
    <div className='forgotpass-container'>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder='Enter your email' />
      </form>
    </div>
  )
}
