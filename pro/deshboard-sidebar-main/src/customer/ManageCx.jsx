import React, { useEffect, useState } from 'react';
import CustomerBar from '../components/CustomerBar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../customer/Customer.css';
import { Link, useParams } from 'react-router-dom';

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
          <Link className='btnadd' to="/addcx">Add Customer</Link>   
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className='table-container'>
          <Table responsive bordered hover className='customer-table'>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>How They Heard About</th>
                <th>Actions</th>
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
                  <td>
                    <Link className="btnupdate" to={`/updatecx/${user.cus_id}`}>Update</Link>
                    <Button class="btndelete" onClick={() => deleteCustomer(user.cus_id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this customer?</p>
            <div>
              <Button className="YES" onClick={confirmDelete}>Yes, Delete</Button>
              <Button className="CANCEL" onClick={() => setShowConfirmation(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </CustomerBar>
  );
}

export default ManageCx;
