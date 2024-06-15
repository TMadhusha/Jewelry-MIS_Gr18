import React from 'react'
import '../Login/loginReg.css'
import { NavLink } from 'react-router-dom'


export default function Login() {
  return (
    <section className='login-section'>
      <div className='login'>
        <form>
          <h1>Login</h1>
          <div className='form-group'>
            <label htmlFor='uname'>Username:</label>
            <input type='text' id='uname' name='uname' />
          </div>
          <div className='form-group'>
            <label htmlFor='pwd'>Password:</label>
            <input type='password' id='pwd' name='pwd' />
          </div>
          <div className='button-group'>
            <button type='submit'>Login</button>
            <button type='button'>Cancel</button>
          </div>
          <div className='create-account'>
          <NavLink to='/forgetPwd'>Forget Password</NavLink>
            <NavLink to='/registration'> Or Create an Account</NavLink>
          </div>
        </form>
      </div>
    </section>
  )
}
