import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../images/logo2-bg.png';


export default function AddAdmin() {

  let navigate=useNavigate()

  const [admin,setAdmin]=useState({
        username:"",
        password:"",
        
        

  })
  useEffect(()=>{
    console.log("Welcome To AdminPage Page..")
  })

  const{username,password}=admin

  const onInputChange=(e)=>{
    
    setAdmin({...admin,[e.target.name]:e.target.value})

  }

  const onSubmit =async (e)=>{
      e.preventDefault()
      const usernamePattern = /^[a-zA-Z_]+$/;
    if (!usernamePattern.test(username)) {
      alert("Username can only contain letters and underscores.");
    }else{

      try
      {
      const response=await axios.post("http://localhost:8080/login",admin)

      if (response.status === 200) {
        alert("Login Successfull"); // Display response message
        navigate("/dashboard"); // Navigate to dashboard upon successful login
      }}
      catch (error) {
        alert("Login failed: " + error.response.data); // Display error message
    }
        }
  }
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/login")
}
return(
    
    
    <div className="container">
        <div className='title-bar'> 
                <div  className='title-section'>
                 <div><img src={logo} className='title-logo'/></div>
                   <h1 className='logo'>Jewel Mart</h1>
                   <h3 style={{fontFamily:'Monotype Corsiva',fontSize:'25px',}}>A Perfect Choice</h3>
                </div>
        </div>
        <div className='log-container'>
            
                <div className='login'>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor='uname'>Username:</label>
                            <input 
                            type={"text"} 
                            className="inputs" 
                            name="username" 
                            id="username" 
                            placeholder="username"
                            value={username} 
                            onChange={(e)=>onInputChange(e)}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor='pwd'>Password:</label>
                                <input 
                                type={"password"} 
                                className="inputs"
                                name="password" 
                                id="pwd" 
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className='button-group'>
                        <button type='submit' className='logbtn'>
                            Login
                        </button>
                        <button type='button' className='logbtn'>Cancel</button>
                        </div>
                        
                    </form>
                    <div className="text-center fs-6">
                    <Link to="/AdminFogot">
                        Forget-Password
                    </Link>
                    {/* {"\t"}or{"\t"}
                    <Link to="/login-regsiteration">
                        Sign-Up
                    </Link> */}
                    </div>
                </div>
        
        </div>
                
    </div>

)
}
