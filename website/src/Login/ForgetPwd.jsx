import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPwd() {
    const [email,setEmail]=useState('');
    const [remoteCustomers,setRemoteCustomers]=useState([]);
    let navigate=useNavigate();

    const loadRemoteCustomers =async () =>{
        const result=await axios.get("http://localhost:8080/remoteCustomersG");
        setRemoteCustomers(result.data);
    }

    useEffect (() => {
        loadRemoteCustomers();
    },[]);

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }

    const handleEmailVerification=async (e)=>{
        const emailVerification=remoteCustomers.some(remotecustomers => remotecustomers.email===email);
        if(emailVerification){
            window.alert("Email exists");
            return;
        }else{
            // navigate("/resetPwd");
            window.alert("Please verify your email or create new account")
        }
    }
    
  return (
    <section className='login-section'>
        <div className='login'>
            <form>
                <h1>Forgot Password?</h1>
                <div className='form-group'>
                    <lable> Email</lable>
                    <input type='text' name='email' value={email} onChange={handleEmail} required/>
                </div>
                <div className='button-group'>
                    <button type='submit' onClick={handleEmailVerification}>Continue</button>
                </div>
            </form>

        </div>
    </section>
  )
}
