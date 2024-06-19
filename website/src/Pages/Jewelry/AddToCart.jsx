import React from "react"

const AddToCart =({ item, onClose }) => {
    if (!item) return null;

    return(
        <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h1>Cart</h1>
        <div>
          <p><strong>Item Name:</strong> {item.itemName}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Selling Price:</strong> {item.sellingPrice}</p>
          <p><strong>Available Stock:</strong> {item.availableStock}</p>
          {/* <p><strong>Quantity:</strong> {item.availableStock}</p> */}

        </div>
      </div>
    </div>
    )


}
export default AddToCart