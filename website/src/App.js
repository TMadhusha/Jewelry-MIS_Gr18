import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContactUs from './Pages/ContactUs';
import HomeWrapper from './Pages/HomeWrapper';
import Bangle from './Pages/Jewelry/Bangle';
import Promotion from './Pages/Promotion';
import Bracelet from './Pages/Jewelry/Bracelet';
import Chain from './Pages/Jewelry/Chain';
import Earring from './Pages/Jewelry/Earring';
import Necklace from './Pages/Jewelry/Neckless';
import Pendant from './Pages/Jewelry/Pendant';
import Ring from './Pages/Jewelry/Ring';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWrapper/>}>
        <Route path='/' index element={<Home/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/promotion" element={<Promotion/>}/>
        <Route path="/jewelry/bangle" element={<Bangle />}/>
        <Route path="/jewelry/bracelet" element={<Bracelet />}/>
        <Route path='/jewelry/chain' element={<Chain/>}/>
        <Route path='/jewelry/earring' element={<Earring/>}/>
        <Route path='/jewelry/necklace' element={<Necklace/>}/>
        <Route path='/jewelry/pendant' element={<Pendant/>}/>
        <Route path='/jewelry/ring' element={<Ring/>}/>

        

        
      </Route>
    </Routes>
    </BrowserRouter>
  );

}

export default App;
