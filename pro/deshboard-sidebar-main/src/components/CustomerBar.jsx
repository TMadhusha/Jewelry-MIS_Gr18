import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo1 from '../images/logo1_small.png';
import { FaUserFriends, FaShoppingCart, FaUndoAlt, FaMoneyBillWave, FaPowerOff } from 'react-icons/fa';
import { BsGrid1X2Fill } from 'react-icons/bs';

const CustomerBar = ({ children }) => {
    const [isHandlePaymentsOpen, setIsHandlePaymentsOpen] = useState(false);

    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <BsGrid1X2Fill />
        },
        {
            path: "/manage-customers",
            name: "Manage Customers",
            icon: <FaUserFriends />
        },
        {
            path: "/order-manage",
            name: "Manage Orders",
            icon: <FaShoppingCart />,
            subItems:[
                {
                    path:"/onlineOrders",
                    name:"Online Orders"
                },
                {
                    path:"/InstoreOrders",
                    name:"In-store Purchases"
                }       
            ]
        },
        {
            path: "/manage-returns",
            name: "Manage Returns",
            icon: <FaUndoAlt />
        },
       
        {
            path: "/logout",
            name: "Logout",
            icon: <FaPowerOff />
        }
    ];

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
                                    onMouseEnter={() => setIsHandlePaymentsOpen(true)} // Open submenu on hover
                                    onMouseLeave={() => setIsHandlePaymentsOpen(false)} // Close submenu on mouse leave
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                    {/* Render sub-items only if "Handle Payments" submenu is open */}
                                    {isHandlePaymentsOpen && (
                                        <div className="sub_items">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <NavLink
                                                    to={subItem.path}
                                                    key={subIndex}
                                                    className="link sub_link"
                                                    activeClassName="active"
                                                >
                                                    <div className="icon">{subItem.icon}</div>
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

export default CustomerBar;
