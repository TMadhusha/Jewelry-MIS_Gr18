import React, { useEffect, useState } from 'react';
import './App.css';
// import "../node_modules/boostrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SidebarSup from './Supplier/SidebarSup.jsx';
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
import DeleteSupplier from './Supplier/DeleteSupplier.jsx';
import UpdateSupplier from './Supplier/UpdateSupplier.jsx';


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
          <Route path="/editemp" element={<EditEmp />} />
          <Route path="/deleteemp" element={<DeleteEmp />} />
          <Route path="/addSup" element={<AddSupplier/>} />
          <Route path="/deleteSup" element={<DeleteSupplier/>} />
          <Route path="/editSup/:sup_id" element={<UpdateSupplier/>} />
          
          
        </Routes>
        </Sidebar>
    </BrowserRouter>
  );
}

export default App;