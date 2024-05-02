import React, { useState, useEffect } from 'react';
import CustomerBar from '../components/CustomerBar';

function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/getorders');
            if (!response.ok) {
                throw new Error('Failed to get orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error getting orders:', error);
        }
    };

    const fetchCustomerDetails = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:8080/getcustomer/${customerId}`);
            if (!response.ok) {
                throw new Error('Failed to get customer details');
            }
            const customerData = await response.json();
            setCustomerDetails(customerData);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const handleViewCustomer = (customerId) => {
        fetchCustomerDetails(customerId);
    };

    const handleCloseModal = () => {
        setCustomerDetails(null);
    };

    return (
        <CustomerBar>
            <div>
                <h1>Orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Order Status</th>
                            <th>Pickup Date</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.order_date}</td>
                                <td>{order.total_amount}</td>
                                <td>{order.order_status}</td>
                                <td>{order.pickup_date}</td>
                                <td>{order.notes}</td>
                                <td>
                                    <button onClick={() => handleViewCustomer(order.customer.cus_id)}>View Customer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {customerDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p>Customer ID: {customerDetails.cus_id}</p>
                        <p>Name: {customerDetails.firstname} {customerDetails.lastname}</p>
                        <p>Email: {customerDetails.email}</p>
                        <p>Phone No: {customerDetails.phoneNo}</p>
                        <p>Address: {customerDetails.address}</p>
                    </div>
                </div>
            )}
        </CustomerBar>
    );
}

export default ManageOrder;
