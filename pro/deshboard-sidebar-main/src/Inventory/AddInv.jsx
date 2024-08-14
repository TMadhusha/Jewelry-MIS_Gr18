import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InventoryBar from '../components/InventoryBar';


export default function AddInv() {
  let navigate = useNavigate();

  const [inventory, setInventory] = useState({
    item_id:"",
    itemName: "",
    type: "",
    actualPrice: "",
    description: "",
    sellingPrice: "",
    availableStock: "",
    image:null
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const { item_id,itemName,type,actualPrice,description,sellingPrice,availableStock,image } = inventory;

  const onChangeInput = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    if(e.target.name === "image"){
      setInventory({...inventory, image: e.target.files[0]});
    } else{
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }

  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Basic validation for each field
    if (!item_id.trim()) {
      errors.item_id = "Item ID is required";
      isValid = false;
    }

    if (!itemName.trim()) {
      errors.itemName = "Item name is required";
      isValid = false;
    }

    if (!type.trim()) {
      errors.type = "Type is required";
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
      const formData = new FormData();
      formData.append('item_id', item_id);
      formData.append('itemName', itemName);
      formData.append('type', type);
      formData.append('actualPrice', actualPrice);
      formData.append('description', description);
      formData.append('sellingPrice', sellingPrice);
      formData.append('availableStock', availableStock);
      formData.append('image', image);
      
      
        await axios.post("http://localhost:8080/inventory", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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

        <h2 style={{ textAlign: 'center'}}>Add New Product</h2>
        <br/>
        <div >
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <table style={{ width: '100%' }}>
            <tr>
                <th style={{ textAlign: 'center' }}><label>Item ID: </label></th>
                <td>
                  <input type={'text'}  name="item_id" placeholder={'Item ID'} value={item_id}  onChange={(e) => onChangeInput(e)} />
                  {errors.item_id && <span className="error">{errors.item_id}</span>}
                </td>
              </tr>
              <tr>
                <th style={{ textAlign: 'center' }}><label>Item name: </label></th>
                <td>
                  <input type={'text'}  name="itemName" placeholder={'Item name'} value={itemName}  onChange={(e) => onChangeInput(e)} />
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
                <th><label>Actual Price: </label></th>
                <td>
                  <input type={'text'} name="actualPrice" placeholder={'Actual Price'} value={actualPrice} onChange={(e) => onChangeInput(e)} />
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
                  <input type={'text'} name="sellingPrice" placeholder={'Selling Price'} value={sellingPrice} onChange={(e) => onChangeInput(e)} />
                  {errors.sellingPrice && <span className="error">{errors.sellingPrice}</span>}
                </td>
              </tr>

              <tr>
                <th><label>Available Stock: </label></th>
                <td>
                  <input type={'text'} name="availableStock" placeholder={'Available Stock'} value={availableStock} onChange={(e) => onChangeInput(e)} />
                  {errors.availableStock && <span className="error">{errors.availableStock}</span>}
                </td>
              </tr>

              <tr>
                  <th><label>Image: </label></th>
                  <td>
                  <input type='file' name="image" onChange={(e) => onChangeImage(e)} />
                  </td>
                </tr>

              
              <tr className='button-container'>
                <td ><button className='btn' type="submit">Add</button></td>
                <td><Link className='btn' to={'/inventory'}>Cancel</Link></td>
              </tr>

            </table>
          </form>
        </div>
    </div>
    </InventoryBar>
    </div>
  );
}

