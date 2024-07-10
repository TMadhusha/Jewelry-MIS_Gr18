import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCart from './AddToCart';
import {useNavigate} from 'react-router-dom';


export default function Bangle() {
  const [bangleItems, setBangleItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  let navigate = useNavigate(); // Initialize useHistory for navigation

  const [newBangle, setNewBangle] = useState({
    itemName: '',
    type: 'bangle',
    actualPrice: '',
    description: '',
    sellingPrice: '',
    availableStock: '',
    image: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBangle({ ...newBangle, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBangle({ ...newBangle, image: reader.result.split(',')[1] }); // Get base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/inventory', newBangle);
      setNewBangle({
        itemName: '',
        type: 'bangle',
        actualPrice: '',
        description: '',
        sellingPrice: '',
        availableStock: '',
        image: ''
      });
      // Refresh the list of bangle items
      const response = await axios.get('http://localhost:8080/inventory/type/bangle');
      setBangleItems(response.data);
    } catch (error) {
      console.error('Error adding new bangle item:', error);
    }
  };

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
        <h1 className="bangleTitle">Bangle</h1>
        <div className="bangleContainer">
          <div className="bangleItems">
            {bangleItems.map((item) => (
              <div className="bangleItem" key={item.item_id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt="Bangle" />
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
