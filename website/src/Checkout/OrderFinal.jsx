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
    totalAmount: 0,
    orderStatus: "Pending",
    paymentMethod: "Credit Card",
    billingAddress: "",
    items: [],
    username: username,
    subTotal: 0
  });

  useEffect(() => {
    console.log("Welcome Order Confirmation Page..");
  }, []);

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8080/user/${username}`)
        .then(response => {
          const items = response.data;
          const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          setOrderFinal(prevState => ({
            ...prevState,
            items: items,
            totalAmount: totalPrice,
            username: username,
            subTotal: totalPrice // Set subtotal to the calculated total price
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
      totalAmount: 0,
      orderStatus: "Pending",
      paymentMethod: "Credit Card",
      billingAddress: "",
      items: [],
      username: username,
      subTotal: 0
    });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFinal({ ...orderFinal, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!orderFinal.orderDate) missingFields.push("Ordered Date");
    if (!orderFinal.orderStatus) missingFields.push("Order Status");
    if (!orderFinal.paymentMethod) missingFields.push("Payment Method");
    if (!orderFinal.billingAddress) missingFields.push("Address");

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
              <table>
                <tbody>
                  <tr>
                    <th>Customer Username</th>
                    <td>{orderFinal.username}</td>
                  </tr>
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

              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderFinal.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity}</td> {/* Calculate total price here */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              <table>
                <tbody>
                  <tr>
                    <th>Sub Total</th>
                    <td>{orderFinal.subTotal}</td> {/* Display subtotal here */}
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
              Your credit card information will be deleted before downloading the .PDF file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFinal;
