import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import "../css/employee.css";
import "../App.css"


export default function AddPayment() {

  let navigate=useNavigate()

  const [payment,setpayment]=useState({
        
        sup_id:"",
        total:"",
        paid:"",
        balance:"",
        comment:""
        

  })
  useEffect(()=>{
    console.log("Welcome To Payment Page..")
  })

  const{sup_id,total,paid,balance,comment}=payment

  const onInputChange=(e)=>{
    setpayment({...payment,[e.target.name]:e.target.value})

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const letterPattern = /^[a-zA-Z_]+$/;
    
    if (letterPattern.test(sup_id)) {
      alert("Supplier_id can only contain letters and underscores.");
    }else
    try {
      await axios.post("http://localhost:8080/payment-main", payment);
      navigate("/payment");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Display the error message from the backend in an alert
      } else {
        alert("Supplier Id is Not valid"); // Display a generic error message if no specific message is available
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
      <div >

          <h2 className='text-center m-4'>Payment Registeration</h2><hr/>
          <form onSubmit={(e) => onSubmit(e)} className='form'>
  <table className='table'>
    <tbody>
      <tr>
        <td>
          <label htmlFor='sup_id' className='form-label'>Supplier Id</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='1'
            name="sup_id"
            required
            value={sup_id}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='total' className='form-label'>Total Amount</label>
        </td>
        <td>
          <input
            type={"number"}
            className='form-control'
            placeholder='100,000'
            name="total"
            required
            value={total}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='paid' className='form-label'>Paid</label>
        </td>
        <td>
          <input
            type={"number"}
            className='form-control'
            placeholder='25,000'
            name="paid"
            required
            value={paid}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='balance' className='form-label'>Balance</label>
        </td>
        <td>
          <input
            type={"number"}
            className='form-control'
            placeholder='75,000'
            name="balance"
            required
            value={balance}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor='comment' className='form-label'>Re-Mark</label>
        </td>
        <td>
          <input
            type={"text"}
            className='form-control'
            placeholder='add a comment '
            name="comment"
            required
            value={comment}
            onChange={(e) => onInputChange(e)} />
        </td>
      </tr>
     
     <tr>
        <td>
        <button type='submit' className='btn'>Submit</button>
        </td>
            
        
        <td>
        <span style={{ marginRight: '10px' }}></span>
        <Link className='btn btn-danger mx-2' to="/payment">Cancel</Link>
        </td>
     </tr>
    </tbody>
  </table>
  
</form>

      </div>
    </div>
    </SidebarSup>
  </div>
)
}