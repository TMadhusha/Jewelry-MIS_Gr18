import "./checkout.css";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Checkout = () => {
  const formRef = useRef(null);

  const handleCancel = () => {
    setCheckout({
      username: "",
      cardnumber: "",
      cvv: "",
      month: "",
      year: "",
    });
  };

  let navigate = useNavigate();

  const [checkout, setCheckout] = useState({
    username: "",
    cardnumber: "",
    cvv: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    console.log("Welcome To checkout Page..");
  }, []);

  const { username, cardnumber, cvv, month, year } = checkout;

  const onInputChange = (e) => {
    setCheckout({ ...checkout, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/checkout", checkout);

      if (response.status === 200) {
        alert("Details Approved...");
        handleCancel();
        navigate(`/orderFinal/${username}`); // Navigate to orderFinal with username
      }
    } catch (error) {
      alert("Please Re-Check your Given Details " + error.response.data);
    }
  };

  return (
    <div className="bodch" ref={formRef}>
      <div className="checkout-container">
        <div className="left-side">
          <div className="text-box">
            <h1 className="home-heading">Italy Silver Choice</h1>
            <p className="home-price">Your Loving Movement</p>
            <hr className="left-hr" />
            {/* <p className="home-desc">No. 13 Opposite Peoples Bank Nittambuwa</p>
            <p className="home-desc">
              italysilver.13@gmail.com<br />0777 31 32 16
            </p> */}
          </div>
        </div>

        <div className="right-side">
          <div className="payment-info">
            <h3 className="payment-heading">Bank Payment Information</h3>
            <form className="form-box" encType="text/plain" method="get" onSubmit={(e) => onSubmit(e)}>
              <div>
                <label htmlFor="username">Full Name</label>
                <input
                  id="username"
                  name="username"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <label htmlFor="cardnumber">Card Number</label>
                <input
                  id="cardnumber"
                  name="cardnumber"
                  placeholder="278X-XXXX-XXXX-XX62"
                  required
                  maxLength={17}
                  type="text"
                  value={cardnumber}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div>
                <p className="expires">Expires on:</p>
                <div className="card-expiration">
                  <label htmlFor="expiration-month">Month</label>
                  <select
                    id="expiration-month"
                    name="month"
                    required
                    value={month}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="" disabled hidden>Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>

                  <label className="expiration-year">Year</label>
                  <select
                    id="expiration-year"
                    name="year"
                    required
                    value={year}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option value="" disabled hidden>Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  placeholder="000"
                  type="text"
                  required
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => onInputChange(e)}
                />
                <a className="cvv-info" href="https://www.santander.com/en/stories/cvv-bank-card">What is CVV?</a>
              </div>

              <button className="btn" type="submit">
                Next
              </button>

              <button className="btn" onClick={handleCancel} type="reset">
                Clear
              </button>
            </form>

            <p className="footer-text">
              Your credit card information will be deleted before downloading the PDF file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;