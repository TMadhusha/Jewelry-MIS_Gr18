import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Ring() {
  const [ringItems, setRingItems] = useState([]);

  useEffect(() => {
    // Fetch ring items from backend when component mounts
    const fetchRingItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/Ring'); // Replace 'Ring' with the desired jewelry type
        setRingItems(response.data); // Assuming response.data is an array of ring items
      } catch (error) {
        console.error('Error fetching ring items:', error);
      }
    };

    fetchRingItems(); // Call the function to fetch ring items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="ringTitle">Ring</h1>
        <div className="ringContainer">
          <div className="ringItems">
            {ringItems.map((item) => (
              <div className="ringItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Ring" />
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
  );
}
