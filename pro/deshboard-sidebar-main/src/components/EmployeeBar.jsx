import React, { useState } from 'react';
import logo1 from '../images/logo1_small.png';
import 
{BsGrid1X2Fill, BsFillPersonFill, BsFillPersonPlusFill ,BsFillPersonCheckFill ,BsPeopleFill} from 'react-icons/bs';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
import { FaPowerOff} from "react-icons/fa";
import { FaMoneyBillTrendUp,FaMoneyBill1Wave  } from "react-icons/fa6";
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
            icon:<BsFillPersonPlusFill/>
        },
        {
            path:"/attendance",
            name:"Attendance",
            icon:<BsFillPersonCheckFill />
        },
        {
            path:"/salary",
            name:"Salary",
            icon:<FaMoneyBill1Wave/>
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