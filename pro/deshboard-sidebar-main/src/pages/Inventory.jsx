import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import InventoryBar from '../components/InventoryBar';


const Inventory = () => {
    const [inventory,setInventory]=useState([]);

    const {item_id}=useParams()

  useEffect(()=>{
    loadInv();

  },[])

  const loadInv=async()=>{
    const result=await axios.get("http://localhost:8080/inventory");
    setInventory(result.data);
  }

  const deleteInventory=async (item_id)=>{
    await axios.delete(`http://localhost:8080/inventory/${item_id}`)
    loadInv();
  }
    return (
        <div className='container'>
          <InventoryBar>       
          <div className='main-container'>
            <div className='main-title'>
                <h1>Product Management</h1>
            </div>
            <div>
              <h3>Product details</h3>
                <div className='table-container'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Item Id</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actual Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Selling Price</th>
                        <th scope="col">Available Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        inventory.map((inventory,index)=>(
                        <tr>
                          <th scope="row" key={index}>{index+1}</th>
                          <td>{inventory.itemName}</td>
                          <td>{inventory.type}</td> 
                          <td>{inventory.actualPrice}</td>
                          <td>{inventory.description}</td>
                          <td>{inventory.sellingPrice}</td>
                          <td>{inventory.availableStock}</td>
                          <td><Link className='small-button' to={`/editinv/${inventory.item_id}`}> Update</Link></td>
                           <td> <button className='small-button' onClick={()=>deleteInventory(inventory.item_id)}>Delete</button>
                          </td>
                        </tr> 
                        ))
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div> 
          </InventoryBar>               
        </div>   
    );
};

export default Inventory;