import axios from "axios";
import React, { useEffect, useState } from "react";

const MyCart = () => {
    const [myCart, setMyCart] = useState([]);
    const [username, setUsername] = useState("");
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        setUsername(username);
    }, []);

    useEffect(() => {
        if (username) {
            loadCart();
        }
    }, [username]);

    const loadCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getCartById/${username}`);
            setMyCart(response.data);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/mycartAdd`, myCart);
            setOrderHistory(response.data);
            setMyCart([]);
            alert('Checkout successful!');
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    const handleCancel = () => {
        // Handle cancel logic here
    };

    return (
        <div className="cart-modal">
            <div className="cart-content">
                <h1>My Cart</h1>
            </div>
            <div className="cart-item">
                {myCart.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCart.map(cart => (
                                <tr key={cart.id}>
                                    <td>
                                        <img src={`data:image/jpeg;base64,${cart.image}`} alt={cart.itemName} style={{ width: '100px' }} />
                                    </td>
                                    <td>{cart.itemName}</td>
                                    <td>{cart.description}</td>
                                    <td>{cart.quantity}</td>
                                    <td>Rs. {cart.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="button-container" style={{ marginLeft: "60px" }}>
                <button onClick={handleCheckout}>CheckOut</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default MyCart;
