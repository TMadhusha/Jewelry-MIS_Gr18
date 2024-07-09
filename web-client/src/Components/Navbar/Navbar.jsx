import React, { useState } from 'react';
import './navbar.css';
import { FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import logo from '../../Assets/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="/" className="logo flex">
            <img src={logo} className="img" alt="Logo" />
            <h1>Italy Silver Choice</h1>
          </a>
        </div>

        <div className="navBar">
          <ul className="navLists flex">
            <li className="navItem">
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
            </li>

            <li className="navItem">
              <div className="dropdown">
                <span className="navLink" onClick={toggleDropdown}>
                  Jewelry
                </span>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <NavLink to="/bangles" className="dropdown-link">
                      Bangles
                    </NavLink>
                    <NavLink to="/jewelry/bracelet" className="dropdown-link">
                      Bracelets
                    </NavLink>
                    <NavLink to="/jewelry/chain" className="dropdown-link">
                      Chains
                    </NavLink>
                    <NavLink to="/jewelry/earring" className="dropdown-link">
                      Earrings
                    </NavLink>
                    <NavLink to="/jewelry/necklace" className="dropdown-link">
                      Necklaces
                    </NavLink>
                    <NavLink to="/jewelry/pendant" className="dropdown-link">
                      Pendants
                    </NavLink>
                    <NavLink to="/jewelry/ring" className="dropdown-link">
                      Rings
                    </NavLink>
                  </div>
                )}
              </div>
            </li>

            <li className="navItem">
              <NavLink to="/promotion" className="navLink">
                Promotion
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/contact" className="navLink">
                Contact Us
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/about" className="navLink">
                About Us
              </NavLink>
            </li>

            <li className="navItem">
              <input type="text" placeholder="Search" className="input-wrapper" />
            </li>

            <li className="navItem">
              <a href="#" className="logoflex">
                <FaSearch />
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="logoflex">
                <FaShoppingBag />
              </a>
            </li>

            <li className="navItem">
              <a href="#" className="logoflex">
                <FaUser />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
