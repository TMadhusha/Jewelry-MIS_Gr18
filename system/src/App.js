// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Customer from './Pages/Customer';
import Employee from './Pages/Employee';
import Finance from './Pages/Finance';
import Inventory from './Pages/Inventory'; // Import Inventory component
import More from './Pages/More'; // Import More component
import Supplier from './Pages/Supplier'; // Import Supplier component

function App() {
  return (
    <Router>
      <div>
        <Home/>
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Finance" element={<Finance />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/More" element={<More />} /> 
          <Route path="/Supplier" element={<Supplier />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
