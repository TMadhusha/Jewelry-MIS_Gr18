import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';

const ManageReturns = () => {
  const [returns, setReturns] = useState([]);
  const [selectedReturnsId, setSelectedReturnsId] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getreturn');
        setReturns(response.data);
      } catch (error) {
        console.log("Error fetching returns:", error);
      }
    };

    fetchReturns(); 
  }, []);

  const handleRowClick = (returnId) => {
    setSelectedReturnsId(returnId === selectedReturnsId ? null : returnId);
  };

  return (
    <CustomerBar>
      <div>
        <h2>Return Requests</h2>
        <table>
          <thead>
            <tr>
              <th>ReturnRequest ID</th>
              <th>Reason for Return</th>
              <th>preferred Resolution</th>
              <th>Additional Comments</th>
              <th>Customer Details</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(returnData => (
              <tr key={returnData.return_id} onClick={() => handleRowClick(returnData.return_id)}>
                <td>{returnData.return_id}</td>
                <td>{returnData.reason_for_return}</td>
                <td>{returnData.preferred_resolution}</td>
                <td>{returnData.additional_comments_notes}</td>
  
                <td>
                  {returnData.customer &&
                    <div>
                      <p>Customer ID: {returnData.customer.cus_ID}</p>
                      <p>Name: {returnData.customer.firstname} {returnData.customer.lastname}</p>
                      <p>Email: {returnData.customer.email}</p>
                      <p>Phone No: {returnData.customer.phoneNo}</p>
                      <p>Address: {returnData.customer.address}</p>
                    </div>
                  }
                </td>
                <td>
                  {returnData.orderDetails &&
                    <div>
                      <p>Order ID: {returnData.orderDetails.order_id}</p>
                      
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomerBar>
  );
};

export default ManageReturns;
