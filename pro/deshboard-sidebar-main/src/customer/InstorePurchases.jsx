import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';
import jsPDF from 'jspdf';
import { format } from 'date-fns';

const InstorePurchases = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [formData, setFormData] = useState({
    itemId: '',
    date: format(new Date(), 'yyyy-MM-dd'), // Initialize with current date
    qty: '',
    unitPrice: '',
    totalSalesAmount: '',
    paidAmount: '',
    balance: ''
  });

  const loadCustomers = async () => {
    try {
      const result = await axios.get('http://localhost:8080/getcustomer');
      setCustomers(result.data);
    } catch (error) {
      window.alert('Error loading customers');
      console.error('Error loading customers:', error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.cus_id.toString().includes(searchQuery) ||
    customer.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMakeTransaction = (cus_id) => {
    setSelectedCustomerId(cus_id);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'itemId' && value) {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/sellingPrice/${value}`);
        const sellingPrice = response.data; // Assuming your API returns the selling price

        setFormData(prevState => ({
          ...prevState,
          unitPrice: sellingPrice,
          date: format(new Date(), 'yyyy-MM-dd') // Update date to current date
        }));
      } catch (error) {
        console.error('Error fetching unit price:', error);
        // Handle error (e.g., display an error message to the user)
      }
    }
  };

  const handleCalculateTotalAmount = () => {
    const totalAmount = formData.qty * formData.unitPrice;
    setFormData({
      ...formData,
      totalSalesAmount: totalAmount
    });
  };

  const handleCalculateBalance = () => {
    const balance = formData.totalSalesAmount - formData.paidAmount;
    setFormData({
      ...formData,
      balance: balance
    });
  };

  const handleSaveTransaction = async () => {
    const transactionData = {
      cusId: selectedCustomerId,
      itemId: formData.itemId,
      date: formData.date,
      qty: formData.qty,
      unitPrice: formData.unitPrice,
      totalSalesAmount: formData.totalSalesAmount,
      paidAmount: formData.paidAmount,
      balance: formData.balance,
      status: 'Pending'
    };

    try {
      await axios.post('http://localhost:8080/saveTransaction', transactionData);
      alert('Transaction saved successfully!');
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to save transaction');
    }
  };

  const generatePDFInvoice = () => {
    const pdf = new jsPDF();

    // Set font sizes
    pdf.setFontSize(24);
    pdf.setFontSize(14);

    // Set background color for the heading
    pdf.setFillColor(4, 33, 68); // Set your desired background color
    pdf.rect(0, 0, 210, 30, 'F'); // Draw a filled rectangle as the background

    // Add title and heading with white color
    pdf.setTextColor(255); // Set text color to white
    pdf.setFont("Monotype Corsiva");
    pdf.text("Italy Silver Choice", 10, 15);
    pdf.text("Invoice", 10, 25);

    // Reset text color to black for the rest of the content
    pdf.setTextColor(0);

    // Add transaction details
    pdf.text(`Customer ID: ${selectedCustomerId}`, 10, 40);
    pdf.text(`Item ID: ${formData.itemId}`, 10, 50);
    pdf.text(`Date: ${formData.date}`, 10, 60);  
    pdf.text(`Quantity: ${formData.qty}`, 10, 70);
    pdf.text(`Unit Price: ${formData.unitPrice}`, 10, 80);
    pdf.text(`Total Sales Amount: ${formData.totalSalesAmount}`, 10, 90);
    pdf.text(`Paid Amount: ${formData.paidAmount}`, 10, 100);
    pdf.text(`Balance: ${formData.balance}`, 10, 110);
    pdf.text("---------------------------------------------------------------------------------------------------------------", 10, 120);

    // Add signature line
    pdf.text("Signature of the employee: ___________________", 10, 130);
    pdf.text("Date Signature of the shop: ___________________", 10, 145);

    // Add logo
    const logo = new Image();
    logo.src = '/logo1_small.png'; // Replace 'path_to_your_logo/logo.png' with the actual path to your logo
    pdf.addImage(logo, 'PNG', 150, 2, 40, 26); // Adjust the position and size as needed

    pdf.save('invoice.pdf');
  };

  return (
    <CustomerBar>
      <div className='container'>
        <div className='main-container'>
          <div className='main-title'>
            <h2>New Transaction</h2>
          </div>
          <div className='container'>
            <div>
              <div>
                <h3>Search Customer</h3>
                <input
                  type='text'
                  placeholder='Search by ID or Name'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className='table-container section'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Customer ID</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((cust, index) => (
                      <tr key={index}>
                        <td>{cust.cus_id}</td>
                        <td>{cust.firstname}</td>
                        <td>
                          <button
                            className='small-button'
                            onClick={() => handleMakeTransaction(cust.cus_id)}
                          >
                            Make Transaction
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='margin'>
              <form className='form'>
                <table>
                  <tbody>
                    <tr>
                      <th>Customer ID</th>
                      <td><input type='text' name='cusId' value={selectedCustomerId} readOnly /></td>
                    </tr>
                    <tr>
                      <th>Item ID</th>
                      <td><input
                        type='text'
                        name='itemId'
                        value={formData.itemId}
                        onChange={handleInputChange}
                      /></td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td><input
                        type='date'
                        name='date'
                        value={formData.date}
                        onChange={handleInputChange}
                      /></td>
                    </tr>
                    <tr>
                      <th>Quantity</th>
                      <td><input
                        type='number'
                        name='qty'
                        value={formData.qty}
                        onChange={handleInputChange}
                      /></td>
                    </tr>
                    <tr>
                      <th>Unit Price</th>
                      <td><input
                        type='text'
                        name='unitPrice'
                        value={formData.unitPrice}
                        onChange={handleInputChange}
                      /></td>
                    </tr>
                    <tr>
                      <td><button type='button' onClick={handleCalculateTotalAmount}>Get Total Amount</button></td>
                    </tr>
                    <tr>
                      <th>Total Sales Amount</th>
                      <td><input
                        type='text'
                        name='totalSalesAmount'
                        value={formData.totalSalesAmount}
                        readOnly
                      /></td>
                    </tr>
                    <tr>
                      <th>Paid Amount</th>
                      <td><input
                        type='text'
                        name='paidAmount'
                        value={formData.paidAmount}
                        onChange={handleInputChange}
                      /></td>
                    </tr>
                    <tr>
                      <td><button type='button' onClick={handleCalculateBalance}>Get Balance</button></td>
                    </tr>
                    <tr>
                      <th>Balance</th>
                      <td><input
                        type='text'
                        name='balance'
                        value={formData.balance}
                        readOnly
                      /></td>
                    </tr>
                    <tr>
                      <td><button type='button' className='small-button' onClick={handleSaveTransaction}>Save Transaction</button></td>
                      <td><button type='button' className='small-button' onClick={generatePDFInvoice}>Generate Invoice</button></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CustomerBar>
  );
};

export default InstorePurchases;
