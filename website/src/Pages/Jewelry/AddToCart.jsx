import axios from "axios";
import React, { useEffect, useState } from "react"

const AddToCart =({ item, closePopup }) => {
  const [cart,setCart]=useState({
    image:null,
    itemName:"",
    username:"",
    type:"",
    description:"",
    sellingPrice:"",
    quantity:1,
    totalPrice:""
  });

    const username = sessionStorage.getItem('username');

    useEffect(() => {
      setCart((prevCart) => ({
        ...prevCart,
        username: username,
        itemName: item.itemName,
        type: item.type,
        description: item.description,
        sellingPrice: item.sellingPrice,
        image: item.image,
        quantity:1,
        totalPrice: item.sellingPrice // Set initial totalPrice based on sellingPrice and quantity
      }));
    }, [item, username]);

    const {itemName,type,description,sellingPrice,quantity,totalPrice}=cart;

    const onChangeInput = (e) => {
      const { name, value } = e.target;
      setCart((prevCart) => ({
        ...prevCart,
        [name]: value,
        totalPrice: name === 'quantity' ? value * sellingPrice : prevCart.totalPrice // Update totalPrice based on quantity
      }));
    };

    const onSubmit= async (e) => {
      e.preventDefault();

      try{
        const formData =new FormData();
        formData.append("username",username);
        formData.append("itemName",itemName);
        formData.append("type",type);
        formData.append("description",description);
        formData.append("sellingPrice",sellingPrice);
        formData.append("quantity", quantity);
        formData.append("totalPrice", totalPrice);
        // formData.append("image", item.image);

        formData.append("image", new Blob([new Uint8Array(item.image)], { type: "image/jpeg" }));

         // Log formData values
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
      }

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

    if (!item) return null;

      return(
        <div className="cart-modal">
      <div className="cart-content">
        <h1>Cart</h1>
        <form onSubmit={onSubmit}>
          <div className="cart-item">
            <div className="cart-image">
              <img src={`data:image/jpeg;base64,${item.image}`} alt="No Image" name="image" />
            </div>
            <div className="cart-details">
              <div className="cart-field">
                <span>{itemName}</span>
              </div>
              <div className="cart-field">
                <span>{type}</span>
              </div>
              <div className="cart-field">
                <span>{description}</span>
              </div>
              <div className="cart-field">
                <span>{sellingPrice}</span>
              </div>
              <div className="flex">
                <div className="cart-field">
                  <label>Quantity:</label>
                  <input type='number'  name='quantity' style={{width:"100px"}} value={quantity} onChange={onChangeInput} min="1"/>
                </div>
                <div className="cart-field">
                  <label>Total Price:</label>
                  <input type='text'  name='totalPrice' style={{width:"100px"}} value={totalPrice} readOnly/>
                </div>
              </div>
            </div>
          </div>
            <div className="cart-actions">
              <button className="add-button" type="submit">Add To Cart</button>
            </div>
        </form>
      </div>
    </div>
    )


}
export default AddToCart