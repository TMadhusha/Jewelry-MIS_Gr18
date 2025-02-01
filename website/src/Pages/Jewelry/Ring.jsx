import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCart from './AddToCart';
import { useNavigate } from 'react-router-dom';

export default function Ring() {
  const [ringItems, setRingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  let navigate=useNavigate();

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

  const handleAddToCart = (item) => {
    const username = sessionStorage.getItem('username');
    if (!username) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setSelectedItem(item);
    }
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <section>
      <div className='pageStyle'>
        <h1 className="ringTitle backImg">Ring</h1>
        <div className="ringContainer">
          <div className="ringItems">
            {ringItems.map((item) => (
              <div className="ringItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Ring" />
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
