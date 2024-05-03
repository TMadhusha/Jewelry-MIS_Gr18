import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';
import Bangle from './Pages/Jewelry/Bangle';
import Promotion from './Pages/Promotion';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWrapper/>}>
        <Route path='/' index element={<Home/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/promotion" element={<Promotion/>}/>
        <Route path="/jewelry/bangle" element={<Bangle />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );

}

export default App;
