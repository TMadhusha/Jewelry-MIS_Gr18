import React, { useEffect, useState } from 'react';
import CustomerBar from '../components/CustomerBar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; // Import Button component
import axios from 'axios';
import '../customer/Customer.css';

function ManageCx() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getcustomer");
      setUsers(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  return (
    <CustomerBar>
      <h1 className='table title'>Customer Details</h1>
          <center></center><Button variant="primary" className="mr-2">Add Customer</Button>
          <Button variant="info" className="mr-2">Update Customer</Button>
          <Button variant="danger">Delete Customer</Button><br/><br/><center/>
      <div className='container'>
        <div className='py-4 table-container'>
          <Table className='table border shadow'>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>How They Heard About</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.cus_id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.hearAbout}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </CustomerBar>
  );
}

export default ManageCx;
