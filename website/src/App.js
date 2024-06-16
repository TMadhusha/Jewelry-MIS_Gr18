import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';
import Login from './Login/Login';
import Registration from './Login/Registration';
import RemoteCustomerWrapper from './RemoteCustomer/RemoteCustomerWrapper';
import Jewelry from './Pages/Jewelry';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWrapper/>}>
        <Route path='/' index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
      </Route>
      <Route path='/' element={<RemoteCustomerWrapper/>}>
        <Route path='/' index element={<Home/>}/>
        <Route path='/jewelry' element={<Jewelry/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
