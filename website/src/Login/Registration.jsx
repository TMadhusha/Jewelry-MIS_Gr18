import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../Login/loginReg.css"
import axios from 'axios';

export default function Registration() {
  let navigate=useNavigate();
  const [remoteCustomers,setRemoteCustomers]=useState({
    firstname:"",
    lastname:"",
    email:"",
    address:"",
    phoneNo:"",
    username:"",
    password:"",
    cpassword:"",
    dp:null
  });

  const [rcustomers,setRcustomers]=useState([]);

  const {firstname,lastname,email,address,phoneNo,username,password,cpassword,dp}=remoteCustomers;

  const loadRemoteCustomers=async () =>{
      const result=await axios.get("http://localhost:8080/remoteCustomersG");
      setRcustomers(result.data);
  }

  useEffect(() =>{
    loadRemoteCustomers();
  },[]);

  const onChangeInput = (e) =>{
    if (e.target.name === "dp") {
      // Set the image file to state
      setRemoteCustomers({ ...remoteCustomers, dp: e.target.files[0] });
  } else {
      // Set other input values to state
      setRemoteCustomers({ ...remoteCustomers, [e.target.name]: e.target.value });
  }

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
if (!firstname || !lastname || !address || !email || !phoneNo || !username || !password || !cpassword) {
    window.alert("Please fill out all fields");
    return;
}

// Validate email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    window.alert("Please enter a valid email address");
    return;
}

    // Check if password and confirm password match
    if (password !== cpassword) {
        window.alert("Passwords do not match");
        return;
    }

    // Check if username already exists
    const usernameExists = rcustomers.some(remotecustomers => remotecustomers.username === username);
    const emailExists=rcustomers.some(remotecustomers => remotecustomers.email === email);
    if (usernameExists) {
      window.alert("Username already exists");
      return;
    }
    if(emailExists){
      window.alert("Email already exists");
    }

    try {
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname",lastname);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("phoneNo", phoneNo);
        formData.append("username", username);
        formData.append("dp", dp);
        formData.append("password",password);
        if (remoteCustomers.dp) {
          formData.append("dp", remoteCustomers.dp);
        }

        await axios.post("http://localhost:8080/remoteCustomersP", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        window.alert("Registration Successful");
        navigate('/login');
    } catch (error) {
        window.alert("Registration failed, please try again");
        console.error("Registration failed", error);
    }
};

  return (
    <section className='login-section'>
      <div className='reg'>
        <form className='view ' onSubmit={(e) => onSubmit(e)}>
          <div>
            <h1>Registration</h1>
            <div className='form-group'>
              <label htmlFor='firstname'>First Name:</label>
              <input type='text' id='firstname' name='firstname' placeholder='First name' value={firstname} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Last Name:</label>
              <input type='text' id='lastname' name='lastname' placeholder='Last name' value={lastname} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input type='email' id='email' name='email' placeholder='Email' value={email} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input type='text' id='address' name='address' placeholder='Address' value={address} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='phoneNo'>Mobile:</label>
              <input type='tel' id='phoneNo' name='phoneNo' placeholder='Mobile' value={phoneNo} onChange={(e) => onChangeInput(e)}/>
            </div>
            </div>
            <div>
            <div className='form-group'>
              <label htmlFor='uname'>Username:</label>
              <input type='text' id='uname' name='username' placeholder=' Username' value={username} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='pwd'>Password:</label>
              <input type='password' id='pwd' name='password' placeholder='Password' value={password} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='cpwd'>Confirm Password:</label>
              <input type='password' id='cpwd' name='cpassword' placeholder='Confirm password' value={cpassword} onChange={(e) => onChangeInput(e)}/>
            </div>
            <div className='form-group'>
              <label htmlFor='dp'>Image:</label>
              <input type='file' id='dp' name='dp'  onChange={(e) => onChangeInput(e)}/>
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
