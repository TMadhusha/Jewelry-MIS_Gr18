import React, { useState } from 'react';
import logo1 from '../images/logo2-bg-smal.png';
import {BsGrid1X2Fill} from 'react-icons/bs';

import { FaPowerOff,FaBoxOpen  } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const InventoryBar = ({children}) => {
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<BsGrid1X2Fill />
        },
       
        {
            path:"/inventory",
            name:"View Inventory",
            icon:<FaBoxOpen/>
        },
        {
            path:"/addinventory",
            name:"Add Item",
            icon:<FaBoxOpen/>
        },
       
        {
            path:"/logout",
            name:"Logout",
            icon:<FaPowerOff/>
        }
    ]
    return (
        <div className="container">
           <div  className="title-bar">
               <div className="top_section">
                    <div><img src={logo1} className='App-logo' alt="Logo" /></div>
                    <h1 className='App-title'>Jewel Mart</h1>
                    <h3 style={{fontFamily:'Monotype Corsiva',fontSize:'25px',}}>A Perfect Choice</h3>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default InventoryBar;