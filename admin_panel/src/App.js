import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // Import Dashboard component
import Customers from './pages/Customers'; // Import Customers component
import Employee from './pages/Employee'; // Import Employee component
import Inventory from './pages/Inventory'; // Import Inventory component
import Supplier from './pages/Supplier'; // Import Supplier component
import Finance from './pages/Finance'; // Import Finance component
import More from './pages/More'; // Import More component
//import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Supplier" element={<Supplier />} />
          <Route path="/Finance" element={<Finance />} />
          <Route path="/More" element={<More />} />
        </Routes>
        </div>
        </Router>
    

    // <div>
    //   <Home/>
  );
}

export default App;
