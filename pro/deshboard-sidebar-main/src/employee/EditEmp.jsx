import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeBar from '../components/EmployeeBar'

export default function EditEmp() {

  let navigate=useNavigate()

  const { id } = useParams();
console.log('Employee ID:', id);


  const [employee,setEmployees]=useState({
        firstname:"",
        lastname:"",
        address:"",
        email:"",
        phoneNo:"",
        role:""

  })

  const{firstname,lastname,address,email,phoneNo,role}=employee

  const onChangeInput=(e)=>{
    setEmployees({...employee,[e.target.name]:e.target.value})

  };

  useEffect(()=> {
    loadEmployee();
  },[]);

  const onSubmit =async (e)=>{
      e.preventDefault();
      try{
        await axios.put(`http://localhost:8080/employee/${id}`,employee);
        window.alert("Updated successfully...!")
        navigate("/employee");
      }
      catch (error) {
        console.error('Error updating employee:', error);
      }      
  };

  const loadEmployee=async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/employee/${id}`);
      setEmployees(result.data);
    } catch (error) {
      window.alert('Error loading employee:', error);
    }
  };

  return (
    <div className='container'>
      <EmployeeBar>
      <div className='main-container'>
        <h2>Edit Employee</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)}>
          <table>
            <tbody>
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
              <th><label>Address: </label></th>
              <td><input type={'text'} name="address" placeholder={'Address'} 
              value={address} onChange={(e)=>onChangeInput(e)}/></td>
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
              </tbody>
          </table>
          </form>
        </div>
      </div>
      </EmployeeBar>
    </div>
  )
}
