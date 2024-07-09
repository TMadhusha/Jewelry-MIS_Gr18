import React, { useState } from 'react';
import logo1 from '../images/logo1_small.png';
import {BsGrid1X2Fill, BsFillPersonFill, BsFillPersonPlusFill ,BsFillPersonCheckFill} from 'react-icons/bs';
import { FaPowerOff} from "react-icons/fa";
import { FaMoneyBill1Wave  } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';


const EmployeeBar = ({children}) => {
    const [isHandleSalaryOpen, setIsHandleSalarysOpen] = useState(false);
    
    const menuItems=[
        {
            path:"/dashboard",
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
            icon:<FaMoneyBill1Wave/>,
            subItems:[
                {
                    path:"/viewSalary",
                    name:"View Salary"
                },
                {
                    path:"/salary",
                    name:"Calculate Salary"
                }       
            ]
        },
        {
            path:"/",
            name:"Logout",
            icon:<FaPowerOff/>
        }
    ]
    return (
        <div className="container">
            <div className="title-bar">
                <div className="top_section">
                    <div><img src={logo1} className='App-logo' alt="Logo" /></div>
                </div>
                {
                    menuItems.map((item, index) => (
                        <div key={index}>
                            {item.subItems ? ( // Check if sub-items exist
                                <div
                                    className="link"
                                    onMouseEnter={() => setIsHandleSalarysOpen(true)} // Open submenu on hover
                                    onMouseLeave={() => setIsHandleSalarysOpen(false)} // Close submenu on mouse leave
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                    {/* Render sub-items only if "Handle Payments" submenu is open */}
                                    {isHandleSalaryOpen && (
                                        <div className="sub_items">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <NavLink
                                                    to={subItem.path}
                                                    key={subIndex}
                                                    className="link sub_link"
                                                    activeClassName="active"
                                                >
                                                    {/* <div className="icon">{subItem.icon}</div> */}
                                                    <div className="link_text">{subItem.name}</div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink to={item.path} className="link" activeClassName="active">
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                </NavLink>
                            )}
                        </div>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default EmployeeBar;