import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import './Customer.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders from backend API
    axios.get('http://localhost:8080/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again.');
        setLoading(false);
      });
  }, []);

  const viewOrderDetail = (orderId) => {
    // Implement logic to navigate to order detail page
    console.log("View order detail for order ID:", orderId);
  };

  const handleSort = (field) => {
    if (field === sortedField) {
      // Toggle sort direction if already sorted by the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default sort direction
      setSortedField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  // Apply sorting and filtering to orders
  let filteredOrders = [...orders];
  if (statusFilter !== '') {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }
  if (sortedField) {
    filteredOrders.sort((a, b) => {
      const aValue = a[sortedField];
      const bValue = b[sortedField];
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <CustomerBar>
      <div className="order-list-container">
        <h2>Order List</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="filter-section">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select id="statusFilter" value={statusFilter} onChange={handleStatusFilter}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="ready for pickup">Ready for Pickup</option>
            <option value="picked up">Picked Up</option>
          </select>
        </div>
        <Link className='orderadd' to="/addorder">Add New Order</Link>
        <table className="order-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('order_id')}>Order ID</th>
              <th onClick={() => handleSort('date')}>Date</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('totalAmount')}>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                  <Link className='viewdetail' to="/viewdetail">View Details</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CustomerBar>
  );
};

export default ManageOrder;
