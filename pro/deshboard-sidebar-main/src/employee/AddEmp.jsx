import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddEmp() {
  let navigate = useNavigate();

  const [employees, setEmployees] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    nic: "",
    email: "",
    phoneNo: "",
    role: ""
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const { firstname, lastname, dob, address, nic, email, phoneNo, role } = employees;

  const onChangeInput = (e) => {
    setEmployees({ ...employees, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Basic validation for each field
    if (!firstname.trim()) {
      errors.firstname = "First name is required";
      isValid = false;
    }

    if (!lastname.trim()) {
      errors.lastname = "Last name is required";
      isValid = false;
    }

    if (!dob.trim()) {
      errors.dob = "DOB is required";
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!nic.trim()) {
      errors.nic = "NIC is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!phoneNo.trim()) {
      errors.phoneNo = "Phone number is required";
      isValid = false;
    }

    if (!role.trim()) {
      errors.role = "Role is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/employee", employees);
        window.alert("Employee added succesfully...!");
        navigate("/employee");
      } catch (error) {
        console.error("Error adding employee:", error);
        window.alert("Failed to add employee. Please try again.");
      }
    }
  };

  return (
    <div className='main-container backemp'>
      <div className='content-container'>
        <h2>Register Employee</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <table>
              <tr>
                <th><label>First name: </label></th>
                <td>
                  <input type={'text'} name="firstname" placeholder={'First name'} value={firstname} onChange={(e) => onChangeInput(e)} />
                  {errors.firstname && <span className="error">{errors.firstname}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Last name: </label></th>
                <td>
                  <input type={'text'} name="lastname" placeholder={'Last name'} value={lastname} onChange={(e) => onChangeInput(e)} />
                  {errors.lastname && <span className="error">{errors.lastname}</span>}
                </td>
              </tr>
              <tr>
                <th><label>DOB: </label></th>
                <td>
                  <input type={'text'} name="dob" placeholder={'DOB'} value={dob} onChange={(e) => onChangeInput(e)} />
                  {errors.dob && <span className="error">{errors.dob}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Address: </label></th>
                <td>
                  <input type={'text'} name="address" placeholder={'Address'} value={address} onChange={(e) => onChangeInput(e)} />
                  {errors.address && <span className="error">{errors.address}</span>}
                </td>
              </tr>
              <tr>
                <th><label>NIC: </label></th>
                <td>
                  <input type={'text'} name="nic" placeholder={'NIC'} value={nic} onChange={(e) => onChangeInput(e)} />
                  {errors.nic && <span className="error">{errors.nic}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Email: </label></th>
                <td>
                  <input type={'text'} name="email" placeholder={'Email'} value={email} onChange={(e) => onChangeInput(e)} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Phone No: </label></th>
                <td>
                  <input type={'text'} name="phoneNo" placeholder={'Phone No'} value={phoneNo} onChange={(e) => onChangeInput(e)} />
                  {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Role: </label></th>
                <td>
                  <input type={'text'} name="role" placeholder={'Role'} value={role} onChange={(e) => onChangeInput(e)} />
                  {errors.role && <span className="error">{errors.role}</span>}
                </td>
              </tr>
              <tr className='button-container'>
                <td ><button className='btn' type="submit">Add</button></td>
                <td><Link className='btn' to={'/employee'}>Cancel</Link></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}