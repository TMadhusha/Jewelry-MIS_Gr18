import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';


export default function LiabilityPayment() {

  let navigate=useNavigate()
  const{paymentid}=useParams()

  const [payment,setpayment]=useState({
        comment:"",
        paid:"",
  })


  const{comment,paid}=payment

  const onInputChange=(e)=>{
    setpayment({...payment,[e.target.name]:e.target.value})

  }
  useEffect(()=>{
    loadsup()
  },[])
  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.put(`http://localhost:8090/liability/${paymentid}`,payment)
      navigate("/payment")
  }
  const loadsup=async ()=>{
    const result=await axios.get(`http://localhost:8090/update-liability/${paymentid}`)
    setpayment(result.data)
  }
 
return(
  <div classNameName="container">
    <SidebarSup>
  

          <h2 >Edit Liability</h2><hr/>
            <form onSubmit={(e)=>onSubmit(e)}>

            <div className="section"><span>*</span>Personal Information</div>
            <div className="inner-wrap">
                <label htmlFor='amount' >
                    Amount:
                </label>
                 <input 
                type={"number"}
                placeholder='12500'
                name="paid"
                required
                value={paid}
                onChange={(e)=>onInputChange(e)}
                />
            </div>


            <div className="section"></div>
            <div className="inner-wrap">
            <label htmlFor='comment' >
                    Comment:
                  </label>
                  <input 
                  type={"text"}
                  
                  placeholder='Add a Caption'
                  name="comment"
                  required
                  value={comment}
                  onChange={(e)=>onInputChange(e)}/>
            </div>
                       
            <input type="submit" />
            <Link className='btn btn-danger mx-2' to="/payment">
              Back
            </Link>
            </form>
      
    
    </SidebarSup>
  </div>
)
}