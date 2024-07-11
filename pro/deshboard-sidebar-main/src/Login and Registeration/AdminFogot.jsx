import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import './log.css';

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
    
  <div className="wrapperr">
  <div className="text-center mt-4 name">
    Forgot Password
  </div>
  <form className="p-3 mt-3" onSubmit={(e) => onSubmit(e)}>
    <table className="table">
      <tbody>
       
        <tr>
          <td><p>Username</p></td>
          <td>
            <div className="form-field d-flex align-items-center">
              <input
                type={"text"}
                name="username"
                id="id"
                placeholder="admin"
                value={username}
                required
                onChange={(e) => onInputChange(e)} />
            </div>
          </td>
        </tr>
        <tr>
          <td><p>Enter Your Password</p></td>
          <td>
            <div className="form-field d-flex align-items-center">
              <input
                type={"password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                minLength={8}
                required
                onChange={(e) => onInputChange(e)} />
            </div>
          </td>
        </tr>
        <tr>
          <td><p>Conform Your Password</p></td>
          <td>
            <div className="form-field d-flex align-items-center">
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
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <div className="form-field2 d-flex align-items-center">
              <button className="btn mt-3" type="submit">Submit</button>
              <span style={{ marginRight: '10px' }}></span>
            
              <button onClick={handleCancel} className="btn mt-3" type="reset">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
  <div className="text-center fs-6">
    <Link to="/login">
      Sign-in
    </Link>
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