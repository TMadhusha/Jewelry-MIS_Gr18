import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InventoryBar from '../components/InventoryBar';

export default function EditInv() {
  let navigate = useNavigate();
  const { item_id } = useParams();

  const [inventory, setInventory] = useState({
    itemName: '',
    type: '',
    actualPrice: '',
    description: '',
    sellingPrice: '',
    availableStock: '',
    image: null,
    imagePreview: null,
    existingImage: null 
  });

  const [errors, setErrors] = useState({});
  const { itemName, type, actualPrice, description, sellingPrice, availableStock, imagePreview, existingImage } = inventory;

  const onChangeInput = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setInventory(prevState => ({
        ...prevState,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    } else {
      setInventory(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };

  const loadInventory = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/inventory/${item_id}`);
      setInventory({
        ...result.data,
        existingImage: result.data.image ? `data:image/jpeg;base64,${result.data.image}` : null
      });
    } catch (error) {
      console.error('Error loading item:', error);
      window.alert('Error loading item:', error);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!itemName.trim()) {
      errors.itemName = 'Item name is required';
      isValid = false;
    }

    if (!type.trim()) {
      errors.type = 'Type is required';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!availableStock.trim()) {
      errors.availableStock = 'Available stock is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('type', type);
        formData.append('actualPrice', actualPrice);
        formData.append('description', description);
        formData.append('sellingPrice', sellingPrice);
        formData.append('availableStock', availableStock);
        
        if (inventory.image) {
          formData.append('image', inventory.image);
        }

        await axios.put(`http://localhost:8080/inventory/${item_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        window.alert('Updated successfully!');
        navigate('/inventory');
      } catch (error) {
        console.error('Error updating item details:', error);
        window.alert('Update failed!');
      }
    }
  };

  return (
    <div className="container">
      <InventoryBar>
        <div className="main-container">
          <h2>Edit Item Details</h2>
          <br />
          <div>
            <form className="form" onSubmit={onSubmit}>
              <table>
                <tbody>
                  <tr>
                    <th><label>Item name: </label></th>
                    <td>
                      <input type="text" name="itemName" placeholder="Item name" value={itemName} onChange={onChangeInput} />
                      {errors.itemName && <span className="error">{errors.itemName}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Type: </label></th>
                    <td>
                      <input type="text" name="type" placeholder="Item type" value={type} onChange={onChangeInput} />
                      {errors.type && <span className="error">{errors.type}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Actual Price: </label></th>
                    <td>
                      <input type="text" name="actualPrice" placeholder="Actual Price" value={actualPrice} onChange={onChangeInput} />
                      {errors.actualPrice && <span className="error">{errors.actualPrice}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Description: </label></th>
                    <td>
                      <input type="text" name="description" placeholder="Description" value={description} onChange={onChangeInput} />
                      {errors.description && <span className="error">{errors.description}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Selling Price: </label></th>
                    <td>
                      <input type="text" name="sellingPrice" placeholder="Selling Price" value={sellingPrice} onChange={onChangeInput} />
                      {errors.sellingPrice && <span className="error">{errors.sellingPrice}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Available Stock: </label></th>
                    <td>
                      <input type="text" name="availableStock" placeholder="Available Stock" value={availableStock} onChange={onChangeInput} />
                      {errors.availableStock && <span className="error">{errors.availableStock}</span>}
                    </td>
                  </tr>

                  <tr>
                    <th><label>Image: </label></th>
                    <td>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      ) : existingImage ? (
                        <img src={existingImage} alt="Existing Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      ) : (
                        <span>No Image</span>
                      )}
                      <input type="file" name="image" onChange={onChangeInput} />
                    </td>
                  </tr>

                  <tr className="button-container">
                    <td><button className="btn" type="submit">Update</button></td>
                    <td><Link className="btn" to="/inventory">Cancel</Link></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </InventoryBar>
    </div>
  );
}
