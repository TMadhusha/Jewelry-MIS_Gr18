import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';
import Login from './Login/Login';
import Registration from './Login/Registration';
import RemoteCustomerWrapper from './RemoteCustomer/RemoteCustomerWrapper';
import Jewelry from './Pages/Jewelry';
import AboutUs from './Pages/AboutUs';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './Login/AuthProvider';
import Promotion from './Pages/Promotion';
import MyCart from './Pages/Jewelry/MyCart';

function App() {
const {isLoggedIn}=useContext(AuthContext);

  return (
    <BrowserRouter>
    <Routes>
      {isLoggedIn?(
        <Route path='/' element={<RemoteCustomerWrapper/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/jewelry' element={<Jewelry/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/promotion' element={<Promotion/>}/>
      </Route>
      ) :(
        <Route path="/" element={<HomeWrapper/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/promotion' element={<Promotion/>}/>
          <Route path='/myCart' element={<MyCart/>}/>
      </Route>
      )}
    </Routes>
    </BrowserRouter>
  );
}

export default function AppWrapper(){
  return(
    <AuthProvider>
      <App/>
    </AuthProvider>
  )
};
