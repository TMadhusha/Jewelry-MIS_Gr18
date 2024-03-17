//import React, {pureComponent} from 'react';
import React, { useState } from 'react';
import logo1 from './logo1_small.png';
import 
{BsGrid1X2Fill, BsFillPersonFill, BsGrid, BsBoxes, BsPeopleFill, 
    BsTruck, BsCashCoin} from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Navigation() {
        return(
            <div id='nav' className='nav-responsive'>
                <div className='nav-title'>
                    <div className='nav-brand'>
                        <center><img src={logo1} className='App-logo'/><br/></center>
                        Italy Silver Choice
            </div>
        </div>
          
        <div className="nav-list">
          <Link to="/"  className='nav-list-item'><BsGrid1X2Fill className='icon'/>Dashboard</Link>
          <Link to="/Customers" className='nav-list-item'><BsPeopleFill className='icon'/>Customers</Link>
          <Link to="/Employee" className='nav-list-item'><BsFillPersonFill className='icon'/>Employee</Link>
          <Link to="/Inventory" className='nav-list-item'><BsBoxes className='icon'/>Inventory</Link>
          <Link to="/Supplier" className='nav-list-item'><BsTruck className='icon'/>Supplier</Link>
          <Link to="/Finance" className='nav-list-item'><BsCashCoin className='icon'/>Finance</Link>
          <Link to="/More" className='nav-list-item'><BsGrid className='icon'/>More</Link>
        </div>

            {/* <ul className='nav-list'>
                <li className='nav-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsFillPersonFill className='icon'/> Employee
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsBoxes className='icon'/> Inventory
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsTruck className='icon'/> Supplier
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsCashCoin className='icon'/> Finance
                </a>
                </li>
                <li className='nav-list-item'>
                <a href="">
                    <BsGrid className='icon'/> More
                </a> 
                </li>
            </ul> */}
            </div>
            
        );
}