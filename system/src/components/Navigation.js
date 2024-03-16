// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from './companyLogo.jpg'; // Import your company logo image
import './navigation.css'; 

export default function Navigation() {
  return (
    <div>
      <div className="navbar"> 
        <div className="company-info">
          <img src={companyLogo} alt="Company Logo" className="company-logo" /> 
          <div className="company-text">
            <span className="company-name">ITALY SILVER CHOICE</span> 
            <span className="company-subtitle">Jewelry Shop Management System</span>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Finance">Finance</Link>
          <Link to="/Supplier">Supplier</Link>
          <Link to="/Inventory">Inventory</Link>
          <Link to="/Employee">Employee</Link>
          <Link to="/Customer">Customer</Link>
          <Link to="/More">More</Link>
        </div>
      </div>
    </div>
  );
}
