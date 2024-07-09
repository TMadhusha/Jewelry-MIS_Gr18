import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBar from '../components/CustomerBar';

function ManageReturns() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    customerId: '',
    orderId: '',
    itemId: '',
    purchaseDate: '',
    returnReason: '',
    comments: '',
    itemCondition: '',
    returnDate: new Date().toISOString().split('T')[0] // Initialize with current date only
  });

  const [orderId, setOrderId] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      setIsFetching(true);
      axios.get(`http://localhost:8080/order/${orderId}`)
        .then(response => {
          const orderData = response.data;
          setFormData(prevState => ({
            ...prevState,
            customerId: orderData.customer.cus_id,
            name: orderData.customer.firstname + " " + orderData.customer.lastname,
            contact: orderData.customer.phoneNo,
            orderId: orderData.orderId
          }));
          setIsFetching(false);
        })
        .catch(error => {
          console.error('Error fetching order details', error);
          setIsFetching(false);
        });
    }
  }, [orderId]);

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
      order: {
        orderId: formData.orderId
      },
      inventory: {
        item_id: formData.itemId
      }
    };

    axios.post('http://localhost:8080/postreturns', requestData)
      .then(response => {
        console.log('Return request submitted', response);
        setFormData({
          name: '',
          contact: '',
          customerId: '',
          orderId: '',
          itemId: '',
          purchaseDate: '',
          returnReason: '',
          comments: '',
          itemCondition: '',
          returnDate: new Date().toISOString().split('T')[0] // Reset with current date only
        });
        setOrderId('');
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
                <label htmlFor="orderId">Order ID:</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  placeholder="Enter Order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                  className="form-control"
                />
                {isFetching && <p>Loading order details...</p>}
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly
                  className="form-control"
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
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerId">Customer ID:</label>
                <input
                  type="text"
                  id="customerId"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemId">Item ID:</label>
                <input
                  type="text"
                  id="itemId"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaseDate">Purchase Date:</label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="returnReason">Return Reason:</label>
                <select
                  id="returnReason"
                  name="returnReason"
                  value={formData.returnReason}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select a reason</option>
                  <option value="defect">Defect</option>
                  <option value="wrong_size">Wrong Size</option>
                  <option value="change_of_mind">Change of Mind</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="itemCondition">Item Condition:</label>
                <select
                  id="itemCondition"
                  name="itemCondition"
                  value={formData.itemCondition}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="damaged">Damaged</option>
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
                  readOnly
                  className="form-control"
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="button-group">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CustomerBar>
  );
}

export default ManageReturns;
