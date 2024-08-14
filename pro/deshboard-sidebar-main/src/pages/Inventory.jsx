import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import InventoryBar from '../components/InventoryBar';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { item_id } = useParams();

  useEffect(() => {
    loadInv();
  }, []);

  const loadInv = async () => {
    try {
      const result = await axios.get("http://localhost:8080/inventory");
      setInventory(result.data);
    } catch (error) {
      console.error("There was an error loading the inventory!", error);
      window.alert("Failed to load inventory. Please try again later.");
    }
  };

  const deleteInventory = async (item_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/inventory/${item_id}`);
        loadInv();
      } catch (error) {
        console.error("There was an error deleting the inventory item!", error);
        window.alert("Failed to delete item. Please try again later.");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <InventoryBar>
        <div className='main-container'>
          <div className='main-title'>
            <h1>Product Management</h1>
          </div>
          <div>
            <h3>Product details</h3>
            <table>
            <tr><div className='search-containerINV'>
              <input
                type='text'
                placeholder='Search by Item Name'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div></tr>
            </table>

            <div className='table-container'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item Id</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actual Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Image</th>
                    <th scope="col" colSpan={2}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.item_id}>
                      <td>{item.item_id}</td>
                      <td>{item.itemName}</td>
                      <td>{item.type}</td>
                      <td>{item.actualPrice}</td>
                      <td>{item.description}</td>
                      <td>{item.sellingPrice}</td>
                      <td>{item.availableStock === 0 ? <span className="alert-message">Out of Stock</span> : item.availableStock}</td>
                      <td>
                        <img src={`data:image/jpeg;base64,${item.image}`} alt="Item" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      </td>
                      <td>
                        <Link className='small-button' to={`/editinv/${item.item_id}`}>Update</Link>
                      </td>
                      <td>
                        <button className='small-button' onClick={() => deleteInventory(item.item_id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </InventoryBar>
    </div>
  );
};

export default Inventory;
