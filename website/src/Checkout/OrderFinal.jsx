// import "./checkout.css";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderFinal = () => {
  const { username } = useParams();
  const formRef = useRef(null);
  let navigate = useNavigate();

  const [orderFinal, setOrderFinal] = useState({
    orderDate: new Date().toISOString().split('T')[0],
    totalAmount: "",
    orderStatus: "Pending", // Set default value here
    paymentMethod: "Credit Card", // Set default value here
    billingAddress: "",
    cus_id: "",
    items: [],
    username: username, // Initialize with username from useParams
  });

  useEffect(() => {
    console.log("Welcome Order Confirmation Page..");
  }, []);

  useEffect(() => {
    // Fetch cart summary on component mount
    if (username) {
      axios.get(`http://localhost:8080/cart-summary/${username}`)
        .then(response => {
          const { cusId, totalPrice, items, username } = response.data;
          setOrderFinal(prevState => ({
            ...prevState,
            cus_id: cusId,
            totalAmount: totalPrice,
            items: items,
            username: username,
          }));
        })
        .catch(error => {
          console.error("There was an error fetching the cart summary!", error);
        });
    }
  }, [username]);

  const handleCancel = () => {
    setOrderFinal({
      orderDate: new Date().toISOString().split('T')[0],
      totalAmount: "",
      orderStatus: "Pending", // Reset to default value
      paymentMethod: "Credit Card", // Reset to default value
      billingAddress: "",
      cus_id: "",
      items: [],
      username: username, // Reset to initial username
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFinal({ ...orderFinal, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const missingFields = [];
    if (!orderFinal.orderDate) missingFields.push("Ordered Date");
    if (!orderFinal.totalAmount) missingFields.push("Total Amount");
    if (!orderFinal.orderStatus) missingFields.push("Order Status");
    if (!orderFinal.paymentMethod) missingFields.push("Payment Method");
    if (!orderFinal.billingAddress) missingFields.push("Address");
    if (!orderFinal.cus_id) missingFields.push("Customer Id");

    if (missingFields.length > 0) {
      alert("Please Re-Check The Field Again:\n\n" + missingFields.join("\n"));
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/save-order", orderFinal);
      if (response.status === 200) {
        alert("Your Order is Successfully Added to the Order Table...");
        generatePDF();
        handleCancel();
      }
    } catch (error) {
      alert("Please Re-Check your Given Details " + error.response.data);
    }
  };

  const generatePDF = async () => {
    const form = formRef.current;

    html2canvas(form).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save("Receipt-Copy.pdf");
    });
  };

  return (
    <div className="orderch" ref={formRef}>
      <div className="checkout-container">
        <div className="right-side">
          <div className="payment-info">
            <h3 className="payment-heading">Order Confirmation</h3>
            <hr />
            <form className="form-box" onSubmit={onSubmit}>
              
              {/* Table 1: Customer Details */}
              <table>
                <tbody>
                  <tr>
                    <th>Customer Username</th>
                    <td>{orderFinal.username}</td>
                  </tr>
                  <hr />
                  <tr>
                    <th>Ordered Date</th>
                    <td>{orderFinal.orderDate}</td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{orderFinal.orderStatus}</td>
                  </tr>
                  <tr>
                    <th>Payment Method</th>
                    <td>{orderFinal.paymentMethod}</td>
                  </tr>
                </tbody>
              </table>

              <hr />

              {/* Table 2: Order Items */}
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(orderFinal.items) && orderFinal.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              {/* Table 3: Summary */}
              <table>
                <tbody>
                  <tr>
                    <th>Sub Total</th>
                    <td>{orderFinal.totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div>
                <label htmlFor="billingAddress">Address</label>
                <input
                  id="billingAddress"
                  name="billingAddress"
                  required
                  type="text"
                  value={orderFinal.billingAddress}
                  onChange={onInputChange}
                />
              </div>

              <button className="btn" type="submit">
                Confirm
              </button>
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
