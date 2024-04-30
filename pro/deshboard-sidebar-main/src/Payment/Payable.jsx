import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import SidebarSup from '../Supplier/SidebarSup';


export default function LiabilityPayment() {

  let navigate=useNavigate()
  const{paymentid}=useParams()

  const [payment,setpayment]=useState({
        comment:"",
        total:"",
  })


  const{comment,total}=payment

  const onInputChange=(e)=>{
    setpayment({...payment,[e.target.name]:e.target.value})

  }
  useEffect(()=>{
    loadsup()
  },[])
  const onSubmit =async (e)=>{
      e.preventDefault()
      await axios.put(`http://localhost:8090/payable/${paymentid}`,payment)
      navigate("/payment")
  }
  const loadsup=async ()=>{
    const result=await axios.get(`http://localhost:8090/load-payable/${paymentid}`)
    setpayment(result.data)
  }
 
return(
  <div classNameName="container">
    <SidebarSup>
  

          <h2 >Edit Payable</h2><hr/>
            <form onSubmit={(e)=>onSubmit(e)}>

            <div className="section"><span>*</span>Payable Updation</div>
            <div className="inner-wrap">
                <label htmlFor='amount' >
                    Amount:
                </label>
                 <input 
                type={"number"}
                name="total"
                required
                value={total}
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
                  name="comment"
                  required
                  value={comment}
                  onChange={(e)=>onInputChange(e)}/>
            </div>

            <button type="submit" className='btn btn-danger mx-2' >Submit</button>       
            <span style={{ marginRight: '10px' }}></span>
            <Link className='btn btn-danger mx-2' to="/payment">
              Back
            </Link>
            </form>
      
    
    </SidebarSup>
  </div>
)
}