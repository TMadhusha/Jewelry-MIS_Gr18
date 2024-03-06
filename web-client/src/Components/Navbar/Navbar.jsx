import React, { useState } from 'react'
import './navbar.css'
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import logo from '../../Assets/logo.png';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {


  return (
    
    <section className='navBarSection'>
      <header className='header flex'>
        <div className="logoDiv">
          <a href="" className="logo flex">
            <img src={logo} className="img"/>
            <h1>Italy Silver Choice</h1>
          </a>
        </div>


        <div className='navBar'>
          <ul className="navLists flex">

            <li className="navItem">
             <NavLink to ="/Home" className="navLink">Home</NavLink> 
            </li>

            <li className="navItem">
            <NavLink to ="/Jewelry" className="navLink">Jewelry</NavLink>
            </li>

            <li className="navItem">
            <NavLink to ="/Promotion" className="navLink">Promotion</NavLink>
            </li>

            <li className="navItem">
              <NavLink to ="/Contact" className="navLink">Contact Us</NavLink>
            </li>

            <li className="navItem">
            <NavLink to ="/About" className="navLink">About Us</NavLink>
            </li> 

             <li className="navItem">
             <input type="text" placeholder='Search'className="input-wrapper"/>
         
            
            </li> 
            
            <li className="navItem">
            <a href="#" className="logoflex">
            <FaSearch />
            </a>
            </li>

            <li className="navItem">
            <a href="#" className="logoflex">
            <FaShoppingBag />
            </a>
            </li>

            <li className="navItem">
            <a href="#" className="logoflex">
            <FaUser />
            </a>
            </li>


          </ul>

       </div>       
      </header>
    </section>
  )
}

export default Navbar