import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';

const ViewOrder = ({ match }) => {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const orderId = match.params.orderId;
    axios.get(`http://localhost:8080/orders/${orderId}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
        setErrorMessage('Error fetching order details. Please try again.');
      });
  }, [match.params.orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <CustomerBar>
      <div>
        <h2>Order Details</h2>
        <div>
          <h3>Order ID: {order.order_id}</h3>
          <p>Order Date: {order.date}</p>
          <p>Order Status: {order.status}</p>
        </div>
        {/* Display other order details */}
      </div>
    </CustomerBar>
  );
};

export default ViewOrder;
