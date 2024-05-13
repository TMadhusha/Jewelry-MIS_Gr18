import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import "../customer/Customer.css";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getordersitem');
        setOrders(response.data); // Assuming response.data is an array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <CustomerBar>
      <div>
        <h1>View Orders</h1>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Pickup Date</th>
              <th>Notes</th>
              <th>Quantity</th>
              <th>Customer </th>
              <th>Item </th>
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
                <td>{order.quantity}</td>
                <td>{order.customer.firstname} {order.customer.lastname}</td>
                <td>{order.inventory.itemName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomerBar>
  );
};

export default ViewOrder;
