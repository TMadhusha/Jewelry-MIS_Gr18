import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import logo from '../images/logo2-bg.png';

export default function AdminReg() {

  let navigate=useNavigate()

  const handleCancel = () => {
    // Clear form data
    setAdminReg({
        password:"",
        username:"",
        
        conpassword:"",
    
    });
  };

  const [adminReg,setAdminReg]=useState({
        password:"",
        username:"",

        conpassword:"",
        
        

  })
  useEffect(()=>{
    console.log("Welcome To AdminPage Page..")
  })

  const{password,username,conpassword}=adminReg

  const onInputChange=(e)=>{
    setAdminReg({...adminReg,[e.target.name]:e.target.value})

  }

 

  const onSubmit = async (e) => {
    e.preventDefault();
    const usernamePattern = /^[a-z1-9A-Z_]+$/;
    if (!usernamePattern.test(username)) {
      alert("Username can only contain letters and underscores.");
    } else {
      if (password === conpassword) {
        try {
          const response = await axios.put("http://localhost:8080/forgetpwd", adminReg);
          alert("Password Updated");
          navigate("/login");
        } catch (error) {
          if (error.response && error.response.data) {
            // The backend response contains the error message
            alert(error.response.data);
          } else {
            // Fallback error message
            alert("An error occurred. Please try again.");
          }
        }
      } else {
        alert("Passwords Are Not Match try again...");
      }
    }
  }
  
 
return(
  <div className="container">
    <div className='title-bar'> 
        <div  className='title-section'>
            <div><img src={logo} className='title-logo'/></div>
            <h1 className='logo'>Italy Silver Choice</h1>
            <h3 style={{fontFamily:'Monotype Corsiva',fontSize:'25px',}}>A Perfect Choice</h3>
        </div>
    </div>
    <div className='log-container'>
      <div className='login'>
        <form onSubmit={(e) => onSubmit(e)}>
          <h1>Reset Password</h1>
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
              <label htmlFor='pwd'>Enter New Password:</label>
              <input 
                type={"password"} 
                className="inputs" 
                name="password" 
                id="password" 
                placeholder="Enter New Password"
                value={password} 
                minLength={8}
                required
                onChange={(e)=>onInputChange(e)}/>
          </div>
          <div className='form-group'>
          <label htmlFor='fpwd'>Confirm New Password:</label>
          <input
                  type={"password"}
                  name="conpassword"
                  id="conpassword"
                  placeholder="Confirm Password"
                  minLength={8}
                  value={conpassword}
                  required
                  onChange={(e) => onInputChange(e)} />
          </div>
          <div className='button-group'>
              <button type='submit' className='logbtn'>
                Submit
              </button>
              <button type='button' className='logbtn'>Cancel</button>
          </div>
        </form>
        <div className="text-center fs-6">
        <Link to="/login">
        Sign-in
        </Link>
        </div>
      </div>
    </div>
  </div>
   
)
}


 // const onSubmit =async (e)=>{
  //     e.preventDefault()
  //     const usernamePattern = /^[a-zA-Z_]+$/;
  //   if (!usernamePattern.test(username)) {
  //     alert("Username can only contain letters and underscores.");
  //   }else
  //     //check password match
  //     if(password===conpassword){
  //     await axios.post("http://localhost:8090/register",adminReg)
  //     alert("Registration Completed...")
  //     navigate("/login")}
  //     else(
  //       alert("Passwords Are Not Match try again...")
  //     )
  // }