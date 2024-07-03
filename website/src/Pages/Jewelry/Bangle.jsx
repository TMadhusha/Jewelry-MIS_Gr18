import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bangle() {
  const [bangleItems, setBangleItems] = useState([]);
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
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
        
        <h2 className='addtitle'>Add New Bangle</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="itemName" value={newBangle.itemName} onChange={handleInputChange} placeholder="Item Name" required />
          <input type="number" name="actualPrice" value={newBangle.actualPrice} onChange={handleInputChange} placeholder="Actual Price" required />
          <input type="text" name="description" value={newBangle.description} onChange={handleInputChange} placeholder="Description" required />
          <input type="number" name="sellingPrice" value={newBangle.sellingPrice} onChange={handleInputChange} placeholder="Selling Price" required />
          <input type="number" name="availableStock" value={newBangle.availableStock} onChange={handleInputChange} placeholder="Available Stock" required />
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          <button type="submit">Add Bangle</button>
        </form>
      </div>
    </section>
  );
}
