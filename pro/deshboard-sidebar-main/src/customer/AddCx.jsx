import React, { useState } from 'react';
import './AddCx.css';

export default function AddCx() {
    const [user, setUser] = useState({
      customerId: '',
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      phoneNo: '',
      hearAbout: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { customerId, firstname, lastname, email, address, phoneNo, hearAbout } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                console.log('User details submitted successfully');
                setSuccessMessage('User added successfully!');
                // Clear the form fields after successful submission
                setUser({
                    customerId: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    address: '',
                    phoneNo: '',
                    hearAbout: ''
                });
            } else {
                console.error('Failed to submit user details');
                setErrorMessage('Failed to add user. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting user details:', error);
            setErrorMessage('Error occurred while adding user. Please try again later.');
        }
    }

    const handleCancel = () => {
        setUser({
          customerId: '',
          firstname: '',
          lastname: '',
          email: '',
          address: '',
          phoneNo: '',
          hearAbout: ''
        });
    }

    return (
        <div className='containerform'>
            <div className='row'>
                <div className='col'>
                    <h2 className='formtitle'>Register User</h2>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="customerId">Customer ID:</label>
                            <input type="text" id="customerId" name="customerId" placeholder="Enter Customer ID" value={customerId} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" id="firstname" name="firstname" placeholder="Enter First Name" value={firstname} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input type="text" id="lastname" name="lastname" placeholder="Enter Last Name" value={lastname} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" placeholder="Enter Address" value={address} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNo">Phone Number:</label>
                            <input type="tel" id="phoneNo" name="phoneNo" placeholder="Enter Phone Number" value={phoneNo} onChange={onInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hearAbout">How They Heard About:</label>
                            <input type="text" id="hearAbout" name="hearAbout" placeholder="How They Heard About" value={hearAbout} onChange={onInputChange} />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn btn-primary">Submit</button><br/>
                            <button type="button" className="btn btn-secondary cancel-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
