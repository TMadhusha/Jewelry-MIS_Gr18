import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chain() {
  const [chainItems, setChainItems] = useState([]);

  useEffect(() => {
    // Fetch chain items from backend when component mounts
    const fetchChainItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/chain'); // Replace 'Chain' with the desired jewelry type
        setChainItems(response.data); // Assuming response.data is an array of chain items
      } catch (error) {
        console.error('Error fetching chain items:', error);
      }
    };

    fetchChainItems(); // Call the function to fetch chain items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="chainTitle">Chain</h1>
        <div className="chainContainer">
          <div className="chainItems">
            {chainItems.map((item) => (
              <div className="chainItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Chain" />
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
