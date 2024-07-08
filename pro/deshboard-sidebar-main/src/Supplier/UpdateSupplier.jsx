import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';


export default function UpdateSupplier() {

  let navigate=useNavigate()
  const{sup_id}=useParams()

  const [supplier,setsupplier]=useState({
        supname:"",
        itemName:"",
        address:"",
        idNumber:"",
        email:"",
        phonenumber:""
        

  })


  const{supname,itemName,address,idNumber,email,phonenumber}=supplier

  const onInputChange=(e)=>{
    setsupplier({...supplier,[e.target.name]:e.target.value})

  }
  useEffect(()=>{
    loadsup()
  },[])
  const onSubmit = async (e) => {
    e.preventDefault();
    const letterPattern = /^[a-zA-Z_]+$/;
    const numberPattern = /^[0-9_]+$/;
  
    if (!letterPattern.test(supname)) {
      alert("Supplier ID can only contain letters and underscores.");
    } else if (!letterPattern.test(itemName)) {
      alert("Name can only contain letters.");
    } else if (!numberPattern.test(idNumber)) {
      alert("ID can only contain numbers.");
    } else if (!numberPattern.test(phonenumber)) {
      alert("Phone Number can only contain numbers.");
    } else {
      // If all validations pass, submit the form
      await axios.put(`http://localhost:8090/get-supplier/${sup_id}`,supplier)
      navigate("/supplier")
    }
  };
 
  const loadsup=async ()=>{
    const result=await axios.get(`http://localhost:8090/update/${sup_id}`)
    setsupplier(result.data)
  }
 
return(
  <div classNameName="container">
    <SidebarSup>
  

          <h2 >Edit Supplier</h2><hr/>
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
                onChange={(e)=>onInputChange(e)}
                />
            </div>


            <div className="section"></div>
            <div className="inner-wrap">
            <label htmlFor='itemName' >
                    Item Name:
                  </label>
                  <input 
                  type={"text"}
                  
                  placeholder='120'
                  name="itemName"
                  required
                  value={itemName}
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
                <label htmlFor='idNumber' >
                  ID Number:
                </label>
                <input 
                type={"text"}
                
                placeholder='1'
                name="idNumber"
                required
                value={idNumber}
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
       
               <button type='submit' className='btn'>Submit</button>
              <span style={{ marginRight: '10px' }}></span>
            <Link className='btn btn-danger mx-2' to="/supplier">
              Back
            </Link>
            </form>
      
    
    </SidebarSup>
  </div>
)
}