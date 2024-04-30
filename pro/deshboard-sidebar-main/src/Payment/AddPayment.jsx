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

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8090/payment-main",payment)
      navigate("/payment")
  }
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
          <label htmlFor='comment' className='form-label'>Comment</label>
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