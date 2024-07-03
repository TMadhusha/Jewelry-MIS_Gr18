// import React from 'react';
import "./checkout.css";
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderFinal = () => {

  const formRef = useRef(null);
  let navigate = useNavigate();

  const [orderFinal, setOrderFinal] = useState({
    cus_id: "",
    order_date: "",
    total_amount: "",
    order_status: "",
    payment_method: "",
    billing_address: "",
  });

  const [receiptGenerated, setReceiptGenerated] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setOrderFinal(prevState => ({
      ...prevState,
      order_date: today,
    }));
    console.log("Welcome Order Confirmation Page..");
  }, []);

  const handleCancel = () => {
    const today = new Date().toISOString().split('T')[0];
    // Clear form data
    setOrderFinal({
      cus_id: "",
      order_date: today,
      total_amount: "",
      order_status: "",
      payment_method: "",
      billing_address: "",
    });
    setReceiptGenerated(false); // Reset receipt generated state
  };

  const { cus_id, order_date, total_amount, order_status, payment_method, billing_address } = orderFinal;

  const onInputChange = (e) => {
    setOrderFinal({ ...orderFinal, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8090/orderFinal", orderFinal);

      if (response.status === 200) {
        alert("Your Order is Successfully Added to the Order Table...");
        handleCancel();
        // navigate("/"); // Navigate to dashboard upon successful login
      }
    } catch (error) {
      alert("Please Re-Check your Given Details " + error.response.data);
    }
  };

  const generatePDF = async (e) => {
    e.preventDefault();
    
    // Validation check
    const missingFields = [];
    if (!cus_id) missingFields.push("Customer Id");
    if (!order_date) missingFields.push("Ordered Date");
    if (!total_amount) missingFields.push("Total Amount");
    if (!order_status) missingFields.push("Order Status");
    if (!payment_method) missingFields.push("Payment Method");
    if (!billing_address) missingFields.push("Address");

    if (missingFields.length > 0) {
      alert("Please Re-Check The Field Again:\n\n" + missingFields.join("\n"));
      return;
    }

    const form = formRef.current;

    html2canvas(form)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save("checkout.pdf");
        setReceiptGenerated(true); // Set receipt generated state to true
      });
  };

  return (
    <div className="orderch " ref={formRef}>
      <div className="checkout-container">
        

        <div className="right-side">
          <div className="payment-info">
            <h3 className="payment-heading">Order Confirmation</h3>
            <hr/>
            <form className="form-box" encType="text/plain" method="get" onSubmit={(e) => onSubmit(e)}>
              <div>
                <label htmlFor="full-name">Customer Id</label>
                <input
                  id="cus_id"
                  name="cus_id"
                  placeholder="001 "
                  required
                  type="text"
                  value={cus_id}
                  onChange={(e) => onInputChange(e)} />
              </div>

              <div>
                <label htmlFor="credit-card-num">Ordered Date</label>
                <input
                  id="order_date"
                  name="order_date"
                  required
                  type="date"
                  value={order_date}
                  readOnly />
              </div>

              <div>
                <label htmlFor="credit-card-num">Total Amount</label>
                <input
                  id="total_amount"
                  name="total_amount"
                  required
                  type="text"
                  value={total_amount}
                  onChange={(e) => onInputChange(e)} />
              </div>

              <div>
                <label htmlFor="credit-card-num">Order Status</label>
                <input
                  id="order_status"
                  name="order_status"
                  required
                  type="text"
                  value={order_status}
                  onChange={(e) => onInputChange(e)} />
              </div>

              <div>
                <label htmlFor="credit-card-num">Payment Method</label>
                <input
                  id="payment_method"
                  name="payment_method"
                  required
                  type="text"
                  value={payment_method}
                  onChange={(e) => onInputChange(e)} />
              </div>

              <div>
                <label htmlFor="credit-card-num">Address</label>
                <input
                  id="billing_address"
                  name="billing_address"
                  required
                  type="text"
                  value={billing_address}
                  onChange={(e) => onInputChange(e)} />
              </div>

              <button className="btn" onClick={generatePDF}>
                E-Receipt
              </button>

              {receiptGenerated && (
                <button className="btn" type="submit">
                  Confirm
                </button>
              )}

              <button className="btn" onClick={handleCancel} type="reset">
                Clear
              </button>
            </form>

            <p className="footer-text">
              Your credit card information will be deleted before download .PDF file
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFinal;
