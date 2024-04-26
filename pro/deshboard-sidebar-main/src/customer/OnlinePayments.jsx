import React, { useEffect, useState } from "react";
import axios from "axios";
// import './OnlinePayment.css';
import CustomerBar from '../components/CustomerBar';
import { Link } from 'react-router-dom';


const OnlinePayments = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getreservations');
        setReservations(response.data);
      } catch (error) {
        console.log("Error fetching reservations:", error);
      }
    };

    fetchReservations(); 
  }, []);

  const handleRowClick = (reservationId) => {
    setSelectedReservationId(reservationId === selectedReservationId ? null : reservationId);
  };

  const sendConfirmationEmail = async (reservationId) => {
    try {
      // Call your backend API to trigger sending the confirmation email
      await axios.post('http://localhost:8080/sendconfirmationemail', { reservationId });
      console.log("Confirmation email sent successfully.");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };

  const handlePaymentConfirmation = (reservationId) => {
    // Handle payment confirmation logic here
    sendConfirmationEmail(reservationId);
  };

  return (
    <CustomerBar>
      <div>
        <h2>Reservation Details</h2>
        <table>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Payment Status</th>
              <th>Reservation Date</th>
              <th>Payment Amount</th>
              <th>Reservation Status</th>
              <th>Pickup Date</th>
              <th>Payment Method</th>
              <th>Reservation Type</th>
              <th>Additional Notes</th>
              <th>Customer Details</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.reservationId} onClick={() => handleRowClick(reservation.reservationId)}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.payment_status}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.payment_amount}</td>
                <td>{reservation.reservation_status}</td>
                <td>{reservation.pickup_date}</td>
                <td>{reservation.payment_method}</td>
                <td>{reservation.reservation_type}</td>
                <td>{reservation.additional_notes}</td>
                <td>
                  {reservation.customer &&
                    <div>
                      <p>Customer ID: {reservation.customer.cus_id}</p>
                      <p>Name: {reservation.customer.firstname} {reservation.customer.lastname}</p>
                      <p>Email: {reservation.customer.email}</p>
                      <p>Phone No: {reservation.customer.phoneNo}</p>
                      <p>Address: {reservation.customer.address}</p>
                      <Link className='email' to="/email">Send Confirmation Email</Link>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomerBar>
  );
};

export default OnlinePayments;
