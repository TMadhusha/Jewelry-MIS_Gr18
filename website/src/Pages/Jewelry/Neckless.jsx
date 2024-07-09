import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCart from './AddToCart';

export default function Necklace() {
  const [necklaceItems, setNecklaceItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleAddToCart = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

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
