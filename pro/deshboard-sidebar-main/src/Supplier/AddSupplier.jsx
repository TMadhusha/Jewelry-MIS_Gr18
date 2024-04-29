import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';
import "./AddSup.css";

export default function AddSupplier() {

  let navigate=useNavigate()


  const handleCancel = () => {
    // Clear form data
    setsupplier({
      supname:"",
      quantity:"",
      address:"",
      itemid:"",
      email:"",
      phonenumber:""
    
    });
  };

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
      await axios.post("http://localhost:8090/save-supplier",supplier)
      navigate("/supplier")
  }
  const onSubmit2 =async (e)=>{
    e.preventDefault()
    
    navigate("/supplier")
}
return(
  <div classNameName="container">
    <SidebarSup>
    {/* <div classNameName='row'> */}
      {/* <div classNameName='main-container'>

          <h2 >Supplier Registeration</h2><hr/>
            <form  classNameName='form'onSubmit={(e)=>onSubmit(e)}>
                <div>
                <label htmlFor='name' classNameName='form-label'>
                  Name:
                </label>
                <input 
                type={"text"}
                classNameName='form-control'
                placeholder='jhon'
                name="supname"
                required
                value={supname}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div classNameName='mb-3'>
                  <label htmlFor='quantity' classNameName='form-label'>
                    Quantity:
                  </label>
                  <input 
                  type={"text"}
                  classNameName='form-control'
                  placeholder='120'
                  name="quantity"
                  required
                  value={quantity}
                  onChange={(e)=>onInputChange(e)}/>

                </div>

                <div classNameName='mb-3'>
                <label htmlFor='address' classNameName='form-label'>
                  Address:
                </label>
                <input 
                type={"text"}
                classNameName='form-control'
                placeholder='Colombo'
                name="address"
                required
                value={address}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div classNameName='mb-3'>
                <label htmlFor='item_ID' classNameName='form-label'>
                  Item_ID:
                </label>
                <input 
                type={"text"}
                classNameName='form-control'
                placeholder='1'
                name="itemid"
                required
                value={itemid}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div classNameName='mb-3'>
                <label htmlFor='email' classNameName='form-label'>
                  Email:
                </label>
                <input 
                type={"email"}
                classNameName='form-control'
                placeholder='Jhon@gmail.com'
                name="email"
                required
                value={email}
                onChange={(e)=>onInputChange(e)}/>

                </div>

                <div classNameName='mb-3'>
                <label htmlFor='phonenumber' classNameName='form-label'>
                  Phone Number:
                </label>
                <input 
                type={"text"}
                classNameName='form-control'
                placeholder='0777313216'
                name="phonenumber"
                required
                value={phonenumber}
                onChange={(e)=>onInputChange(e)}/>

                </div>
            <button type='submit' classNameName='btn btn-primary'>
              Submit
            </button>
            <Link classNameName='btn btn-danger mx-2' to="/supplier">
              Cancel
            </Link>
            </form>
      </div> */}
    {/* </div> */}

    <div className="form-style-10">
<h1>Supplier Registration </h1>
<form onSubmit={(e)=>onSubmit(e)}>
    <div className="section"><span>*</span>Personal Information</div>
    <div className="inner-wrap">
    <label htmlFor='name' >
                  Name:
    </label>
    <input 
                type={"text"}
                placeholder='jhon'
                name="supname"
                required
                value={supname}
                onChange={(e)=>onInputChange(e)}/>
    </div>

    <div className="section"></div>
    <div className="inner-wrap">
    <label htmlFor='quantity' >
                    Quantity:
                  </label>
                  <input 
                  type={"text"}
                  
                  placeholder='120'
                  name="quantity"
                  required
                  value={quantity}
                  onChange={(e)=>onInputChange(e)}/>
    </div>

    <div className="section"></div>
    <div className="inner-wrap">
        <label htmlFor='address' >
                  Address:
                </label>
                <input 
                type={"text"}
                
                placeholder='Colombo'
                name="address"
                required
                value={address}
                onChange={(e)=>onInputChange(e)}/>


    </div>

    <div className="section"></div>
    <div className="inner-wrap">
    <label htmlFor='item_ID' >
                  Item_ID:
                </label>
                <input 
                type={"text"}
                
                placeholder='1'
                name="itemid"
                required
                value={itemid}
                onChange={(e)=>onInputChange(e)}/>


    </div>

    <div className="section"></div>
    <div className="inner-wrap">
    <label htmlFor='email' >
                  Email:
                </label>
                <input 
                type={"email"}
                
                placeholder='Jhon@gmail.com'
                name="email"
                required
                value={email}
                onChange={(e)=>onInputChange(e)}/>


    </div>

    <div className="section"></div>
    <div className="inner-wrap">
    <label htmlFor='phonenumber' >
                  Phone Number:
                </label>
                <input 
                type={"text"}
                
                placeholder='0777313216'
                name="phonenumber"
                required
                value={phonenumber}
                onChange={(e)=>onInputChange(e)}/>

    </div>
    <div className="button-section">
    <input type="submit" />
    <span>&nbsp;</span>
    <input type="reset" onClick={handleCancel}/>
            
          
     <span className="privacy-policy">
     
     </span>
 
    </div>
</form>
</div>
    </SidebarSup>
  </div>
)
  // return (
  //   <div classNameName='py-4'>
       
  //     <div classNameName='content-container '>
  //       <h2><center>Add Supplier Details</center></h2><hr/>
  //       <br/>
  //       <div>
  //         <form classNameName='form' onSubmit={(e)=>onSubmit(e)} >
  //         <table classNameName='table shadaw'>
  //             <tr>
  //               <th><label>Supplier name : </label></th>
  //               <td><input  type={'text'} 
  //                           classNameName='form-control' 
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
  //                         classNameName='form-control'
  //                         value={quantity} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Adderss: </label></th>
  //             <td><input  type={'text'} 
  //                         classNameName='form-control' 
  //                         name="address" 
  //                         placeholder={'London'} 
  //                         value={address} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Email: </label></th>
  //             <td><input  type={'text'} 
  //                         classNameName='form-control'
  //                         name="email" 
  //                         placeholder={'Jhon@gmail.com'} 
  //                         value={email} 
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <th><label>Phone </label></th>
  //             <td><input  type={'text'} 
  //                         classNameName='form-control'
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
  //                         classNameName='form-control'
  //                         onChange={(e)=>onChangeInput(e)}/></td>
  //             </tr>

  //             <tr>
  //             <td ></td>
  //             <td>
                
  //             <button classNameName='btn' onClick={onSubmit} >Submit</button> 
              
  //             <button classNameName='btn' onClick={onSubmit2} >Cancel</button>
              
  //             </td>
  //             </tr>

  //         </table>

  //         </form>
          
          
          
          
          
  //       </div>
  //     </div>
      
  //   </div>
  // )
}