import React, { useEffect, useState } from 'react';
import CustomerBar from '../components/CustomerBar';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../customer/Customer.css';
import { Link, useParams } from 'react-router-dom'; // Import useParams hook

function ManageCx() {
  const [users, setUsers] = useState([]);
  const { cus_id } = useParams(); // Extract cus_id from URL

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getcustomer");
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  const deleteCustomer = async (cus_id) => {
    try {
      await axios.delete(`http://localhost:8080/customer/${cus_id}`);
      // After successful deletion, reload the users
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <CustomerBar>
      <div className='container2'>
        <div className='py-4'>
          <h1 className='table-title'>Customer Details</h1>
          <Link className='btnadd' to="/addcx">Add Customer</Link>
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
                <th>Actions</th> {/* Add Actions column */}
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
                  <td>
                    <Link className="btnupdate" to={`/updatecx/${user.cus_id}`}>Update</Link>
                    {/* Pass the user's cus_id to the deleteCustomer function */}
                    <Button class="btndelete" onClick={() => deleteCustomer(user.cus_id)}>Delete</Button>
                  </td>
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
