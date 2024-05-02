import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWrapper/>}>
        <Route path='/' index element={<Home/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
