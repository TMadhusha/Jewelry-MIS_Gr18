import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import './log.css';

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

      try
      {
      const response=await axios.post("http://localhost:8080/login",admin)

      if (response.status === 200) {
        alert("Login Successfull"); // Display response message
        navigate("/"); // Navigate to dashboard upon successful login
      }}
      catch (error) {
        alert("Login failed: " + error.response.data); // Display error message
    }
      
  }
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/login")
}
return(
    
    
    <div className="wrapper">
        {/* <SidebarSup> */}
            <div className="logo">
                {/* Picture */}
            </div>
                
            <div className="text-center mt-4 name">
                Italy Silver Choice
            </div>
        <form className="p-3 mt-3" onSubmit={(e)=>onSubmit(e)}>
                <div className="form-field d-flex align-items-center">
                    
                    <input 
                    type={"text"} 
                    className="far fa-user" 
                    name="username" 
                    id="username" 
                    placeholder="username"
                    value={username} 
                    onChange={(e)=>onInputChange(e)}/>

                </div>
                <div className="form-field d-flex align-items-center">
                    <span ></span>
                    <input 
                    type={"password"} 
                    className="fas fa-key"
                    name="password" 
                    id="pwd" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <button type='submit'className="btn mt-3">
                    Login
                </button>
        </form>
                <div className="text-center fs-6">
                <Link to="/login-regsiteration">
                    Forget-Password
                </Link>
                {"\t"}or{"\t"}
                <Link to="/login-regsiteration">
                    Sign-Up
                </Link>
                   
                </div>
        {/* </SidebarSup>     */}
    </div>

)
}
