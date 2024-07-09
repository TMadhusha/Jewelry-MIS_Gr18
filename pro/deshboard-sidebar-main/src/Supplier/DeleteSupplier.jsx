import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import './Sup.css';


export default function EditSupplier() {

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

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8080/delete-supplier/${sup_id}",supplier)
      navigate("/supplier")
  }
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/supplier")
}
return(
  <div className="container">
    <div className='row'>
      <div className='col-md-8 border offset-md-7  rounded p-4 mt-2 shadow'>

          <h2 className='text-center m-4'>Edit Supplier</h2><hr/>
            <form onSubmit={(e)=>onSubmit(e)}>
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
                    Item Name:
                  </label>
                  <input 
                  type={"text"}
                  className='form-control'
                  placeholder='Chain'
                  name="itemName"
                  required
                  value={itemName}
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
                <label htmlFor='ID Number' className='form-label'>
                  ID Number:
                </label>
                <input 
                type={"text"}
                className='form-control'
                placeholder='Do Not Enter V or X'
                name="idNumber"
                required
                value={idNumber}
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
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <Link className='btn btn-danger mx-2' to="/supplier">
              Cancel
            </Link>
            </form>
      </div>
    </div>
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