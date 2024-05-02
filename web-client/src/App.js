import React from 'react'
import './app.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'



const App = () => {
  return (
    <>
    <Navbar />
    <Home/>
    <Footer />
    
    {/* <BrowserRouter>
    <Routes>
    <Route path="/bangle" element={<Bangles />} />
    </Routes>
    </BrowserRouter>
     */}


    
    </>
  )
}

export default App
