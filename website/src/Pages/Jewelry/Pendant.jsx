import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pendant() {
  const [pendantItems, setPendantItems] = useState([]);

  useEffect(() => {
    // Fetch pendant items from backend when component mounts
    const fetchPendantItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/pendant'); // Replace 'Pendant' with the desired jewelry type
        setPendantItems(response.data); // Assuming response.data is an array of pendant items
      } catch (error) {
        console.error('Error fetching pendant items:', error);
      }
    };

    fetchPendantItems(); // Call the function to fetch pendant items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="pendantTitle">Pendant</h1>
        <div className="pendantContainer">
          <div className="pendantItems">
            {pendantItems.map((item) => (
              <div className="pendantItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Pendant" />
                <h3>{item.itemName}</h3>
                <p>{item.description}</p>
                <p>Rs.{item.sellingPrice}</p>
                {item.availableStock === 0 ? (
                  <p style={{ color: 'red' }}>There is no stock available</p>
                ) : (
                  <p>Available stock {item.availableStock}</p>
                )}
                {item.availableStock > 0 && <button>Add to Cart</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
