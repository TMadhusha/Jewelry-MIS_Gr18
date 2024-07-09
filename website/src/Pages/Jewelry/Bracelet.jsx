import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bracelet() {
  const [braceletItems, setBraceletItems] = useState([]);

  useEffect(() => {
    // Fetch bracelet items from backend when component mounts
    const fetchBraceletItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/Bracelet'); // Replace 'bracelet' with the desired jewelry type
        setBraceletItems(response.data); // Assuming response.data is an array of bracelet items
      } catch (error) {
        console.error('Error fetching bracelet items:', error);
      }
    };

    fetchBraceletItems(); // Call the function to fetch bracelet items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="braceletTitle">Bracelet</h1>
        <div className="braceletContainer">
          <div className="braceletItems">
            {braceletItems.map((item) => (
              <div className="braceletItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Bracelet" />
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
