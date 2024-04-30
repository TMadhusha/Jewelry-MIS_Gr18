import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import "../css/employee.css";
import "../App.css"

export default function AddSupplier() {

  let navigate=useNavigate()

  const [supplier,setsupplier]=useState({
        supname:"",
        quantity:"",
        address:"",
        itemid:"",
        email:"",
        phonenumber:""
        

  })
  useEffect(()=>{
    console.log("Welcome To Supplier Page..")
  })

  const{supname,quantity,address,itemid,email,phonenumber}=supplier

  const onInputChange=(e)=>{
    setsupplier({...supplier,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const letterPattern = /^[a-zA-Z_]+$/;
    const numberPattern = /^[0-9_]+$/;
  
    if (!letterPattern.test(supname)) {
      alert("Supplier ID can only contain letters and underscores.");
    } else if (!numberPattern.test(quantity)) {
      alert("Quantity can only contain numbers.");
    } else if (!numberPattern.test(itemid)) {
      alert("Item ID can only contain numbers.");
    } else if (!numberPattern.test(phonenumber)) {
      alert("Phone Number can only contain numbers.");
    } else {
      // If all validations pass, submit the form
      await axios.post("http://localhost:8090/save-supplier", supplier);
      navigate("/supplier");
    }
  };
  
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/supplier")
}
return(
  <div className="container">
    <SidebarSup>
    <div className='main-container'>
      <div>

          <h2 className='text-center m-4'>Supplier Registeration</h2><hr/>
          <form onSubmit={(e) => onSubmit(e)} className='form'>
  <table className='table'>
    <tbody>
      <tr>
        <td>
          <label htmlFor='name' className='form-label'>Name:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='John'
            name="supname"
            required
            value={supname}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='quantity' className='form-label'>Quantity:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='120'
            name="quantity"
            required
            value={quantity}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='address' className='form-label'>Address:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='Colombo'
            name="address"
            required
            value={address}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='item_ID' className='form-label'>Item_ID:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='1'
            name="itemid"
            required
            value={itemid}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='email' className='form-label'>Email:</label>
        </td>
        <td>
          <input
            type={"email"}
            className='form-control'
            placeholder='John@gmail.com'
            name="email"
            required
            value={email}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='phonenumber' className='form-label'>Phone Number:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='0777313216'
            name="phonenumber"
            required
            value={phonenumber}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
    </tbody>
  </table>
  <button type='submit' className='btn'>Submit</button>
  <span style={{ marginRight: '10px' }}></span>
  <Link className='btn btn-danger mx-2' to="/supplier">Cancel</Link>
</form>

      </div>
    </div>
    </SidebarSup>
  </div>
)
}