import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';

function ManageReturns() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    customerId: '',
    transactionId: '',
    itemId: '',
    purchaseDate: '',
    returnReason: '',
    comments: '',
    itemCondition: '',
    returnDate: new Date().toISOString().split('T')[0] // Initialize with current date only
  });

  const [transactionId, setTransactionId] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (transactionId) {
      setIsFetching(true);
      axios.get(`http://localhost:8080/sales/${transactionId}`)
        .then(response => {
          const salesData = response.data;
          if (salesData) {
            setFormData(prevState => ({
              ...prevState,
              customerId: salesData.customer.cus_id,
              name: `${salesData.customer.firstname} ${salesData.customer.lastname}`,
              contact: salesData.customer.phoneNo,
              transactionId: salesData.transactionId,
              itemId: salesData.itemId,
              purchaseDate: salesData.date
            }));
          }
          setIsFetching(false);
        })
        .catch(error => {
          console.error('Error fetching transaction details', error);
          setIsFetching(false);
          setError('Error fetching transaction details');
        });
    }
  }, [transactionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      name: formData.name,
      contact: formData.contact,
      purchaseDate: formData.purchaseDate,
      returnReason: formData.returnReason,
      comments: formData.comments,
      itemCondition: formData.itemCondition,
      returnDate: formData.returnDate,
      customer: {
        cus_id: formData.customerId
      },
      salesAndRevenues: {
        transactionId: formData.transactionId,
        itemId: formData.itemId
      }
    };

    axios.post('http://localhost:8080/postreturns', requestData)
      .then(response => {
        console.log('Return request submitted', response);
        setFormData({
          name: '',
          contact: '',
          customerId: '',
          transactionId: '',
          itemId: '',
          purchaseDate: '',
          returnReason: '',
          comments: '',
          itemCondition: '',
          returnDate: new Date().toISOString().split('T')[0] // Reset with current date only
        });
        setTransactionId('');
        setError('');
      })
      .catch(error => {
        console.error('There was an error submitting the return request!', error);
        setError('There was an error submitting the return request!');
      });
  };

  const handleCancel = () => {
    // Implement cancel logic if needed
  };

  return (
    <CustomerBar>
      <div className='containerform'>
        <div className='row'>
          <div className='col'>
            <h2 className='formtitle'>Return Request Form</h2>
            <form onSubmit={handleSubmit} className='tab'>
              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID:</label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="form-control"
                />
                {isFetching && <p>Loading transaction details...</p>}
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact:</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaseDate">Purchase Date:</label>
                <input
                  type="text"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="returnReason">Return Reason:</label>
                <textarea
                  id="returnReason"
                  name="returnReason"
                  value={formData.returnReason}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemCondition">Item Condition:</label>
                <select
                  id="itemCondition"
                  name="itemCondition"
                  value={formData.itemCondition}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select item condition</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="returnDate">Return Date:</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </CustomerBar>
  );
}

export default ManageReturns;