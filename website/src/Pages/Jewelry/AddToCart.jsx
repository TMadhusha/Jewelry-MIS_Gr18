import axios from "axios";
import React, { useState } from "react"

const AddToCart =({ item, closePopup }) => {
  const [cart,setCart]=useState({
    image:null,
    itemName:"",
    username:"",
    type:"",
    description:"",
    sellingPrice:"",
    quantity:"",
    totalPrice:""
  });

    if (!item) return null;
    const username = sessionStorage.getItem('username');

    const {image,itemName,type,description,sellingPrice,quantity,totalPrice}=cart;

    const onChangeInput = (e) => {
      if (e.target.name === "image"){
        setCart({...cart,image:e.target.files[0] });
      }
      else{
        setCart({...cart,[e.target.name]: e.target.value});
      }
    };

    const onSubmit= async (e) => {
      e.preventDafault();

      try{
        const formData =new FormData();
        formData.append("itemName",itemName);
        formData.append("type",type);
        formData.append("description",description);
        formData.append("sellingPrice",sellingPrice);

        await axios.post("http://localhost:8080/addCart", formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        window.alert("Item added to cart successfully");
      }catch (error) {
        console.error("Error adding product:", error);
        window.alert("Failed to add product. Please try again.");
    }
    }

      return(
        <div className="cart-modal">
      <div className="cart-content">
        <h1>Cart</h1>
          <div className="cart-item">
            <div className="cart-image">
              <img src={`data:image/jpeg;base64,${item.image}`} alt="No Image" name="image" />
            </div>
            <div className="cart-details">
              <div className="cart-field">
                <span name="itemName" value={itemName}>{item.itemName}</span>
              </div>
              <div className="cart-field">
                <span name="type" value={type}>{item.type}</span>
              </div>
              <div className="cart-field">
                <span name="description" value={description}>{item.description}</span>
              </div>
              <div className="cart-field">
                <span name="sellingPrice" value={sellingPrice}>{item.sellingPrice}</span>
              </div>
              <div className="flex">
                <div className="cart-field">
                  <label>Quantity:</label>
                  <input type='number'  name='quantity' style={{width:"100px"}} value={quantity}/>
                </div>
                <div className="cart-field">
                  <label>Total Price:</label>
                  <input type='text'  name='totalPrice' style={{width:"100px"}} value={totalPrice} readOnly/>
                </div>
              </div>
            </div>
          </div>
            <div className="cart-actions">
              <button type="submit">Add</button>
              <button>Cancel</button>
            </div>
      </div>
    </div>
    )


}
export default AddToCart