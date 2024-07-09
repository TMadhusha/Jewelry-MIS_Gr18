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
        itemName:"",
        address:"",
        idNumber:"",
        email:"",
        phonenumber:""
        

  })
  useEffect(()=>{
    console.log("Welcome To Supplier Page..")
  })

  const{supname,itemName,address,idNumber,email,phonenumber}=supplier

  const onInputChange=(e)=>{
    setsupplier({...supplier,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const letterPattern = /^[a-zA-Z_]+$/;
    const numberPattern = /^[0-9_]+$/;
  
    if (!letterPattern.test(supplier.supname)) {
      alert("Supplier ID can only contain letters and underscores.");
    } else if (!letterPattern.test(supplier.itemName)) {
      alert("Quantity can only contain letters and underscores.");
    } else if (!numberPattern.test(supplier.idNumber)) {
      alert("Item ID can only contain numbers.");
    } else if (!numberPattern.test(supplier.phonenumber)) {
      alert("Phone Number can only contain numbers.");
    } else {
      try {
        // Attempt to submit the form
        const response = await axios.post("http://localhost:8080/save-supplier", supplier);
        console.log(response.data); // Log the response if needed
  
        // Assuming backend returns a successful response (status 200) or similar for success
        navigate("/supplier"); // Redirect or navigate to another page after successful submission
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // If the backend returns a 400 status (Bad Request), check the error message
          if (error.response.data.includes("IDNUMBER already in use")) {
            alert("IDNUMBER already in use. Please use a different IDNUMBER.");
          } else {
            alert("Error: " + error.response.data); // Display the specific error message from the backend
          }
        } else {
          console.error("Error saving supplier:", error);
          alert("IDNUMBER already in use"); // Generic error message
        }
      }
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
          <label htmlFor='quantity' className='form-label'>Item Name:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='Chain'
            name="itemName"
            required
            value={itemName}
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
          <label htmlFor='item_ID' className='form-label'>ID Number:</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='Do Not Enter V or X'
            name="idNumber"
            required
            value={idNumber}
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