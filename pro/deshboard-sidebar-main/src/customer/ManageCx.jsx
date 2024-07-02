import React, { useEffect, useState } from 'react';
import CustomerBar from '../components/CustomerBar'; // Importing CustomerBar component for layout/styling
import axios from 'axios'; // Importing axios for making HTTP requests
import { Link, useParams } from 'react-router-dom'; // Importing Link for navigation and useParams for accessing URL parameters
import '../css/employee.css'; // Importing CSS for styling
import { FaSearch } from 'react-icons/fa'; // Importing search icon

function ManageCx() {
  // State variables
  const [users, setUsers] = useState([]); // Stores the list of users
  const [searchTerm, setSearchTerm] = useState(''); // Stores the current search term
  const [showConfirmation, setShowConfirmation] = useState(false); // Controls the display of the confirmation dialog
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null); // Stores the ID of the customer to delete
  const { cus_id } = useParams(); // Gets the customer ID from the URL parameters (if needed)

  // Fetch users when the component mounts
  useEffect(() => {
    loadUsers(); // Calls the function to load users
  }, []);

  // Function to load users from the backend
  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getcustomer"); // Fetches user data from the backend
      setUsers(response.data); // Sets the fetched data to the users state
    } catch (error) {
      console.error('Error loading users:', error); // Logs error if loading fails
    }
  };

  // Function to handle customer deletion
  const deleteCustomer = async (cus_id) => {
    setCustomerIdToDelete(cus_id); // Stores the ID of the customer to delete
    setShowConfirmation(true); // Shows the confirmation dialog
  };

  // Function to confirm deletion
  const confirmDelete = async () => {
    setShowConfirmation(false); // Hides the confirmation dialog
    try {
      await axios.delete(`http://localhost:8080/customer/${customerIdToDelete}`); // Sends delete request to the backend
      loadUsers(); // Reloads the users after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error); // Logs error if deletion fails
    }
  };

  // Function to handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Updates search term state
  };

  // Filters users based on the search term
  const filteredUsers = users.filter(user => {
    return (
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Render the component
  return (
    <CustomerBar> {/* Wraps the component for layout/styling */}
      <div className='container2'>
        <div className='py-4'>
          <h1 className='table-title'>Customer Details</h1> {/* Table title */}
          <div className='container'>
            <div className='section'>
              <Link className='btn' to="/addcx">Add Customer</Link> {/* Link to add a new customer */}
            </div> 
            <div className='searchAdd-Container section'>
              <div className='search-bar-container'>
                <FaSearch className='search-icon'/> {/* Search icon */}
                <input className='search-input'
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={handleSearch} // Handles search input changes
                />
              </div>
            </div> 
          </div>
        </div>
        <div className='table-container section'>
          <table className='table'> {/* Table for displaying customer details */}
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>How They Heard About</th>
                <th>Registration Date</th>
                <th colSpan={'2'}>Actions</th> {/* Actions column for update and delete */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.cus_id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.hearAbout}</td>
                  <td>{user.registration_date}</td>
                  <td>
                    <Link className="small-button" to={`/updatecx/${user.cus_id}`}>Update</Link> {/* Link to update the customer */}
                  </td>
                  <td>
                    <button className="small-button" onClick={() => deleteCustomer(user.cus_id)}>Delete</button> {/* Button to delete the customer */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmation && ( /* Confirmation dialog for delete action */
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this customer?</p>
            <div>
              <button className="YES" onClick={confirmDelete}>Yes, Delete</button> {/* Confirm delete button */}
              <button className="CANCEL" onClick={() => setShowConfirmation(false)}>Cancel</button> {/* Cancel button */}
            </div>
          </div>
        </div>
      )}
    </CustomerBar>
  );
}

export default ManageCx;
