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


const EmployeeBar = ({children}) => {
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<BsGrid1X2Fill />
        },
       
        {
            path:"/employee",
            name:"View Employee",
            icon:<BsFillPersonFill/>
        },
        {
            path:"/addemp",
            name:"Add Employee",
            icon:<BsFillPersonFill/>
        },
        {
            path:"/attendance",
            name:"Attendance",
            icon:<BsFillPersonFill/>
        },
        {
            path:"/salary",
            name:"Salary",
            icon:<BsFillPersonFill/>
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

export default EmployeeBar;