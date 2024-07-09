import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import '../css/employee.css';

const OnlineOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

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

    const fetchOrderItems = (orderId) => {
        axios.get(`http://localhost:8080/${orderId}/items`)
            .then(response => {
                setOrderItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the order items!', error);
            });
    };

    const filterAndSearchOrders = () => {
        let result = orders;

        // Filter by status
        if (filterStatus) {
            result = result.filter(order => order.orderStatus === filterStatus);
        }

        // Search by order ID or customer name
        if (search) {
            result = result.filter(order =>
                order.orderId.toString().includes(search) ||
                (order.customer.firstname + ' ' + order.customer.lastname).toLowerCase().includes(search.toLowerCase())
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

    const handleRowClick = (order) => {
        setSelectedOrder(order);
        fetchOrderItems(order.orderId);
    };

    const getOrderRowClassName = (status) => {
        switch (status) {
            case 'New':
                return 'New';
            case 'Completed':
                return 'Completed';
            case 'Picked up':
                return 'Picked-up';
            default:
                return '';
        }
    };

    return (
        <CustomerBar>
            <div>
                <h1>Order Management</h1>
                <div>
                    <label>Filter by Status:</label>
                    <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                        <option value="">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Picked up">Picked up</option>
                        <option value="New">New</option>
                    </select>
                    <label>Search:</label>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Order ID or Customer Name" />
                </div>
                <div className='table-container section'>
                    <h3>Order Details</h3>
                    <table className='order-details-table'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.orderId} className={getOrderRowClassName(order.orderStatus)} onClick={() => handleRowClick(order)}>
                                    <td>{order.orderId}</td>
                                    <td>{order.customer.firstname} {order.customer.lastname}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>
                                        {order.orderStatus === 'New' ? (
                                            <select
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                            >
                                                <option value="Completed">Completed</option>
                                                <option value="Picked up">Picked up</option>
                                                <option value="New">New</option>
                                            </select>
                                        ) : (
                                            <span>{order.orderStatus}</span>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.orderId, 'Completed'); }}>Mark as Completed</button>
                                        <button onClick={(e) => { e.stopPropagation(); handleStatusChange(order.orderId, 'Picked up'); }}>Mark as Picked up</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedOrder && (
                    <div>
                        <div className='table-container section'>
                            <h3>Order Items</h3>
                            <div className='order-items'>
                                {orderItems.map(item => (
                                    <div key={item.orderItemId} className='order-item'>
                                        <p>Item Name: {item.inventory.itemName}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Unit Price: {item.sellingPrice}</p>
                                        <p>Total Price: {item.totalPrice}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='table-container section'>
                            <h3>Billing and Payment Information</h3>
                            <div className='order-details'>
                                <p>Billing Address: {selectedOrder.billingAddress}</p>
                                <p>Payment Method: {selectedOrder.paymentMethod}</p>
                            </div>
                        </div>

                        <div className='table-container section'>
                            <h3>Pickup Information</h3>
                            <div className='order-details'>
                                <p>Pickup Date: {new Date(selectedOrder.pickupDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerBar>
    );
};

export default OnlineOrders;
