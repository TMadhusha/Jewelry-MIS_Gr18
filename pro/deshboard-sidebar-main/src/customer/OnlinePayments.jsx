import React, { useEffect, useState } from "react";
import axios from "axios";
import '../customer/OnlinePayment.css';
import CustomerBar from "../components/CustomerBar";

const OnlinePayments = () => {
  const [onlinePayments, setOnlinePayments] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const fetchOnlinePayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getpayments');
        setOnlinePayments(response.data);
      } catch (error) {
        console.log("Error fetching payments:", error);
      }
    };

    fetchOnlinePayments(); 
  }, []); 

  const handleRowClick = (transactionId) => {
    setSelectedTransactionId(transactionId === selectedTransactionId ? null : transactionId);
    setSelectedCustomerId(null); // Reset selectedCustomerId when a different transaction is selected
  };

  return (
    <CustomerBar>
      <div>
        <h2>Online Payments Details</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {onlinePayments.map(payment => (
              <tr key={payment.transaction_id} onClick={() => handleRowClick(payment.transaction_id)}>
                <td>{payment.transaction_id}</td>
                <td>${payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.status}</td>
                <td>{payment.payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTransactionId && (
          <div>
            <h2>Customer Information</h2>
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {onlinePayments
                  .filter(payment => payment.transaction_id === selectedTransactionId)
                  .map(payment => (
                    <tr key={payment.customer.id}>
                      <td>{payment.customer.cus_id}</td>
                      <td>{payment.customer.firstname}</td>
                      <td>{payment.customer.lastname}</td>
                      <td>{payment.customer.email}</td>
                      <td>{payment.customer.phoneNo}</td>
                      <td>{payment.customer.address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {selectedCustomerId && (
              <div>
                <h2>Order Details</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Item purchased</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render order details here */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </CustomerBar>
  );
};

export default OnlinePayments;
