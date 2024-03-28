import React, { useState } from 'react';
import logo1 from '../images/logo1_small.png';
import {BsGrid1X2Fill, BsFillPersonFill,} from 'react-icons/bs';

import { FaPowerOff,FaBoxOpen  } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const InventoryBar = ({children}) => {
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<BsGrid1X2Fill />
        },
       
        {
            path:"/inventory",
            name:"View Inventory",
            icon:<FaBoxOpen/>
        },
        {
            path:"/addinv",
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
                <div><img src={logo1} className='App-logo'/></div>
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