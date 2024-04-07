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
import DeleteEmp from './employee/DeleteEmp.jsx';
import AddSupplier from './Supplier/AddSupplier.jsx';
import EditSupplier from './Supplier/EditSup.jsx';



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
    <Route path="/addSup" element={<AddSupplier />}/>
    <Route path="/update-supplier/:id" element={<EditSupplier/>}/>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;