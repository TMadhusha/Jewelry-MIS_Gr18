import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import '../css/employee.css';

const OrderManage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        filterAndSearchOrders();
    }, [filterStatus, search, orders]);

    const fetchOrders = () => {
        axios.get('http://localhost:8080/getorder')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    };

    const filterAndSearchOrders = () => {
        let result = orders;

        // Filter by status
        if (filterStatus) {
            result = result.filter(order => order.orderStatus === filterStatus);
        }

        // Search by order ID or customer ID
        if (search) {
            result = result.filter(order =>
                order.orderId.toString().includes(search) ||
                order.customer.cus_id.toString().includes(search)
            );
        }

        setFilteredOrders(result);
    };

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:8080/orders/${orderId}`, { orderStatus: newStatus })
            .then(response => {
                setOrders(orders.map(order => order.orderId === orderId ? response.data : order));
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
            });
    };

    return (
        <CustomerBar>
            <div>
                <h1>Order Management</h1>
                <div>
                    <label>Filter by Status:</label>
                    <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Picked up">Picked up</option>
                    </select>
                    <label>Search:</label>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Order ID or Customer ID" />
                </div>
                <div className='table-container section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer ID</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.customer.cus_id}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>
                                        {order.orderStatus === 'New' ? (
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                            >
                                                <option value="New">New</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Picked up">Picked up</option>
                                            </select>
                                        ) : (
                                            <span>{order.orderStatus}</span>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleStatusChange(order.orderId, 'Processing')}>Mark as Processing</button>
                                        <button onClick={() => handleStatusChange(order.orderId, 'Completed')}>Mark as Completed</button>
                                        <button onClick={() => handleStatusChange(order.orderId, 'Picked up')}>Mark as Picked up</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CustomerBar>
    );
};

export default OrderManage;
