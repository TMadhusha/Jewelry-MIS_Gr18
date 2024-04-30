import React, { useState } from 'react';
import logo1 from '../images/logo1_small.png'
import {BsGrid1X2Fill,} from 'react-icons/bs';
import { AiOutlineRise,AiOutlineFall } from "react-icons/ai";
import { FaPowerOff, FaTruck ,FaAddressCard  } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { GrMoney } from "react-icons/gr";


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<BsGrid1X2Fill />
        },
        {
            path:"/supplier",
            name:"Supplier Basic Info.",
            icon:<FaTruck/>
        },
       
        {
            path:"/add-supplier",
            name:"Add-Supplier",
            icon:<FaAddressCard />
        }, 
        {
            path:"/Payment",
            name:"Payment-Overview",
            icon:<GrMoney />
        }, 
        {
            path:"/AddPayment",
            name:"Add Payments",
            icon:<AiOutlineFall />
        },
        
        {
            path:"/login",
            name:"Logout",
            icon:<FaPowerOff/>
        }
    ]
    return (
        <div className="container">
           <div  className="sidebar">
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

export default Sidebar;