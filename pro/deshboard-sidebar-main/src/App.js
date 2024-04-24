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
import Attendance from './employee/Attendance.jsx';
import AddAttendance from './employee/AddAttendance.jsx';
import EditAttendance from './employee/EditAttendance.jsx';
import Salary from './employee/Salary.jsx';


import AddSupplier from './Supplier/AddSupplier.jsx';
import UpdateSupplier from'./Supplier/UpdateSupplier.jsx'
import AdminLog from'./Login and Registeration/AdminLog.jsx'
import AdminRegisteration from'./Login and Registeration/AdminRegisteration.jsx'

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
    </Routes>
    </BrowserRouter>
  );
}

export default App;