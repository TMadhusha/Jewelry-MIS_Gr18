import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bangle() {

    const [bangleItems, setBangleItems] = useState([]);
  
    useEffect(() => {
      // Fetch bangle items from backend when component mounts
      const fetchBangleItems = async () => {
        try {
          const response = await axios.get('http://localhost:8080/inventory/type/bangle'); // Replace 'bangle' with the desired jewelry type
          setBangleItems(response.data); // Assuming response.data is an array of bangle items
        } catch (error) {
          console.error('Error fetching bangle items:', error);
        }
      };
  
      fetchBangleItems(); // Call the function to fetch bangle items
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts
  
  
  return (

    
    <section>
      <div className='pageStyle'>
      <h1 className="bangleTitle">Bangle</h1>
        <div className="bangleContainer">
        <div className="bangleItems">
          {bangleItems.map((item) => (
            <div className="bangleItem" key={item.item_id}>
              <img src={`data:image/jpeg;base64,${item.image}`} alt="Bangle" />
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <p>Rs.{item.sellingPrice}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      </div>
    </section>
    
  )
}
