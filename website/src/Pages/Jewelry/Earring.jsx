import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCart from './AddToCart';

export default function Earring() {
  const [earringItems, setEarringItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch earring items from backend when component mounts
    const fetchEarringItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/inventory/type/earring'); // Replace 'Earring' with the desired jewelry type
        setEarringItems(response.data); // Assuming response.data is an array of earring items
      } catch (error) {
        console.error('Error fetching earring items:', error);
      }
    };

    fetchEarringItems(); // Call the function to fetch earring items
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  const handleAddToCart = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="earringTitle">Earring</h1>
        <div className="earringContainer">
          <div className="earringItems">
            {earringItems.map((item) => (
              <div className="earringItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Earring" />
                <h3>{item.itemName}</h3>
                <p>{item.description}</p>
                <p>Rs.{item.sellingPrice}</p>
                {item.availableStock === 0 ? (
                  <p style={{ color: 'red' }}>There is no stock available</p>
                ) : (
                  <p>Available stock {item.availableStock}</p>
                )}
                {item.availableStock > 0 && <button onClick={() => handleAddToCart(item)}>Add to Cart</button>}
              </div>
            ))}
          </div>
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
  );
}
