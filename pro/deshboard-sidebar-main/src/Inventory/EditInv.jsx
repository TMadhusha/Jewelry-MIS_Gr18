import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InventoryBar from '../components/InventoryBar'

export default function EditInv({}) {
  

  let navigate=useNavigate()

  const { item_id } = useParams();
console.log('Item ID:', item_id);


  const [inventory,setInventory]=useState({
    itemName: "",
    type: "",
    actualPrice: "",
    description: "",
    sellingPrice: "",
    availableStock: "",
  })

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const{itemName,type,actualPrice,description,sellingPrice,availableStock} = inventory;

  const onChangeInput=(e)=>{
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  useEffect(()=> {
    loadInventory();
  },[]);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!itemName.trim()) {
      errors.itemName = "Item name is required";
      isValid = false;
    }

    if (!type.trim()) {
      errors.type = "Type is required";
      isValid = false;
    }

    // if (!actualPrice.trim()) {
    //   errors.actualPrice = "Actual Price is required";
    //   isValid = false;
    // }

    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    // if (!sellingPrice.trim()) {
    //   errors.sellingPrice = "Selling Price is required";
    //   isValid = false;
    // }

    if (!availableStock.trim()) {
        errors.availableStock = "Available Stock is required";
        isValid = false;
      }

    setErrors(errors);
    return isValid;
  };

  const onSubmit =async (e)=>{
      e.preventDefault();
      if(validateForm()){
        try{
          await axios.put (`http://localhost:8080/inventory/${item_id}`, inventory);
          window.alert("Updated successfully...!")
          navigate("/inventory");
        }
        catch (error) {
          console.error('Error updating Item Details:', error);
          window.alert("Updation failed...!")
        }    
      }  
  };

  const loadInventory=async ()=>{
    try {
      const result = await axios.get(`http://localhost:8080/inventory/${item_id}`);
      setInventory(result.data);
    } catch (error) {
      window.alert('Error loading item:', error);
    }
  };

  return (
    <div className='container'>
      <InventoryBar>
      <div className='main-container'>
        <h2>Edit Item Details</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e)=>onSubmit(e)}>
          <table>
            <tbody>
             <tr>
                <th><label>Item name: </label></th>
                <td>
                  <input type={'text'} name="itemName" placeholder={'Item name'} value={itemName} onChange={(e) => onChangeInput(e)} />
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

              <tr className='button-container'>
              <td ><button className='btn' type="submit">Update</button></td>
              <td><Link className='btn' to={'/inventory'}>Cancel</Link></td>
              </tr>
              
              </tbody>
          </table>
          </form>
        </div>
      </div>
      </InventoryBar>
    </div>
  )
}