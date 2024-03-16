// Footer.js
import React, { PureComponent } from 'react';
import './Footer.css'; 

export default class Footer extends PureComponent {
  render() {
    return (
      <div className="footer">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
      </div>
    );
  }
}
