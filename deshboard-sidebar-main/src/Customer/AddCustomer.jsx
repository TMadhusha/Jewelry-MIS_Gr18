import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCustomer() {
  let navigate = useNavigate();

  const [customers, setCustomers] = useState({
    firstname: "",
    lastname: "",
    address: "",
    dob: "",
    email: "",
    phoneNo: ""
  });

  const { firstname, lastname, address, dob, email, phoneNo } = customers;

  const onChangeInput = (e) => {
    setCustomers({ ...customers, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8080/postcustomer", customers);
        navigate("/customer");
        window.alert("Registration successful!"); 
    } catch (error) {
        console.error("Error registering customer:", error);
        window.alert("Registration failed. Please try again.");
    }
};


  return (
    <div className='main-container backcx'>
      <div className='content-container'>
        <h2>Register Customer</h2>
        <br />
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <table>
              <tr>
                <th><label>First name: </label></th>
                <td><input type={'text'} name="firstname" placeholder={'First name'} value={firstname} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr>
                <th><label>Last name: </label></th>
                <td><input type={'text'} name="lastname" placeholder={'Last name'} value={lastname} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr>
                <th><label>DOB: </label></th>
                <td><input type={'text'} name="dob" placeholder={'DOB'} value={dob} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr>
                <th><label>Address: </label></th>
                <td><input type={'text'} name="address" placeholder={'Address'} value={address} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr>
                <th><label>Email: </label></th>
                <td><input type={'text'} name="email" placeholder={'Email'} value={email} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr>
                <th><label>Phone No: </label></th>
                <td><input type={'text'} name="phoneNo" placeholder={'Phone No'} value={phoneNo} onChange={(e) => onChangeInput(e)} /></td>
              </tr>
              <tr className='button-container'>
                <td><button className='btn'>Add</button></td>
                <td><button className='btn' onClick={() => navigate("/customer")}>Cancel</button></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
