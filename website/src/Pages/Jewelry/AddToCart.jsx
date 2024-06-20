import React, { useState } from "react"

const AddToCart =({ item, closePopup }) => {
  const [cart,setCart]=useState({
    image:null,
    itemName:"",
    type:"",
    description:"",
    sellingPrice:"",
    quantity:"",
    totalPrice:""
  });

    if (!item) return null;

    const {image,itemName,type,description,sellingPrice,quantity,totalPrice}=cart;



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
              <button>Add</button>
              <button>Cancel</button>
            </div>
      </div>
    </div>
    )


}
export default AddToCart