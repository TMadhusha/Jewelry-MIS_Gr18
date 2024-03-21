import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddEmp() {

  let navigate=useNavigate()

  const [employees,setEmployees]=useState({
        firstname:"",
        lastname:"",
        dob:"",
        address:"",
        nic:"",
        email:"",
        phoneNo:"",
        role:""

  })

  const{firstname,lastname,dob,address,nic,email,phoneNo,role}=employees

  const onChangeInput=(e)=>{
    setEmployees({...employees,[e.target.name]:e.target.value})

  }

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8080/employee",employees)
      navigate("/employee")
  }

  return (
    <div className='main-container backemp'>
      <div className='content-container'>
        <h2>Register Employee</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)} >
          <table>
              <tr>
                <th><label>First name: </label></th>
                <td><input type={'text'} name="firstname" placeholder={'First name'} 
                value={firstname} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>Last name: </label></th>
              <td><input type={'text'} name="lastname" placeholder={'Last name'} 
              value={lastname} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>DOB: </label></th>
              <td><input type={'text'} name="dob" placeholder={'DOB'} 
              value={dob} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>Address: </label></th>
              <td><input type={'text'} name="address" placeholder={'Address'} 
              value={address} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>NIC: </label></th>
              <td><input type={'text'} name="nic" placeholder={'NIC'} 
              value={nic} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>Email: </label></th>
              <td><input type={'text'} name="email" placeholder={'email'} 
              value={email} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>Phone No: </label></th>
              <td><input type={'text'} name="phoneNo" placeholder={'Phone No'} 
              value={phoneNo} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr>
              <th><label>Role: </label></th>
              <td><input type={'text'} name="role" placeholder={'Role'} 
              value={role} onChange={(e)=>onChangeInput(e)}/></td>
              </tr>
              <tr className='button-container'>
              <td ><button className='btn' >Add</button></td>
              <td><button className='btn'>Cancel</button></td>
              </tr>
          </table>

          </form>
          
          
          
          
          
        </div>
      </div>
      
    </div>
  )
}
