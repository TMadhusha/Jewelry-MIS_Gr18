import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Login/loginReg.css"

export default function Registration() {
  return (
    <section className='login-section'>
      <div className='reg'>
        <form className='view '>
          <div>
            <h1>Registration</h1>
            <div className='form-group'>
              <label htmlFor='firstname'>First Name:</label>
              <input type='text' id='firstname' name='firstname' />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last Name:</label>
              <input type='text' id='lastname' name='lastname' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input type='text' id='address' name='address' />
            </div>
          </div>
          <div>
            <div className='form-group'>
              <label htmlFor='phoneNo'>Mobile:</label>
              <input type='tel' id='phoneNo' name='phoneNo' />
            </div>
            <div className='form-group'>
              <label htmlFor='uname'>Username:</label>
              <input type='text' id='uname' name='uname' />
            </div>
            <div className='form-group'>
              <label htmlFor='pwd'>Password:</label>
              <input type='password' id='pwd' name='pwd' />
            </div>
            <div className='form-group'>
              <label htmlFor='cpwd'>Confirm Password:</label>
              <input type='password' id='cpwd' name='cpwd' />
            </div>
            <div className='button-group'>
              <button type='submit'>Register</button>
              <button type='button'>Cancel</button>
            </div>
            <div className='create-account'>
              <NavLink to='/forgetPwd'>Forget Password</NavLink>
              <span> or </span>
              <NavLink to='/login'>Login</NavLink>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
