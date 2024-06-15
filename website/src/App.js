import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';
import Login from './Login/Login';
import Registration from './Login/Registration';



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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
