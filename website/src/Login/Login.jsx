import React, { useContext, useState } from 'react'
import '../Login/loginReg.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from './AuthProvider';


export default function Login() {
    let navigate=useNavigate();
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const {login}=useContext(AuthContext);

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:8080/remoteCustomerLogin",{username, password});
            if(response.status===200){
                login(username);
                navigate('/jewelry/bangle');
            }
        }catch(error){
            window.alert("Invalid username or password");
            console.log("Invalid username or password",error);
        }
    }
  return (
    <section className='login-section'>
      <div className='login'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='form-group'>
            <label htmlFor='uname'>Username:</label>
            <input type='text' id='uname' name='username' value={username}  onChange={(e) =>setUsername(e.target.value)}/>
          </div>
          <div className='form-group'>
            <label htmlFor='pwd'>Password:</label>
            <input type='password' id='pwd' name='password' value={password} onChange={(e) =>setPassword(e.target.value)}/>
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
