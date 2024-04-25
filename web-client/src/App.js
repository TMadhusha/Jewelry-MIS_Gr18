import React from 'react'
import './app.css'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar />
    <Home/>
    <Footer />
    
    </>
  )
}

export default App
