import React, { useState } from 'react';
import logo1 from '../images/logo1_small.png';
import 
{BsGrid1X2Fill, BsFillPersonFill, BsPeopleFill} from 'react-icons/bs';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
import { FaPowerOff, FaTruck  } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { NavLink } from 'react-router-dom';


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
            path:"/customer",
            name:"Customer",
            icon:<BsPeopleFill/>
        },
        {
            path:"/employee",
            name:"Employee",
            icon:<BsFillPersonFill/>
        },
        {
            path:"/inventory",
            name:"Inventory",
            icon:<MdInventory2  />
        },
        {
            path:"/supplier",
            name:"Supplier",
            icon:<FaTruck/>
        },
        {
            path:"/finance",
            name:"Finance",
            icon:<FaMoneyBillTrendUp/>
        },
        {
            path:"/more",
            name:"More",
            icon:<IoGrid/>
        },
        {
            path:"/logout",
            name:"Logout",
            icon:<FaPowerOff/>
        }
    ]
    return (
        <div className="container">
           <div  className="sidebar">
               <div className="top_section">
                <div><img src={logo1} className='App-logo'/></div><br/>
                   <div className="logo">Italy Silver Choice</div>
                   
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