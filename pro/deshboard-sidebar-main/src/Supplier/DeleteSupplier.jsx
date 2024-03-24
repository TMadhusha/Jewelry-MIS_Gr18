// import React from 'react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function DeleteSupplier() {

  let navigate=useNavigate()

  const [supplier,setsupplier]=useState({
        sup_Id:""
   
  })
  useEffect(()=>{
    console.log("Welcome To Supplier Page..")
  })

  const{sup_ID}=supplier

  const onChangeInput=(e)=>{
    setsupplier({...supplier,[e.target.name]:e.target.value})

  }

  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.post("http://localhost:8080/DSupplier/{$id}",supplier)
      navigate("/supplier")
  }

  return (
    <div className='py-4'>
      <div className='content-container'>
        <h2><center>Delete Supplier Details</center></h2><hr/>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)} >
          <table className='table shadaw'>
              <tr>
                <th><label>Supplier ID : </label></th>
                <td><input  type={'text'} 
                            className='form-control' 
                            name="sup_Id" 
                            placeholder={'Ranil'} 
                            value={sup_ID} 
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
