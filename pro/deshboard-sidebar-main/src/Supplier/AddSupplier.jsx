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

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8080/save-supplier",supplier)
      navigate("/supplier")
  }
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/supplier")
}
return(
  <div className="container">
    <SidebarSup>
    <div className='main-container'>
      <div className='col-md-6 border offset-md-4  rounded p-4 mt-2 shadow'>

          <h2 className='text-center m-4'>Supplier Registeration</h2><hr/>
            <form onSubmit={(e)=>onSubmit(e)} className='form'>
                <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Name:
                </label>
                <input 
                type={"text"}
                className='form-control'
                placeholder='jhon'
                name="supname"
                required
                value={supname}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div className='mb-3'>
                  <label htmlFor='quantity' className='form-label'>
                    Quantity:
                  </label>
                  <input 
                  type={"text"}
                  className='form-control'
                  placeholder='120'
                  name="quantity"
                  required
                  value={quantity}
                  onChange={(e)=>onInputChange(e)}/>

                </div>

                <div className='mb-3'>
                <label htmlFor='address' className='form-label'>
                  Address:
                </label>
                <input 
                type={"text"}
                className='form-control'
                placeholder='Colombo'
                name="address"
                required
                value={address}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div className='mb-3'>
                <label htmlFor='item_ID' className='form-label'>
                  Item_ID:
                </label>
                <input 
                type={"text"}
                className='form-control'
                placeholder='1'
                name="itemid"
                required
                value={itemid}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email:
                </label>
                <input 
                type={"email"}
                className='form-control'
                placeholder='Jhon@gmail.com'
                name="email"
                required
                value={email}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div className='mb-3'>
                <label htmlFor='phonenumber' className='form-label'>
                  Phone Number:
                </label>
                <input 
                type={"text"}
                className='form-control'
                placeholder='0777313216'
                name="phonenumber"
                required
                value={phonenumber}
                onChange={(e)=>onInputChange(e)}/>

                </div>
            <button type='submit' className='btn'>
              Submit
            </button>
            <Link className='btn btn-danger mx-2' to="/supplier">
              Cancel
            </Link>
            </form>
      </div>
    </div>
    </SidebarSup>
  </div>
)
  // return (
  //   <div className='py-4'>
       
  //     <div className='content-container '>
  //       <h2><center>Add Supplier Details</center></h2><hr/>
  //       <br/>
  //       <div>
  //         <form className='form' onSubmit={(e)=>onSubmit(e)} >
  //         <table className='table shadaw'>
  //             <tr>
  //               <th><label>Supplier name : </label></th>
  //               <td><input  type={'text'} 
  //                           className='form-control' 
  //                           name="supname" 
  //                           placeholder={'Jhon'} 
  //                           value={supname} 
  //                           onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Quantity: </label></th>
  //             <td><input  type={'text'} 
  //                         name="quantity" 
  //                         placeholder={'90'} 
  //                         className='form-control'
  //                         value={quantity} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Adderss: </label></th>
  //             <td><input  type={'text'} 
  //                         className='form-control' 
  //                         name="address" 
  //                         placeholder={'London'} 
  //                         value={address} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Email: </label></th>
  //             <td><input  type={'text'} 
  //                         className='form-control'
  //                         name="email" 
  //                         placeholder={'Jhon@gmail.com'} 
  //                         value={email} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Phone </label></th>
  //             <td><input  type={'text'} 
  //                         className='form-control'
  //                         name="phonenumber" 
  //                         placeholder={'(+94)772234510'} 
  //                         maxLength={10}
  //                         value={phonenumber} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Item-Id: </label></th>
  //             <td><input  type={'text'} 
  //                         name="itemid" placeholder={'1'} 
  //                         value={itemid} 
  //                         className='form-control'
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <td ></td>
  //             <td>
                
  //             <button className='btn' onClick={onSubmit} >Submit</button> 
              
  //             <button className='btn' onClick={onSubmit2} >Cancel</button>
              
  //             </td>
  //             </tr>

  //         </table>

  //         </form>
          
          
          
          
          
  //       </div>
  //     </div>
      
  //   </div>
  // )
}