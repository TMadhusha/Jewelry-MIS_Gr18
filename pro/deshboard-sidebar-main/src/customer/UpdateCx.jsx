import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerBar from '../components/CustomerBar';

export default function UpdateCx() {
    const [customer, setCustomer] = useState({
        cus_id: '',
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phoneNo: '',
        hearAbout: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { cus_id } = useParams(); // Extract cus_id from URL

    useEffect(() => {
        // Fetch existing customer details based on cus_id when component mounts
        if (cus_id) {
            fetchCustomerDetails(cus_id);
        }
    }, [cus_id]);

    const fetchCustomerDetails = async (cus_id) => {
        try {
            const response = await fetch(`http://localhost:8080/customer/${cus_id}`);
            if (response.ok) {
                const data = await response.json();
                setCustomer(data); // Set customer state after data is fetched
            } else {
                console.error('Failed to fetch customer details');
                setErrorMessage('Failed to fetch customer details. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching customer details:', error);
            setErrorMessage('Error occurred while fetching customer details. Please try again later.');
        }
    };

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/customer/${cus_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });
            if (response.ok) {
                console.log('Customer details updated successfully');
                setSuccessMessage('Customer details updated successfully!');
            } else {
                console.error('Failed to update customer details');
                setErrorMessage('Failed to update customer details. Please try again.');
            }
        } catch (error) {
            console.error('Error updating customer details:', error);
            setErrorMessage('Error occurred while updating customer details. Please try again later.');
        }
    }

    const handleCancel = () => {
        // Clear the form fields
        setCustomer({
            cus_id: '',
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phoneNo: '',
            hearAbout: ''
        });
    }

    return (
        <CustomerBar>
        <div className='containerform'>
            <div className='row'>
                <div className='col'>
                    <h2 className='formtitle'>Update Customer</h2>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cus_id">Customer ID:</label>
                            <input type="text" id="cus_id" name="cus_id" placeholder="Enter Customer ID" value={cus_id} onChange={onInputChange} readOnly={!cus_id} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" id="firstname" name="firstname" placeholder="Enter First Name" value={customer.firstname} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input type="text" id="lastname" name="lastname" placeholder="Enter Last Name" value={customer.lastname} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter Email" value={customer.email} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" placeholder="Enter Address" value={customer.address} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNo">Phone Number:</label>
                            <input type="tel" id="phoneNo" name="phoneNo" placeholder="Enter Phone Number" value={customer.phoneNo} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hearAbout">How They Heard About:</label>
                            <input type="text" id="hearAbout" name="hearAbout" placeholder="How They Heard About" value={customer.hearAbout} onChange={onInputChange} />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn btn-primary">Submit</button><br/>
                            <button type="button" className="btn btn-secondary cancel-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </CustomerBar>
    );
}
