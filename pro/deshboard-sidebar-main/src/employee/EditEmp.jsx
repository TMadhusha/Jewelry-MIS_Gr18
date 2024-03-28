import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditEmp() {

  let navigate=useNavigate()

  const {id}=useParams()

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

  };

  useEffect(()=> {
    loadEmps();
  }, []);

  const onSubmit =async (e)=>{
      e.preventDefault();
      await axios.put(`http://localhost:8080/employee/${id}`,employees);
      navigate("/employee");
  };

  const loadEmps=async ()=>{
      const result=await axios.get(`http://localhost:8080/employee/${id}`);
    setEmployees(result.data);
  }

  return (
    <div className='main-container backemp'>
      <div className='content-container'>
        <h2>Edit Employee</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)}>
          <table>
              <tr>
                <th><label>First name: </label></th>
                <td><input type={'text'} name="firstname" placeholder={'First name'} 
                value={firstname} onChange={(e)=>onChangeInput(e)}/> </td>
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
              <td ><button className='btn' type="submit">Update</button></td>
              <td><Link className='btn' to={'/employee'}>Cancel</Link></td>
              </tr>
          </table>

          </form>
        </div>
      </div>
      
    </div>
  )
}
