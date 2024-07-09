import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
    const [myCart, setMyCart] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    let navigate=useNavigate();

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        setUsername(username);
    }, []);

    useEffect(() => {
        if (username) {
            loadCart();
        }
    }, [username]);

    useEffect(() => {
        // Calculate total price when selectedItems change
        let total = 0;
        selectedItems.forEach(item => {
            total += item.totalPrice;
        });
        setTotalPrice(total);
    }, [selectedItems]);

    const loadCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getCartById/${username}`);
            setMyCart(response.data);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const handleItemClick = (cartItem) => {
        const index = selectedItems.findIndex(item => item.id === cartItem.id);

        if (index === -1) {
            setSelectedItems([...selectedItems, cartItem]);
        } else {
            const updatedSelectedItems = selectedItems.filter(item => item.id !== cartItem.id);
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handleGetPrice = () => {
        let total = 0;
        selectedItems.forEach(item => {
            total += item.totalPrice;
        });
        setTotalPrice(total);
    };

    const handleCheckout = async () => {
        // try {
        //     console.log('Selected Items:', selectedItems);
        //     const response = await axios.post(`http://localhost:8080/mycartAdd`, selectedItems);
        //     // Remaining code
        // } catch (error) {
        //     console.error('Error checking out:', error);
        // }
        navigate("/checkout");
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
                                <tr key={cart.id} onClick={() => handleItemClick(cart)} style={{ cursor: 'pointer', backgroundColor: selectedItems.some(item => item.id === cart.id) ? 'lightblue' : 'white' }}>
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
            <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={handleGetPrice}>Get Price</button>
                <input type="text" value={`Rs. ${totalPrice}`} readOnly style={{ marginLeft: '10px' }} />
            </div>
            <div className="cart-actions">
                <button className="add-button" type="button" onClick={handleCheckout} disabled={selectedItems.length === 0}>Check Out</button>
            </div>
        </div>
    );
};

export default MyCart;
