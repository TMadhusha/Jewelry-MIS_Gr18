import React from 'react'
import './app.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import ContactUs from './Pages/ContactUs'
import Hoem from './Pages/Hoem'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => {
  return (
    // <>
    // <Navbar />
    // <Home/>
    // <Footer />
    
    // </>
    <BrowserRouter>
    <Navbar/>
      <Route path='/hoem' element={<Hoem/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
    </BrowserRouter>
  )
}

export default App
