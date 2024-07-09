import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import '../css/employee.css';

const OrderManage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');
    const [newOrder, setNewOrder] = useState({
        customerId: '',
        orderDate: '',
        totalAmount: '',
        orderStatus: 'Pending',
        paymentMethod: '',
        billingAddress: '',
        customerEmail: '' // Assuming you have this for sending email notifications
    });

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
                if (newStatus === 'Processing') {
                    sendOrderConfirmationEmail(orderId); // Send email on status change
                }
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
            });
    };

    const sendOrderConfirmationEmail = (orderId) => {
        axios.post('http://localhost:8080/api/send-email', {
            to: newOrder.customerEmail, // Assuming this state is set properly
            subject: 'Order Confirmation',
            message: `Your order with ID ${orderId} has been confirmed. Please pick up your order at our shop.`
        })
        .then(response => {
            console.log('Email sent successfully:', response.data);
            // Optionally, show a notification to the user that email has been sent
        })
        .catch(error => {
            console.error('Failed to send email:', error);
        });
    };

    const generateInvoice = (orderId) => {
        axios.post(`http://localhost:8080/api/orders/generate-invoice/${orderId}`, {}, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('There was an error generating the invoice!', error);
            });
    };

    const handleAddOrder = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/orders', newOrder)
            .then(response => {
                setOrders([...orders, response.data]);
                setNewOrder({
                    customerId: '',
                    orderDate: '',
                    totalAmount: '',
                    orderStatus: 'Pending',
                    paymentMethod: '',
                    billingAddress: '',
                    customerEmail: '' // Reset email after order added
                });
                sendOrderConfirmationEmail(response.data.orderId); // Send email on new order
            })
            .catch(error => {
                console.error('There was an error adding the order!', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <CustomerBar>
            <div>
                <h1>Order Management</h1>
                <div>
                    <label>Filter by Status:</label>
                    <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="picked up">Picked up</option>
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
                                <tr key={order.orderId}>a
                                    <td>{order.orderId}</td>
                                    <td>{order.customer.cus_id}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <button onClick={() => handleStatusChange(order.orderId, 'Processing')}>Mark as Processing</button>
                                        <button onClick={() => handleStatusChange(order.orderId, 'Completed')}>Mark as Completed</button>
                                        <button onClick={() => handleStatusChange(order.orderId, 'picked up')}>Mark as Picked up</button>
                                        <button onClick={() => generateInvoice(order.orderId)}>Generate Invoice</button>
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
