import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

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

    const handleQuantityIncrease = async (cartItem) => {
        const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: (cartItem.quantity + 1) * cartItem.sellingPrice };
        try {
            await axios.put(`http://localhost:8080/putCart/${cartItem.id}`, updatedCartItem);
            loadCart();
            setSelectedItems(selectedItems.map(item => item.id === cartItem.id ? updatedCartItem : item));
        } catch (error) {
            console.error('Error updating cart:', error);
        }
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

    const deleteCart=async (id)=>{
        const confirmDelete = window.confirm("Do you want to remove this item from cart?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/deleteCart/${id}`)
            loadCart();
          }catch(error){
            window.alert("The item cannot be removed from cart...!")
          }
        }  
      }

    return (
        <section>
        <div className="pageStyle">
            <div className="cart-content">
                <h1>My Cart</h1>
            </div>
            <div className="btnContainer">
                <h4>Select Items (0)</h4>
                <button>Clean Cart</button>
            </div>
            <div>
                {myCart.length > 0 ? (
                    <table>
                        <thead>
                            <th colSpan={2}>Product</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                        </thead>
                        <tbody>
                            {myCart.map(cart => (
                                <tr key={cart.id} onClick={() => handleItemClick(cart)} style={{ cursor: 'pointer', backgroundColor: selectedItems.some(item => item.id === cart.id) ? 'lightblue' : 'white' }}>
                                    <td>
                                        <img src={`data:image/jpeg;base64,${cart.image}`} alt={cart.itemName} style={{ width: '50px', height:"50px"}} />
                                    </td>
                                    <td>{cart.itemName}</td>
                                    <td>{cart.description}</td>
                                    <td>
                                        <input type="number" value={cart.quantity}/> 
                                    </td>
                                    <td>Rs. {cart.totalPrice}</td>
                                    <td><MdDelete onClick={()=>deleteCart(cart.id)}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* <button onClick={handleGetPrice}>Get Price</button> */}
                <input type="text" value={`Rs. ${totalPrice}`} readOnly style={{ marginLeft: '10px' }} />
            </div>
            <div className="cart-actions">
                <button className="add-button" type="button" onClick={handleCheckout} disabled={selectedItems.length === 0} style={{marginLeft:"500px"}}>Proceed To Check Out</button>
            </div>
        </div>
        </section>
    );
};

export default MyCart;
