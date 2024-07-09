import React, { useEffect, useState } from 'react'
// import "../Pages/Jewelry/jewelry.css"
// import { Link } from 'react-router-dom'
import axios from 'axios';
import AddToCart from './Jewelry/AddToCart';


export default function Jewelry() {
  const [inventory, setInventory]=useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadInventory=async ()=>{
    const result=await axios.get("http://localhost:8080/inventory");
    setInventory(result.data);
  }

  useEffect(()=>{
    loadInventory();
  }, []);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

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
              <th scope="col">Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Selling Price</th>
              <th scope='col'>Action</th>              
            </thead>
            <tbody>
              {
                inventory.map((item,index)=>(
                <tr>
                  <td>{<img src={`data:image/jpeg;base64,${item.image}`} alt="No Image" />}</td>
                  <td>{item.itemName}</td>
                  <td>{item.type}</td> 
                  <td>{item.description}</td>
                  <td>{item.sellingPrice}</td>
                  <td><button onClick={() => handleAddToCart(item)}> Add To Cart</button></td>
                </tr> 
                ))
              }
            </tbody>
           </table>
        </div>
      </div>
      {selectedItem && ( // Only render the UpdateProduct modal if a product is selected
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <AddToCart item={selectedItem} closePopup={closePopup} />
                    </div>
                </div>
            )}
    </section>
  )
}
