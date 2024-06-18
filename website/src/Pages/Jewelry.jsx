import React, { useEffect, useState } from 'react'
// import "../Pages/Jewelry/jewelry.css"
// import { Link } from 'react-router-dom'
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

//   const handleAddToCart = async (item) => {
//     const username = sessionStorage.getItem('username');
//     if (!username) {
//         window.alert("Please log in to add items to your cart.");
//         return;
//     }

//     try {
//         await axios.post("http://localhost:8080/addToCart", {
//             username,
//             itemName: item.itemName,
//             type: item.type,
//             description: item.description,
//             sellingPrice: item.sellingPrice,
//             availableStock: item.availableStock
//         });
//         window.alert("Item added to cart successfully!");
//     } catch (error) {
//         window.alert("Failed to add item to cart");
//         console.log("Failed to add item to cart", error);
//     }
// };

  return (
    <section>
      <div className='page'>
        <h1>Collection</h1>
        <div>
           <table>
            <thead>
              <th scope="col">Item Name</th>
              <th scope="col">Type</th>
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
