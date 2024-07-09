//import React from 'react';
import "./checkout.css";
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const Checkout = () => {

  const formRef = useRef(null);

  const handleCancel = () => {
    // Clear form data
    setcheckout({
      username:"",
      cardnumber:"",
      backnumber:"",
    
    });
  };

  let navigate=useNavigate()

  const [checkout,setcheckout]=useState({
    username:"",
    cardnumber:"",
    backnumber:"",

})
useEffect(()=>{
  console.log("Welcome To checkout Page..")
})
const{username,cardnumber,backnumber}=checkout

const onInputChange=(e)=>{
  setcheckout({...checkout,[e.target.name]:e.target.value})

}

const onSubmit =async (e)=>{
  e.preventDefault()

  try
  {
  const response=await axios.post("http://localhost:8090/checkout",checkout)

  if (response.status === 200) {
    alert("Details Approved..."); // Display response message
    
    handleCancel();
    generatePDF();
    //navigate("/");// Navigate to dashboard upon successful login
    //madusha checkout button kudutha odane azu order table ku pohonum
  }}
  catch (error) {
    alert("Plese Re-Check your Given Details " + error.response.data); // Display error message
}
  
}

const generatePDF = async () => {
  const form = formRef.current;

  html2canvas(form)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save("checkout.pdf");
    });
};



  return (
    <div className="bodych" ref={formRef} >
     
    <div className="checkout-container">
      <div className="left-side">
        <div className="text-box">
          <h1 className="home-heading">Italy Silver Choice</h1>
          <p className="home-price">Your Loving Movement</p>
          <hr className="left-hr" />
          <p className="home-desc">No. 13 Opposite Peoples Bank Nittambuwa</p>
          <p className="home-desc">
            italysilver.13@gmail.com<br/>0777 31 32 16
          </p>
        </div>
      </div>

      <div className="right-side">
        <div className="receipt">
          <h2 className="receipt-heading">Receipt Summary</h2>
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Order-Id</td>
                  <td className="price">1</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="price">0.00 USD</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td className="price">499.00 USD</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td className="price">47.41 USD</td>
                </tr>
                <tr className="total">
                  <td>Total</td>
                  <td className="price">546.41 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="payment-info">
          <h3 className="payment-heading">Bank Payment Information</h3>
          <form className="form-box"  encType="text/plain" method="get"  onSubmit={(e)=>onSubmit(e)} >
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input 
              id="username" 
              name="username" 
              placeholder="Jhone " 
              required 
              type="text"
              value={username} 
              onChange={(e)=>onInputChange(e)}/>
            </div>

            <div>
              <label htmlFor="credit-card-num">Card Number</label>
              <input 
              id="cardnumber" 
              name="cardnumber" 
              placeholder="278X-XXXX-XXXX-XX62" 
              required 
              maxLength={17}
              type="text"
              value={cardnumber} 
              onChange={(e)=>onInputChange(e)}/>
            </div>

            <div>
              <p className="expires">Expires on:</p>
              <div className="card-experation">
                <label htmlFor="expiration-month">Month</label>
                <select 
                id="expiration-month" 
                name="expiration-month" 
                required
                >
                  <option value="">Month:</option>
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
                <select id="expiration-year" name="expiration-year" required>
                  <option value="">Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cvv">CVV</label>
              <input 
              id="backnumber" 
              name="backnumber" 
              placeholder="000" 
              type="text" 
              required 
              maxLength={3}
              value={backnumber}
              onChange={(e)=>onInputChange(e)}/>
              <a className="cvv-info" href="https://www.santander.com/en/stories/cvv-bank-card">What is CVV?</a>
            </div>

            <button className="btn" type="submit">
               Pay
            </button>

            <button className="btn" onClick={handleCancel} type="reset">
               Clear
            </button>
          </form>

          <p className="footer-text">
           
            Your credit card information will be deleted before dwonload .PDF file
          </p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Checkout;
