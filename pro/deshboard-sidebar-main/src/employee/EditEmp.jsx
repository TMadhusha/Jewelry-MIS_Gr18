import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmployeeBar from '../components/EmployeeBar'

export default function EditEmp() {

  let navigate=useNavigate()

  const { emp_id } = useParams();
console.log('Employee ID:', emp_id);


  const [employee,setEmployees]=useState({
        firstname:"",
        lastname:"",
        address:"",
        email:"",
        phoneNo:"",
        role:""

  })

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const{firstname,lastname,address,email,phoneNo,role}=employee

  const onChangeInput=(e)=>{
    setEmployees({...employee,[e.target.name]:e.target.value})
  };

  useEffect(()=> {
    loadEmployee();
  },[]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Basic validation for each field
    if (!firstname.trim()) {
      window.alert("First name is required");
      isValid = false;
    }

    if (!lastname.trim()) {
      window.alert("Last name is required");
      isValid = false;
    }

    if (!address.trim()) {
      window.alert("Address is required");
      isValid = false;
    }

    if (!email.trim()) {
      window.alert("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert("Email is invalid");
      isValid = false;
    }

    // Validate phone number
    if (!phoneNo.trim()) {
      window.alert("Phone number is required");
      isValid = false;
    } else if (isNaN(phoneNo)) {
      window.alert("Text cannot be accepted. Please enter only numeric values for the phone number.");
      isValid = false;
    } else if (phoneNo.length !== 10) {
      window.alert("Phone number must contain 10 digits");
      isValid = false;
    }

    if (!role.trim()) {
      window.alert("Role is required");
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit =async (e)=>{
      e.preventDefault();
      if(validateForm()){
        try{
          await axios.put(`http://localhost:8080/employee/${emp_id}`,employee);
          window.alert("Updated successfully...!")
          navigate("/employee");
        }
        catch (error) {
          console.error('Error updating employee:', error);
          window.alert("Updation failed...!")
        }    
      }  
  };

  const loadEmployee=async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/employee/${emp_id}`);
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
                value={firstname} onChange={(e)=>onChangeInput(e)} /> 
                {errors.firstname && <span className="error">{errors.firstname}</span>}
                </td>
              </tr>
              <tr>
              <th><label>Last name: </label></th>
              <td><input type={'text'} name="lastname" placeholder={'Last name'} 
              value={lastname} onChange={(e)=>onChangeInput(e)}/>
              {errors.lastname && <span className="error">{errors.lastname}</span>}
              </td>
              </tr>
              <tr>
              <th><label>Address: </label></th>
              <td><input type={'text'} name="address" placeholder={'Address'} 
              value={address} onChange={(e)=>onChangeInput(e)}/>
              {errors.address && <span className="error">{errors.address}</span>}
              </td>
              </tr>
              <tr>
              <th><label>Email: </label></th>
              <td><input type={'text'} name="email" placeholder={'email'} 
              value={email} onChange={(e)=>onChangeInput(e)}/>
              {errors.email && <span className="error">{errors.email}</span>}
              </td>
              </tr>
              <tr>
              <th><label>Phone No: </label></th>
              <td><input type={'text'} name="phoneNo" placeholder={'Phone No'} 
              value={phoneNo} onChange={(e)=>onChangeInput(e)}/>
              {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
              </td>
              </tr>
              <tr>
              <th><label>Role: </label></th>
              <td><input type={'text'} name="role" placeholder={'Role'} 
              value={role} onChange={(e)=>onChangeInput(e)}/>
              {errors.role && <span className="error">{errors.role}</span>}
              </td>
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
