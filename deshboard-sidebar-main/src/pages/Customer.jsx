import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
};

const Customer = () => {
    const [showCustomerDetails, toggleCustomerDetails] = useToggle();
    const [showOrderDetails, toggleOrderDetails] = useToggle();
    const [showReturnsDetails, toggleReturnsDetails] = useToggle();
    const [showPaymentsDetails, togglePaymentsDetails] = useToggle();

    const [Customers,setCustomers]=useState([]);

    useEffect(() => {
        loadCustomers();

    },[]);

    const loadCustomers=async ()=>{
        const result=await axios.get("http://localhost:8080/customer");
        console.log(result.data);
    }

    return (
        <div>
            <div className='main-container backcx'>
                <div className='main-title-cx'>
                    <h1>Customer Management</h1>
                </div>

                <div className='btn-container-cx'>
                    <button className='btncx' onClick={toggleCustomerDetails}>Customers</button>
                    <button className='btncx' onClick={toggleOrderDetails}>Orders</button>
                    <button className='btncx' onClick={toggleReturnsDetails}>Returns</button>
                    <button className='btncx' onClick={togglePaymentsDetails}>Payments</button>
                </div>
            </div>
            <div className='content-container'>
                {showCustomerDetails && (
                    <div className="cx-details">
                        <h3>Customer details</h3>
                       <table border={'1'}
                       cellPadding={'1'}
                       cellSpacing={4}>
                        
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Address</th>
                            
                        </tr>
                       </table>
                       <div>
                       <button className='btnemp' >Add</button>
                       <button className='btnemp' >Update</button>
                       <button className='btnemp' >Delete</button>
                       </div>
                       

                    </div>
                )}
                {showOrderDetails && (
                    <div className="cx-details">
                        <h3>Order Details</h3>
                    </div>
                )}
                {showReturnsDetails && (
                    <div className="cx-details">
                        <h3>Returns Details</h3>
                    </div>
                )}
                {showPaymentsDetails && (
                    <div className="cx-details">
                        <h3>Payments Details</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customer;
