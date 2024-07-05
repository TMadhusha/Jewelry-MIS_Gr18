// import "./checkout.css";
// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const OrderFinal = () => {
//   const formRef = useRef(null);
//   let navigate = useNavigate();

//   const [orderFinal, setOrderFinal] = useState({
//     orderDate: "",
//     totalAmount: "",
//     orderStatus: "On-Process", // Set default value here
//     paymentMethod: "Card Payment",
//     billingAddress: "",
//     cus_id: "",
//   });

//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     setOrderFinal(prevState => ({
//       ...prevState,
//       orderDate: today,
//     }));
//     console.log("Welcome Order Confirmation Page..");
//   }, []);

//   const handleCancel = () => {
//     const today = new Date().toISOString().split('T')[0];
//     setOrderFinal({
//       orderDate: today,
//       totalAmount: "",
//       orderStatus: "On-Process", // Reset to default value
//       paymentMethod: "Card Payment",
//       billingAddress: "",
//       cus_id: "",
//     });
//   };

//   const onInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrderFinal({ ...orderFinal, [name]: value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     const missingFields = [];
//     if (!orderFinal.orderDate) missingFields.push("Ordered Date");
//     if (!orderFinal.totalAmount) missingFields.push("Total Amount");
//     if (!orderFinal.orderStatus) missingFields.push("Order Status");
//     if (!orderFinal.paymentMethod) missingFields.push("Payment Method");
//     if (!orderFinal.billingAddress) missingFields.push("Address");
//     if (!orderFinal.cus_id) missingFields.push(" Customer Id");

//     if (missingFields.length > 0) {
//       alert("Please Re-Check The Field Again:\n\n" + missingFields.join("\n"));
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8090/save-order", orderFinal);
//       if (response.status === 200) {
//         alert("Your Order is Successfully Added to the Order Table...");
//         generatePDF();
//         handleCancel();
//       }
//     } catch (error) {
//       alert("Please Re-Check your Given Details " + error.response.data);
//     }
//   };

//   const generatePDF = async () => {
//     const form = formRef.current;

//     html2canvas(form).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save("checkout.pdf");
//     });
//   };

//   return (
//     <div className="orderch" ref={formRef}>
//       <div className="checkout-container">
//         <div className="right-side">
//           <div className="payment-info">
//             <h3 className="payment-heading">Order Confirmation</h3>
//             <hr />
//             <form className="form-box" onSubmit={onSubmit}>
//               <div>
//                 <label htmlFor="cus_id">Customer Id</label>
//                 <input
//                   id="cus_id"
//                   name="cus_id"
//                   required
//                   type="text"
//                   value={orderFinal.cus_id}
//                   onChange={onInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="orderDate">Ordered Date</label>
//                 <input
//                   id="orderDate"
//                   name="orderDate"
//                   required
//                   type="date"
//                   value={orderFinal.orderDate}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label htmlFor="totalAmount">Total Amount</label>
//                 <input
//                   id="totalAmount"
//                   name="totalAmount"
//                   required
//                   type="text"
//                   value={orderFinal.totalAmount}
//                   onChange={onInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="orderStatus">Order Status</label>
//                 <input
//                   id="orderStatus"
//                   name="orderStatus"
//                   required
//                   type="text"
//                   value={orderFinal.orderStatus}
//                   readOnly // Make read-only
//                 />
//               </div>
//               <div>
//                 <label htmlFor="paymentMethod">Payment Method</label>
//                 <input
//                   id="paymentMethod"
//                   name="paymentMethod"
//                   required
//                   type="text"
//                   value={orderFinal.paymentMethod}
//                   onChange={onInputChange}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <label htmlFor="billingAddress">Address</label>
//                 <input
//                   id="billingAddress"
//                   name="billingAddress"
//                   required
//                   type="text"
//                   value={orderFinal.billingAddress}
//                   onChange={onInputChange}
//                 />
//               </div>
//               <button className="btn" type="submit">
//                 Confirm
//               </button>
//               <button className="btn" onClick={handleCancel} type="reset">
//                 Clear
//               </button>
//             </form>
//             <p className="footer-text">
//               Your credit card information will be deleted before download .PDF file
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderFinal;

import "./checkout.css";
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
    orderDate: "",
    totalAmount: "",
    orderStatus: "On-Process", // Set default value here
    paymentMethod: "Card Payment",
    billingAddress: "",
    cus_id: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setOrderFinal(prevState => ({
      ...prevState,
      orderDate: today,
    }));
    console.log("Welcome Order Confirmation Page..");
  }, []);

  useEffect(() => {
    // Fetch cart summary on component mount
    if (username) {
      axios.get(`http://localhost:8090/cart-summary/${username}`)
        .then(response => {
          const { cusId, totalPrice } = response.data;
          setOrderFinal(prevState => ({
            ...prevState,
            cus_id: cusId,
            totalAmount: totalPrice,
          }));
        })
        .catch(error => {
          console.error("There was an error fetching the cart summary!", error);
        });
    }
  }, [username]);

  const handleCancel = () => {
    const today = new Date().toISOString().split('T')[0];
    setOrderFinal({
      orderDate: today,
      totalAmount: "",
      orderStatus: "On-Process", // Reset to default value
      paymentMethod: "Card Payment",
      billingAddress: "",
      cus_id: "",
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
      const response = await axios.post("http://localhost:8090/save-order", orderFinal);
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
      pdf.save("checkout.pdf");
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
              <div>
                <label htmlFor="cus_id">Customer Id</label>
                <input
                  id="cus_id"
                  name="cus_id"
                  required
                  type="text"
                  value={orderFinal.cus_id}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="orderDate">Ordered Date</label>
                <input
                  id="orderDate"
                  name="orderDate"
                  required
                  type="date"
                  value={orderFinal.orderDate}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="totalAmount">Total Amount</label>
                <input
                  id="totalAmount"
                  name="totalAmount"
                  required
                  type="text"
                  value={orderFinal.totalAmount}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="orderStatus">Order Status</label>
                <input
                  id="orderStatus"
                  name="orderStatus"
                  required
                  type="text"
                  value={orderFinal.orderStatus}
                  readOnly // Make read-only
                />
              </div>
              <div>
                <label htmlFor="paymentMethod">Payment Method</label>
                <input
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  type="text"
                  value={orderFinal.paymentMethod}
                  readOnly
                />
              </div>
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
