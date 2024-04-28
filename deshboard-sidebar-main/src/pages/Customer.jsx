import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
};

const Customer = () => {
    const [showCustomerDetails, toggleCustomerDetails] = useToggle();
    const [showOrderDetails, toggleOrderDetails] = useToggle();
    const [showReturnsDetails, toggleReturnsDetails] = useToggle();
    const [showPaymentsDetails, togglePaymentsDetails] = useToggle();

    const [customers,setCustomers]=useState([]);

    useEffect(() => {
        loadCustomers();

    },[]);

    const loadCustomers=async ()=>{
        const result=await axios.get("http://localhost:8080/getcustomer");
        setCustomers(result.data);
    }

    return (
        <div>
            <div className='main-container backcx'>
                <div className='main-title-cx'>
                    <h1>Customer Management</h1>
                </div>

                <div className='btn-container-cx'>
                    <button className='btncx' onClick={toggleCustomerDetails}>Customers</button>
                    <button className='btncx' onClick={toggleOrderDetails}>Orders</button>
                    <button className='btncx' onClick={toggleReturnsDetails}>Returns</button>
                    <button className='btncx' onClick={togglePaymentsDetails}>Payments</button>
                </div>
            </div>
            <div className='content-container'>
                {showCustomerDetails && (
                    <div className="cx-details">
                        <h3 className='title-table'>Customer details</h3>
                        <div className='table-container'>
                       <table className='table'>
                       <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Address</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {
    
        customers.map((customer, index) => (
          <tr> 
            <th scope="row" key={index}>{index + 1}</th>
            <td>{customer.firstname}</td>
            <td>{customer.lastname}</td>
            <td>{customer.dob}</td>
            <td>{customer.email}</td>
            <td>{customer.phoneNo}</td>
            <td>{customer.address}</td>
          </tr>
        ))
      }
                        </tbody>
                       </table>
                       </div>
                       <div className='button-container'>
                            <Link className='btn' to={"/AddCustomer"}>Add</Link>
                            <Link className='btn' to={`/UpdateCustomer/${customers.cus_id}`}>Update</Link>
                            <Link className='btn' to={"/DeleteCustomer"}>Delete</Link>
                        </div>
                       </div>
                )}
                {showOrderDetails && (
                    <div className="cx-details">
                        <h3>Order Details</h3>
                    </div>
                )}
                {showReturnsDetails && (
                    <div className="cx-details">
                        <h3>Returns Details</h3>
                    </div>
                )}
                {showPaymentsDetails && (
                    <div className="cx-details">
                        <h3>Payments Details</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customer;
