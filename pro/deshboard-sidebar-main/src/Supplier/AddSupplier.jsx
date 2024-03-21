import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


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

  const onChangeInput=(e)=>{
    setsupplier({...supplier,[e.target.name]:e.target.value})

  }

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8080/PSupplier",supplier)
      navigate("/supplier")
  }

  return (
    <div className='py-4'>
      <div className='content-container'>
        <h2><center>Add Supplier Details</center></h2><hr/>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)} >
          <table className='table shadaw'>
              <tr>
                <th><label>Supplier name : </label></th>
                <td><input  type={'text'} 
                            className='form-control' 
                            name="supname" 
                            placeholder={'Ranil'} 
                            value={supname} 
                            onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <th><label>Quantity: </label></th>
              <td><input  type={'text'} 
                          name="quantity" 
                          placeholder={'How Many Piceses'} 
                          className='form-control'
                          value={quantity} 
                          onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <th><label>Adderss: </label></th>
              <td><input  type={'text'} 
                          className='form-control' 
                          name="address" 
                          placeholder={'London'} 
                          value={address} 
                          onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <th><label>Email: </label></th>
              <td><input  type={'text'} 
                          className='form-control'
                          name="email" 
                          placeholder={'Ranil@gmail.com'} 
                          value={email} 
                          onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <th><label>Phone </label></th>
              <td><input  type={'text'} 
                          className='form-control'
                          name="phonenumber" 
                          placeholder={'(+94)'} 
                          value={phonenumber} 
                          onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <th><label>Item-Id: </label></th>
              <td><input  type={'text'} 
                          name="itemid" placeholder={'1'} 
                          value={itemid} 
                          className='form-control'
                          onChange={(e)=>onChangeInput(e)}/></td>
              </tr>

              <tr>
              <td ></td>
              <td>
                
              <button className='btn' >Submit</button> 
              
              <button className='btn' >Cancel</button>
              
              </td>
              </tr>

          </table>

          </form>
          
          
          
          
          
        </div>
      </div>
      
    </div>
  )
}
