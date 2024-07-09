import React, { useState, useEffect } from 'react';
import CustomerBar from '../components/CustomerBar';
import '../css/employee.css';

const ManualPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId:'',
    orderId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    paymentAmount: '',
    paymentMethod: '',
    transactionDateTime: '',
    notes: '',
  });

  // Function to fetch the next available Payment ID
  const fetchNextPaymentId = async () => {
    try {
      const response = await fetch('http://localhost:8080/getnextpaymentid');
      if (!response.ok) {
        throw new Error('Failed to fetch next payment ID');
      }
      const data = await response.json();
      setPaymentDetails(prevState => ({
        ...prevState,
        paymentId: data.nextPaymentId // assuming the response is in format { nextPaymentId: 3 }
      }));
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the next Payment ID on component mount
  useEffect(() => {
    fetchNextPaymentId();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/postpayments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit payment');
      }
  
      console.log('Payment submitted successfully');
      // Show alert on successful submission
      alert('Payment submitted successfully');
      // Reset form fields after submission
      setPaymentDetails({
        ...paymentDetails,
        orderId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        paymentAmount: '',
        paymentMethod: '',
        transactionDateTime: '',
        notes: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomerBar>
      <div>
        <h2>Manual Payment Entry</h2>
        <form onSubmit={handleSubmit} className='form'>
          <table>
            <tbody>
              <tr>
                <td>Payment ID:</td>
                <td>
                  <input
                    type="text"
                    name="paymentId"
                    value={paymentDetails.paymentId}
                    readOnly // Make it read-only to prevent user input
                  />
                </td>
              </tr>
              <tr>
                <td>Order ID:</td>
                <td>
                  <input
                    type="text"
                    name="orderId"
                    value={paymentDetails.orderId}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Customer Name:</td>
                <td>
                  <input
                    type="text"
                    name="customerName"
                    value={paymentDetails.customerName}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Customer Email:</td>
                <td>
                  <input
                    type="email"
                    name="customerEmail"
                    value={paymentDetails.customerEmail}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Customer Phone:</td>
                <td>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={paymentDetails.customerPhone}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Payment Amount:</td>
                <td>
                  <input
                    type="number"
                    name="paymentAmount"
                    value={paymentDetails.paymentAmount}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Payment Method:</td>
                <td>
                  <select
                    name="paymentMethod"
                    onChange={handleChange}
                    value={paymentDetails.paymentMethod}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Transaction Date and Time:</td>
                <td>
                  <input
                    type="datetime-local" 
                    name="transactionDateTime"
                    value={paymentDetails.transactionDateTime}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Notes:</td>
                <td>
                  <textarea
                    name="notes"
                    value={paymentDetails.notes}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr className='button-container'>
                <td><button className="btn">Submit Payment</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </CustomerBar>
  );
};

export default ManualPayments;
