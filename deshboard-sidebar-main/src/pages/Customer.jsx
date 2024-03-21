import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Table from 'react-bootstrap/Table';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
};

const Customer = () => {
    const [showCxDetails, toggleCxDetails] = useToggle();
    const [showOrder, toggleOrder] = useToggle();
    const [showReturns, toggleReturns] = useToggle();
    const [showPayments, togglePayments] = useToggle();
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddCustomer = () => {
        setShowAddForm(true);
    };

    const handleCancelAdd = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <div className='main-container backcx'>
                <div className='main-title-cx'>
                    <h1>Customer Management</h1>
                </div>

                <div className='btn-container-cx'>
                    <button className='btncx' onClick={toggleCxDetails}>Customers</button>
                    <button className='btncx' onClick={toggleOrder}>Orders</button>
                    <button className='btncx' onClick={toggleReturns}>Returns</button>
                    <button className='btncx' onClick={togglePayments}>Payments</button>
                </div>
            </div>
            <div className='content-container'>
                {showCxDetails && (
                    <div class="cx-details">
                        <h3>Customer Details</h3>
                        <button><Link to="/customer/add">Add Customer</Link> // Use Link to navigate to CustomerForm</button>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>john@example.com</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jane Smith</td>
                                    <td>jane@example.com</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {showOrder && (
                    <div className="cx-details">
                        <h3>Order Details</h3>
                    </div>
                )}
                {showReturns && (
                    <div className="cx-details">
                        <h3>Returns Details</h3>
                    </div>
                )}
                {showPayments && (
                    <div className="cx-details">
                        <h3>Payments Details</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customer;
