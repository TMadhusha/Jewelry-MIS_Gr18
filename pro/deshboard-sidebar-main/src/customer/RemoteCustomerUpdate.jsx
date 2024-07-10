import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerBar from '../components/CustomerBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RemoteCustomerUpdate() {
    const [customer, setCustomer] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phoneNo: '',
        password: '',
        dp: null
    });
    const [loading, setLoading] = useState(false);

    const { username } = useParams(); // Extract username from URL

    useEffect(() => {
        // Fetch existing customer details based on username when component mounts
        if (username) {
            fetchCustomerDetails(username);
        }
    }, [username]);

    const fetchCustomerDetails = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/remoteCustomersGetById/${username}`);
            if (response.status === 200) {
                setCustomer(response.data); // Set customer state after data is fetched
            } else {
                toast.error('Failed to fetch customer details. Please try again.');
            }
        } catch (error) {
            toast.error('Error occurred while fetching customer details. Please try again later.');
        }
    };

    const validateForm = () => {
        if (!customer.firstname.trim() || !customer.lastname.trim() || !customer.email.trim()) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const onInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const onFileChange = (e) => {
        setCustomer({ ...customer, dp: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        for (const key in customer) {
            formData.append(key, customer[key]);
        }

        try {
            const response = await axios.put(`http://localhost:8080/updateRemoteCustomers/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success('Customer details updated successfully!');
            } else {
                toast.error('Failed to update customer details. Please try again.');
            }
        } catch (error) {
            toast.error('Error occurred while updating customer details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Clear the form fields
        setCustomer({
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phoneNo: '',
            password: '',
            dp: null
        });
    };

    return (
        <CustomerBar>
            <div className='container'>
                <ToastContainer />
                <div className='row'>
                    <div className='col'>
                        <h2 className='form-title'>Update Remote Customer</h2>
                        <form onSubmit={handleSubmit} className="update-form">
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" className="form-control" placeholder="Enter Username" value={customer.username} onChange={onInputChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname">First Name:</label>
                                <input type="text" id="firstname" name="firstname" className="form-control" placeholder="Enter First Name" value={customer.firstname} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name:</label>
                                <input type="text" id="lastname" name="lastname" className="form-control" placeholder="Enter Last Name" value={customer.lastname} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" value={customer.email} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" className="form-control" placeholder="Enter Address" value={customer.address} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNo">Phone Number:</label>
                                <input type="tel" id="phoneNo" name="phoneNo" className="form-control" placeholder="Enter Phone Number" value={customer.phoneNo} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" className="form-control" placeholder="Enter Password" value={customer.password} onChange={onInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dp">Profile Picture:</label>
                                <input type="file" id="dp" name="dp" className="form-control-file" onChange={onFileChange} />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn btn-primary" disabled={loading}>Update</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerBar>
    );
}
