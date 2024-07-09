import React, { useEffect, useState } from 'react';
import './AddCx.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import CustomerBar from '../components/CustomerBar'; // Import custom component for the layout
import axios from 'axios'; // Import axios for making HTTP requests

export default function AddCx() {
    let navigate = useNavigate(); // Initialize navigation hook to change pages

    // Initialize state for form data and messages
    const [user, setUser] = useState({
        customerId: '',
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phoneNo: '',
        hearAbout: '',
        registration_date: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // For error messages
    const [successMessage, setSuccessMessage] = useState(''); // For success messages

    // Destructure the user object for easier access to individual properties
    const { customerId, firstname, lastname, email, address, phoneNo, hearAbout, registration_date } = user;

    // Fetch the next customer ID when the component mounts
    useEffect(() => {
        const fetchNextCustomerId = async () => {
            try {
                const response = await axios.get('http://localhost:8080/nextCustomerId');
                setUser(prevUser => ({ ...prevUser, customerId: response.data }));
            } catch (error) {
                console.error('Error fetching next customer ID:', error);
                setErrorMessage('Error fetching next customer ID. Please try again later.');
            }
        };
        fetchNextCustomerId();
    }, []);

    // Function to handle input changes and update the state
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); // Update the corresponding field in the user object
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!customerId || !firstname || !lastname || !email || !address || !phoneNo || !hearAbout || !registration_date) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            // Send a POST request to the server to add a new customer
            const response = await fetch('http://localhost:8080/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // Send the user data as JSON
            });
            if (response.ok) {
                // If the request is successful
                console.log('User details submitted successfully');
                window.alert('User added successfully!');
                navigate('/manage-customers'); // Navigate to the manage customers page
                // Clear the form fields after successful submission
                setUser({
                    customerId: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    address: '',
                    phoneNo: '',
                    hearAbout: '',
                    registration_date: ''
                });
                setSuccessMessage('User added successfully!'); // Set a success message
                setErrorMessage(''); // Clear any previous error messages
            } else {
                // If the request fails
                console.error('Failed to submit user details');
                setErrorMessage('Failed to add user. Please try again.'); // Set an error message
            }
        } catch (error) {
            // If there is an error during the fetch operation
            console.error('Error submitting user details:', error);
            setErrorMessage('Error occurred while adding user. Please try again later.'); // Set an error message
        }
    }

    // Function to handle cancel button click and clear the form
    const handleCancel = () => {
        setUser({
            customerId: '',
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            phoneNo: '',
            hearAbout: '',
            registration_date: ''
        });
        setErrorMessage(''); // Clear any previous error messages
        setSuccessMessage(''); // Clear any previous success messages
    }

    // Render the form inside the CustomerBar layout component
    return (
        <CustomerBar>
            <div className='containerform'>
                <div className='row'>
                    <div className='col'>
                        <h2 className='formtitle'>Register User</h2>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>} 
                        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>} 
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="customerId">Customer ID:</label>
                                <input type="text" id="customerId" name="customerId" placeholder="Enter Customer ID" value={customerId} onChange={onInputChange} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname">First Name:</label>
                                <input type="text" id="firstname" name="firstname" placeholder="Enter First Name" value={firstname} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name:</label>
                                <input type="text" id="lastname" name="lastname" placeholder="Enter Last Name" value={lastname} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" placeholder="Enter Address" value={address} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNo">Phone Number:</label>
                                <input type="tel" id="phoneNo" name="phoneNo" placeholder="Enter Phone Number" value={phoneNo} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hearAbout">How They Heard About:</label>
                                <input type="text" id="hearAbout" name="hearAbout" placeholder="How They Heard About" value={hearAbout} onChange={onInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registration_date">Registration Date:</label>
                                <input type="date" id="registration_date" name="registration_date" placeholder="Enter Registration Date" value={registration_date} onChange={onInputChange} required />
                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn btn-primary">Submit</button><br/><br/>
                                <button type="button" className="btn btn-secondary cancel-btn" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CustomerBar>
    );
}
