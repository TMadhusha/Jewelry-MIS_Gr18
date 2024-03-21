//import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
};

const Supplier = () => {
    const [showSupplierDetails, toggleSupplierDetails] = useToggle();
    

   

    const [supplier,setsupplier]=useState([])
  useEffect(()=>{
    loadsup();

  },[]);

  const{sup_Id}=useParams()

  const loadsup=async()=>{
    const result=await axios.get("http://localhost:8080/GSupplier");
    setsupplier(result.data);

  }

  const deleteSupplier=async(sup_Id)=>{
    await axios.delete(`http://localhost:8080/GSupplier/${sup_Id}`)
    loadsup();
  }

    return (
        <div>
            <div className='main-container backimgsup'>
               

                <div className='btn-container'>
                <button className='btnemp' onClick={toggleSupplierDetails}>Suppliers</button>
               
                </div>
            </div>
            <div className='content-container'>
                {showSupplierDetails && (
                    <div className="employee-details">
                       <h3><center>Supplier details</center></h3>
                       <hr/>
                       <div className='table-container'>
                       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
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
      supplier.map((supplier,index)=>(
      <tr>
          <th scope="row" key={index}>{index+1}</th>
          <td>{supplier.supname}</td>
          <td>{supplier.address}</td>
          <td>{supplier.itemid}</td>
          <td>{supplier.quantity}</td>
          <td>{supplier.phonenumber}</td>
          <td>{supplier.email}</td>
          <td>
              {/* <button className="image-button" onClick={handleClick}>
                    <img src="edit.png" alt="Edit Image" />
              </button> */}
              
              <button className='btn btn-danger' type='buttonn'onClick={()=>deleteSupplier(supplier.sup_Id)}>Delete</button>
          </td>
          <td>
         {/* <button className="image-button" onClick={()=>deleteSupplier(supplier.sup_Id)}>
                    <img src="./components/delete.png" alt="Delete Image" />
              </button>  */}
          <button className='btn 'type='reset'>Edit</button>
          </td>
    </tr>
      ))
    }
    
  </tbody>
</table>
</div>
        <div className='button-container'>
        <Link className='btn' to={"/addsup"}>Add</Link>
        <Link className='btn' to={"/editsup"}>Update</Link>
        <Link className='btn' to={"/deletesup"}>Delete</Link>
        </div>
                      

                    </div>
                    

                )}
              
              
            </div>
        </div>     
    );
};



export default Supplier;