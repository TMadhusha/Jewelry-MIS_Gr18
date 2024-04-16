//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SidebarSup from '../Supplier/SidebarSup'
import UpdateSupplier from '../Supplier/UpdateSupplier'
// const useToggle = (initialState = false) => {
//     const [state, setState] = useState(initialState);
//     const toggle = () => setState(!state);
//     return [state, toggle];
// };

const Supplier = () => {
    // const [showSupplierDetails, toggleSupplierDetails] = useToggle();

  

   

    const [supplier,setsupplier]=useState([])
  useEffect(()=>{
    //console.log("Page is Working");
    loadsup();

  },[]);

 const sid=useParams()

  const loadsup=async()=>{
    const result=await axios.get("http://localhost:8080/api/supplier/get-supplier");
    setsupplier(result.data);
  }
  const DeleteUser=async(id)=>{
    await axios.delete(`http://localhost:8080/api/supplier/delete-supplier/${id}`)
    loadsup();
  }

  

    return (
     
        <div>
          <SidebarSup>
            <div className='main-container '>
           

                {/* <div className='btn-container'>
                <button className='btnemp' onClick={toggleSupplierDetails}>Suppliers</button>
               
                </div> */}
            </div>
            <div className='content-container '>
                { (
                    <div className="employee-details">
                       <h3><center>Supplier details</center></h3>
                       <hr/>
                       <div className='table-container'>
                        
                       <table className="table shadow">
  <thead>
    <tr>
      <th scope="col">Sup_Id</th>
      <th scope="col">Supplier name</th>
      <th scope="col">Address</th>
      <th scope="col">ItemId</th>
      <th scope="col">Quantity</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Email</th>
      <th scope="col" colSpan={2}>Action</th>
    </tr>
  </thead>
  <tbody>
    {
      supplier.map((supplier)=>(
      <tr>
          {/* <th scope="row" key={index}>{index+1}</th> */}
          <td>{supplier.sup_id}</td>
          <td>{supplier.supname}</td>
          <td>{supplier.address}</td>
          <td>{supplier.itemid}</td>
          <td>{supplier.quantity}</td>
          <td>{supplier.phonenumber}</td>
          <td>{supplier.email}</td>
          <td>  
          
          <button className='btn btn-danger mx-2' type='buttonn'
          onClick={()=>DeleteUser(supplier.sup_id)}>Delete</button>
          </td>
          <td>
          <Link className='btn mx-2'type='reset'to={`/updateSupplier/${supplier.sup_id}`}>Edit</Link>
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



export default Supplier;