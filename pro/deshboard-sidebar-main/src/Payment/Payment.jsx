//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SidebarSup from '../Supplier/SidebarSup'



const Payment = () => {

    const [payment,setpayment]=useState([])
  useEffect(()=>{
   
    loadpayment();

  },[]);

 const {payment_id}=useParams()

  const loadpayment=async()=>{
    const result=await axios.get("http://localhost:8090/get-payment");
    setpayment(result.data);
  }
  // const DeleteUser=async(id)=>{
  //   await axios.delete(`http://localhost:8090/delete-supplier/${id}`)
  //   loadsup();
  // }

  const DeletePayment=async (paymentid)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this Supplier?");
    if(confirmDelete){
      try{
        await axios.delete(`http://localhost:8090/delete/${paymentid}`)
        loadpayment();
      }catch(error){
        window.alert("The SUpplier data can not be deleted...!")
      }
    }  
  }
  

    return (
     
        <div>
          <SidebarSup>
            <div className='main-container '>
           

            
            </div>
            <div className='content-container '>
                { (
                    <div className="employee-details">
                       <h3><center>Payment details</center></h3>
                       <hr/>
                       <div className='table-container'>
                        
                       <table className="table shadow">
  <thead>
    <tr>
      <th scope="col">Payment Id</th>
      <th scope="col">Supplier Id</th>
      <th scope="col">Total</th>
      <th scope="col">Paid</th>
      <th scope="col">Balance</th>
      <th scope="col" >Comment</th>
      <th scope="col" colSpan={2} >Action</th>
    </tr>
  </thead>
  <tbody >
    {
      payment.map((payment)=>(
      <tr>
          
          <td>{payment.paymentid}</td>
          <td>{payment.sup_id}</td>
          <td>{payment.total}</td>
          <td>{payment.paid}</td>
          <td>{payment.balance}</td>
          <td>{payment.comment}</td>
          <td>  
          <button className='btn btn-danger mx-2' type='buttonn'
          onClick={()=>DeletePayment(payment.paymentid)}>Delete</button>
        <span style={{ marginRight: '10px' }}></span>
        <Link className='btn btn-danger mx-2' to="/payment">Add Payable</Link>
        <span style={{ marginRight: '10px' }}></span>
        <Link className='btn btn-danger mx-2' to={`/liability/${payment.paymentid}`}>Add Liability</Link>
         </td>
    </tr>
      ))
    }
    
  </tbody>
</table>
</div>
       
                      

                    </div>
                    

                )}
              
            </div>
            </SidebarSup>
        </div>  
           
    );
};



export default Payment;