import React from 'react';
import { NavLink } from 'react-router-dom';
import logo1 from '../images/logo1_small.png';
import { FaUserFriends, FaShoppingCart, FaUndoAlt, FaMoneyBillWave, FaPowerOff } from 'react-icons/fa'; // Corrected import statement
import { BsGrid1X2Fill } from 'react-icons/bs';

const CustomerBar = ({ children }) => {
    const menuItems = [
        {
            path: "/",
            name: "Dashboard",
            icon: <BsGrid1X2Fill />
        },
        {
            path: "/manage-customers",
            name: "Manage Customers",
            icon: <FaUserFriends />
        },
        {
            path: "/manage-orders",
            name: "Manage Orders",
            icon: <FaShoppingCart />
        },
        {
            path: "/manage-returns",
            name: "Manage Returns",
            icon: <FaUndoAlt />
        },
        {
            path: "/handle-payments",
            name: "Handle Payments",
            icon: <FaMoneyBillWave />
        },
        {
            path: "/logout",
            name: "Logout",
            icon: <FaPowerOff /> // Corrected icon name
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
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
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

export default CustomerBar;
