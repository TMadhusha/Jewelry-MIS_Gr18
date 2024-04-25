import CustomerBar from '../components/CustomerBar';
import React, { useState } from 'react';
import axios from 'axios';

const Email = () => {
  const [formData, setFormData] = useState({
    to: '', 
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/send-email', formData);
      alert('Email sent successfully!');
      setFormData({
        to: '', 
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <CustomerBar>
      <form onSubmit={handleSubmit}>
        <label>
          To:
          <input type="email" name="to" value={formData.to} onChange={handleChange} />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} />
        </label>
        <button type="submit">Send Email</button>
      </form>
    </CustomerBar>
  );
};

export default Email;
