import React, { useEffect, useState } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
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
import DeleteEmp from './employee/DeleteEmp.jsx';

function App ()  {
  

  return ( 
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/more" element={<More />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addemp" element={<AddEmp />} />
          <Route path="/editemp/:id" element={<EditEmp />} />
          <Route path="/deleteemp" element={<DeleteEmp />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;