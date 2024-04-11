import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import '../customer/Customer.css';


const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend API
    axios.get('http://localhost:8080/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const viewOrderDetail = (orderId) => {
    // Implement logic to navigate to order detail page
    console.log("View order detail for order ID:", orderId);
  };

  return (
    <CustomerBar>
      <div className="order-list-container">
        <h2>Order List</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <button className="detail-button" onClick={() => viewOrderDetail(order.order_id)}>View Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomerBar>
  );
};

export default ManageOrder;
