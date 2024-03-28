import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InventoryBar from '../components/InventoryBar';

export default function AddInv() {
  let navigate = useNavigate();

  const [inventory, setInventory] = useState({
    itemName: "",
    type: "",
    image: "",
    actualPrice: "",
    description: "",
    sellingPrice: "",
    availableStock: "",
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const { itemName,type,image,actualPrice,description,sellingPrice,availableStock } = inventory;

  const onChangeInput = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Basic validation for each field
    if (!itemName.trim()) {
      errors.itemName = "Item name is required";
      isValid = false;
    }

    if (!type.trim()) {
      errors.type = "Type is required";
      isValid = false;
    }

    if (!image.trim()) {
      errors.image = "Item Photo is required";
      isValid = false;
    }

    if (!actualPrice.trim()) {
      errors.actualPrice = "Actual Price is required";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!sellingPrice.trim()) {
      errors.sellingPrice = "Selling Price is required";
      isValid = false;
    }

    if (!availableStock.trim()) {
        errors.availableStock = "Available Stock is required";
        isValid = false;
      }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/inventory", inventory);
        window.alert("Item added succesfully...!");
        navigate("/inventory");
      } catch (error) {
        console.error("Error adding item:", error);
        window.alert("Failed to add item. Please try again.");
      }
    }
  };

  return (
    <div className='container'> 
    <InventoryBar>
    <div className='main-container'>

        <h2>Add New Product</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <table>
              <tr>
                <th><label>Item name: </label></th>
                <td>
                  <input type={'text'} name="itemname" placeholder={'Item name'} value={itemName} onChange={(e) => onChangeInput(e)} />
                  {errors.itemName && <span className="error">{errors.itemName}</span>}
                </td>
              </tr>
              
              <tr>
                <th><label>Type: </label></th>
                <td>
                  <input type={'text'} name="type" placeholder={'Item type'} value={type} onChange={(e) => onChangeInput(e)} />
                  {errors.type && <span className="error">{errors.type}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Image: </label></th>
                <td>
                  <input type={'text'} name="image" placeholder={'Image'} value={image} onChange={(e) => onChangeInput(e)} />
                  {errors.image && <span className="error">{errors.image}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Actual Price: </label></th>
                <td>
                  <input type={'text'} name="actualprice" placeholder={'Actual Price'} value={actualPrice} onChange={(e) => onChangeInput(e)} />
                  {errors.actualPrice && <span className="error">{errors.actualPrice}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Description: </label></th>
                <td>
                  <input type={'text'} name="description" placeholder={'Describtion'} value={description} onChange={(e) => onChangeInput(e)} />
                  {errors.description && <span className="error">{errors.description}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Selling Price: </label></th>
                <td>
                  <input type={'text'} name="sellingprice" placeholder={'Selling Price'} value={sellingPrice} onChange={(e) => onChangeInput(e)} />
                  {errors.sellingPrice && <span className="error">{errors.sellingPrice}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Available Stock: </label></th>
                <td>
                  <input type={'text'} name="stock" placeholder={'Available Stock'} value={availableStock} onChange={(e) => onChangeInput(e)} />
                  {errors.availableStock && <span className="error">{errors.availableStock}</span>}
                </td>
              </tr>

              
              <tr className='button-container'>
                <td ><button className='btn' type="submit">Add</button></td>
                <td><button className='btn'>Cancel</button></td>
              </tr>
            </table>
          </form>
        </div>
    </div>
    </InventoryBar>
    </div>
  );
}