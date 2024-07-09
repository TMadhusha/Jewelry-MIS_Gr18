import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Necklace() {
  const [necklaceItems, setNecklaceItems] = useState([]);

  useEffect(() => {
    // Fetch necklace items from backend when component mounts
    const fetchNecklaceItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/Necklace'); // Replace 'Necklace' with the desired jewelry type
        setNecklaceItems(response.data); // Assuming response.data is an array of necklace items
      } catch (error) {
        console.error('Error fetching necklace items:', error);
      }
    };

    fetchNecklaceItems(); // Call the function to fetch necklace items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="necklaceTitle">Necklace</h1>
        <div className="necklaceContainer">
          <div className="necklaceItems">
            {necklaceItems.map((item) => (
              <div className="necklaceItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Necklace" />
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
