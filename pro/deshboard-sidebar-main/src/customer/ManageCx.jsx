import React, { useEffect, useState } from 'react';
import CustomerBar from '../components/CustomerBar';

import axios from 'axios';
// import '../customer/Customer.css';
import { Link, useParams } from 'react-router-dom';
import '../css/employee.css'
import { FaSearch } from 'react-icons/fa';

function ManageCx() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const { cus_id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getcustomer");
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      // Handle error loading users
    }
  };

  const deleteCustomer = async (cus_id) => {
    setCustomerIdToDelete(cus_id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowConfirmation(false);
    try {
      await axios.delete(`http://localhost:8080/customer/${customerIdToDelete}`);
      loadUsers(); // Reload the users after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error deleting user
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <CustomerBar>
      <div className='container2'>
        <div className='py-4'>
          <h1 className='table-title'>Customer Details</h1>
          <div className='container'>
            <div className='section'>
          <Link className='btn' to="/addcx">Add Customer</Link> 
            </div> 
          <div className='searchAdd-Container section'>
            <div className='search-bar-container'>
              <FaSearch className='search-icon'/>
            <input className='search-input'
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
            </div>
            </div> 
          </div>
        </div>
        <div className='table-container section'>
          <table className='table'> 
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>How They Heard About</th>
                <th>registration_date</th>
                <th colSpan={'2'}>Actions</th>
              
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
                    <Link className="small-button" to={`/updatecx/${user.cus_id}`}>Update</Link></td>
                    <td><button class="small-button" onClick={() => deleteCustomer(user.cus_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this customer?</p>
            <div>
              <button className="YES" onClick={confirmDelete}>Yes, Delete</button>
              <button className="CANCEL" onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </CustomerBar>
  );
}

export default ManageCx;
