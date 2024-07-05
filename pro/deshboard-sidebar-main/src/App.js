import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeBar from './components/EmployeeBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Customer from './pages/Customer.jsx';
import Employee from './pages/Employee.jsx';
import Inventory from './pages/Inventory.jsx';
import Supplier from './pages/Supplier.jsx';
import Finance from './pages/Finance.jsx';
import More from './pages/More.jsx';
import Logout from './pages/Logout.jsx';
import AddEmp from './employee/AddEmp.jsx';
import EditEmp from './employee/EditEmp.jsx';
import AddInv from './Inventory/AddInv.jsx';
import EditInv from './Inventory/EditInv.jsx';
import Attendance from './employee/Attendance.jsx';
import AddAttendance from './employee/AddAttendance.jsx';
import EditAttendance from './employee/EditAttendance.jsx';
import Salary from './employee/Salary.jsx';


import AddSupplier from './Supplier/AddSupplier.jsx';
import UpdateSupplier from'./Supplier/UpdateSupplier.jsx'
import AdminLog from'./Login and Registeration/AdminLog.jsx'
import AdminRegisteration from'./Login and Registeration/AdminRegisteration.jsx'
import ManageCx from './customer/ManageCx.jsx';
import ManageOrder from './customer/ManageOrder.jsx';
import ManageReturns from './customer/ManageReturns.jsx';
import HandlePayments from './customer/HandlePayments.jsx';
import AddCx from './customer/AddCx.jsx';
import UpdateCx from './customer/UpdateCx.jsx';
import ViewOrder from './customer/ViewOrder.jsx';
import OnlinePayments from './customer/OnlinePayments.jsx';
import ManualPayments from './customer/ManualPayments.jsx';
import AddOrder from './customer/AddOrder.jsx';
import Email from './customer/Email.jsx';
import Payment from './Payment/Payment.jsx';
import AddPayment from './Payment/AddPayment.jsx';
import Liability from './Payment/Liability.jsx';
import Payable from './Payment/Payable.jsx';
import Checkout from './WebSite/Checkout.jsx'
import OrderFinal from './WebSite/OrderFinal.jsx';
function App ()  {

  return ( 
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<Employee />} />
    <Route path="/customer" element={<Customer />} />
    <Route path="/inventory" element={<Inventory />} />
    <Route path="/supplier" element={<Supplier />} />
    <Route path="/finance" element={<Finance />} />
    <Route path="/more" element={<More />} />
    <Route path="/addemp" element={<AddEmp/>}/>
    <Route path="/editemp" element={<EditEmp/>}/>
    <Route path="/addinventory" element={<AddInv/>}/>
    <Route path='/editinv/:item_id' element={<EditInv/>}/>
    <Route path="/editemp/:emp_id" element={<EditEmp />} />
    <Route path="/attendance" element={<Attendance/>}/>
    <Route path='/addAttendance/:emp_id' element={<AddAttendance/>}/>
    <Route path='/editAttendance/:att_id' element={<EditAttendance/>}/>
    <Route path='/salary' element={<Salary/>}/>
    <Route path="/add-supplier" element={<AddSupplier/>}/>
    <Route path="/logout" element={<Logout/>}/>
    <Route path="/UpdateSupplier/:sup_id" element={<UpdateSupplier />} />
    <Route path="/login" element={<AdminLog/>} />
    <Route path="/login-regsiteration" element={<AdminRegisteration />} />
    <Route path="/manage-customers" element={<ManageCx/>}/>
    <Route path="/manage-order" element={<ManageOrder/>}/>
    <Route path="/manage-returns" element={<ManageReturns/>}/>
    <Route path="/handle-payments" element={<HandlePayments/>}/>
    <Route path="/addcx" element={<AddCx />} />
    <Route path='/updatecx/:cus_id' element={<UpdateCx/>}/>
    <Route path="/vieworder" element={<ViewOrder />} />
    <Route path='/online-payments' element={<OnlinePayments />}/>
    <Route path='/manual-payments' element={<ManualPayments />}/>
    <Route path="/addorder" element={<AddOrder />} />
    <Route path="/Email" element={<Email/>} />
    <Route path="/payment" element={<Payment/>} />
    <Route path="/AddPayment" element={<AddPayment/>} />
    <Route path="/liability/:paymentid" element={<Liability/>} />
    <Route path="/payable/:paymentid" element={<Payable/>} />
    <Route path="/checkout" element={<Checkout/>} />
    <Route path="/orderFinal/:username" element={<OrderFinal />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;