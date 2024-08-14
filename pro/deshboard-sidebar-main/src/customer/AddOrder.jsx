import React, { useState } from 'react';
// import './AddCx.css';

export default function AddOrder() {
    const [order, setOrder] = useState({
      date: '',
      status: '',
      total_amount: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { date, status, total_amount } = order;

    const onInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/postorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            if (response.ok) {
                console.log('Order details submitted successfully');
                setSuccessMessage('Order added successfully!');
                // Clear the form fields after successful submission
                setOrder({
                  date: '',
                  status: '',
                  total_amount: ''
                });
            } else {
                console.error('Failed to submit order details');
                setErrorMessage('Failed to add order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order details:', error);
            setErrorMessage('Error occurred while adding order. Please try again later.');
        }
    }

    const handleCancel = () => {
        setOrder({
          date: '',
          status: '',
          total_amount: ''
        });
    }

    return (
        <div className='containerform'>
            <div className='row'>
                <div className='col'>
                    <h2 className='formtitle'>Add new order</h2>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input type="date" id="date" name="date" placeholder="Enter Date" value={date} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <input type="text" id="status" name="status" placeholder="Enter Status" value={status} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_amount">Total Amount:</label>
                            <input type="number" id="total_amount" name="total_amount" placeholder="Enter Total Amount" value={total_amount} onChange={onInputChange} />
                        </div>
                       
                        <div className="button-group">
                            <button type="submit" className="btn btn-primary">Add</button><br/>
                            <button type="button" className="btn btn-secondary cancel-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
