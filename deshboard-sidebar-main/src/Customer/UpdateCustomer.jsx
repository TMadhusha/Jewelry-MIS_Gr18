import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCustomer() {
  let navigate = useNavigate();
  let { cus_id } = useParams();

  const [customers, setCustomers] = useState({
    firstname: "",
    lastname: "",
    address: "",
    dob: "",
    email: "",
    phoneNo: ""
  });

  const { firstname, lastname, address, dob, email, phoneNo } = customers;

  useEffect(() => {
    loadCustomerDetails();
  }, []);

  const loadCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/postcustomer/${cus_id}`);
      const customerData = response.data;
      setCustomers(customerData);
    } catch (error) {
      console.error("Error loading customer details:", error);
    }
  };

  const onChangeInput = (e) => {
    setCustomers({ ...customers, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/postcustomer/${cus_id}`, customers);
      navigate("/customer");
      window.alert("Customer details updated successfully!");
    } catch (error) {
      console.error("Error updating customer details:", error);
      window.alert("Failed to update customer details. Please try again.");
    }
  };

  return (
    <div className='main-container backcx'>
      <div className='content-container'>
        <h2>Edit Customer Details</h2>
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
                <td><button className='btn'>Update</button></td>
                <td><button className='btn' onClick={() => navigate("/customer")}>Cancel</button></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
