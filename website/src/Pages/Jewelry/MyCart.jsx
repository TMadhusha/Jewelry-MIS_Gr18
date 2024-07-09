import axios from "axios";
import React, { useEffect, useState } from "react"

const MyCart = ({username}) =>{
    const [myCart,setMyCart]=useState([]);

    const loadCart=async ()=>{
        const result=await axios.get("http://localhost:8080/getCart");
        setMyCart(result.data);
    }

    useEffect(()=>{
        loadCart();
    },[]);

    if (!username) return null;
    return(
        <div className="cart-modal">
            <div className="cart-content">
                <h1>My Cart</h1>
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default MyCart