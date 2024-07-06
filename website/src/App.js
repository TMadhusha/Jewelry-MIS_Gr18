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
import Bangle from './Pages/Jewelry/Bangle';
import Bracelet from './Pages/Jewelry/Bracelet';
import Chain from './Pages/Jewelry/Chain';
import Earring from './Pages/Jewelry/Earring';
import Necklace from './Pages/Jewelry/Neckless';
import Pendant from './Pages/Jewelry/Pendant';
import Ring from './Pages/Jewelry/Ring';
import RemoteCustomerProfile from './RemoteCustomer/RemoteCustomerProfile';






function App() {
const {isLoggedIn}=useContext(AuthContext);

  return (
    <BrowserRouter>
    <Routes>
      {isLoggedIn?(
        <Route path='/' element={<RemoteCustomerWrapper/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/jewelry' element={<Jewelry/>}/>
          <Route path="/jewelry/bangle" element={<Bangle />}/>
          <Route path="/jewelry/bracelet" element={<Bracelet />}/>
          <Route path='/jewelry/chain' element={<Chain/>}/>
          <Route path='/jewelry/earring' element={<Earring/>}/>
          <Route path='/jewelry/necklace' element={<Necklace/>}/>
          <Route path='/jewelry/pendant' element={<Pendant/>}/>
          <Route path='/jewelry/ring' element={<Ring/>}/>

          <Route path="/contact" element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/promotion' element={<Promotion/>}/>
          <Route path='/profile' element={<RemoteCustomerProfile/>}/>
          
          
      </Route>
      ) :(
        <Route path="/" element={<HomeWrapper/>}>
          <Route path='/' index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path="/jewelry/bangle" element={<Bangle />}/>
          <Route path="/jewelry/bracelet" element={<Bracelet />}/>
          <Route path='/jewelry/chain' element={<Chain/>}/>
          <Route path='/jewelry/earring' element={<Earring/>}/>
          <Route path='/jewelry/necklace' element={<Necklace/>}/>
          <Route path='/jewelry/pendant' element={<Pendant/>}/>
          <Route path='/jewelry/ring' element={<Ring/>}/>

          <Route path="/contact" element={<ContactUs/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/promotion' element={<Promotion/>}/>
          <Route path='/profile' element={<RemoteCustomerProfile/>}/>
          
          
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
