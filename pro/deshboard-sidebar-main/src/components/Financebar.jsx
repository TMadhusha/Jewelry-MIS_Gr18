import { Children } from "react";
import { useState } from 'react';
import logo1 from "../images/logo1_small.png";
import { NavLink } from 'react-router-dom';
import 
{BsGrid1X2Fill, BsFillPersonFill, BsFillPersonPlusFill ,BsFillPersonCheckFill} from 'react-icons/bs';
import { FaPowerOff, FaChartArea , FaChartLine } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";


const Financebar = ({children}) => {
    const [isHandleSalesOpen, setIsHandleSalesOpen] = useState(false);

    const menuItems=[
        {
            path:"/",
            name:"Dashboard",
            icon:<BsGrid1X2Fill/>
        },
        {
            path:"/finance",
            name:"Sales and Revenue",
            icon:<FaChartArea/>,
        },
        {
            path:"/expenses",
            name:"Expenses",
            icon:<GiExpense/>,
            subItems:[
                {
                    path:'/viewExpenses',
                    name:"View Expenses",
                },
                {
                    path:'/inventoryCost',
                    name:"Mark Expenses",
                }
            ]
        },
        {
            path:"/profitAndLossStatement",
            name:"Profit/Loss Statement",
            icon:<FaChartLine/>
        },
        {
            path:"/login",
            name:"Logout",
            icon:<FaPowerOff/>
        }
    ]
    return(
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
                                    onMouseEnter={() => setIsHandleSalesOpen(true)} // Open submenu on hover
                                    onMouseLeave={() => setIsHandleSalesOpen(false)} // Close submenu on mouse leave
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                    {/* Render sub-items only if "Handle Payments" submenu is open */}
                                    {isHandleSalesOpen && (
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
export default Financebar;