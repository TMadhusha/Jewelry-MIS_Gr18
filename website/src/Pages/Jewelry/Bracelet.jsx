import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCart from './AddToCart';
import { useNavigate } from 'react-router-dom';

export default function Bracelet() {
  const [braceletItems, setBraceletItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  let navigate=useNavigate();

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
        <h1 className="braceletTitle backImg">Bracelet</h1>
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
