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
    <Route path="/logout" element={<Logout/>}/>
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
    

    </Routes>
    </BrowserRouter>
  );
}

export default App;