import React, { useEffect, useState } from 'react'
import "../Pages/Jewelry/jewelry.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Jewelry() {
  const [inventory, setInventory]=useState([]);

  const loadInventory=async ()=>{
    const result=await axios.get("http://localhost:8080/inventory");
    setInventory(result.data);
  }

  useEffect(()=>{
    loadInventory();
  }, []);

  return (
    <section>
      <div className='jewelryPage'>
        <h1>Collection</h1>
        <div>
           <table>
            <thead>
              <th scope="col">Item Name</th>
              <th scope="col">Type</th>
              <th scope="col">Actual Price</th>
              <th scope="col">Description</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Available Stock</th>
              <th scope='col'>Action</th>              
            </thead>
            <tbody>
              {
                inventory.map((inventory,index)=>(
                <tr>
                  <td>{inventory.itemName}</td>
                  <td>{inventory.type}</td> 
                  <td>{inventory.actualPrice}</td>
                  <td>{inventory.description}</td>
                  <td>{inventory.sellingPrice}</td>
                  <td>{inventory.availableStock}</td>
                  <td><button> Add To Cart</button></td>
                </tr> 
                ))
              }
            </tbody>
           </table>
        </div>
      </div>
    </section>
  )
}
