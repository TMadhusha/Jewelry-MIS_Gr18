import React, { useContext, useEffect, useState } from 'react'
import "../Component/Navbar.css"
import { FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import logo from '../Component/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Login/AuthProvider';
import MyCart from '../Pages/Jewelry/MyCart';

export default function LoggedNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username,setUsername]=useState('');
    const { logout } = useContext(AuthContext);
    const [selectedUsername,setSelectedUsername]=useState(null);
    const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(()=>{
    const storedUsername=sessionStorage.getItem('username');
    if(storedUsername){
      setUsername(storedUsername);
    }
  },[]);

  const handleLogout=() =>{
    logout();
    navigate("/");
  }

  const handleMyCart = (username) =>{
      setSelectedUsername(username);
  }

  const closePopup = () => {
    setSelectedUsername(null);
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
              <div className="dropdown">
                <span className="navLink" onClick={toggleDropdown}>
                  Jewelry
                </span>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <NavLink to="/jewelry/bangle" className="dropdown-link">
                      Bangle
                    </NavLink>
                    <NavLink to="/jewelry/bracelet" className="dropdown-link">
                      Bracelet
                    </NavLink>
                    <NavLink to="/jewelry/chain" className="dropdown-link">
                      Chain
                    </NavLink>
                    <NavLink to="/jewelry/earring" className="dropdown-link">
                      Earring
                    </NavLink>
                    <NavLink to="/jewelry/necklace" className="dropdown-link">
                      Necklace
                    </NavLink>
                    <NavLink to="/jewelry/pendant" className="dropdown-link">
                      Pendant
                    </NavLink>
                    <NavLink to="/jewelry/ring" className="dropdown-link">
                      Ring
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
              <NavLink to="/aboutus" className="navLink">
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
              {/* <a onClick={() => handleMyCart(username)} className="logoflex"> */}
              <Link className="logoflex" to={`/myCart/${username}`}>
                <FaShoppingBag />
              </Link>
            </li>

            <li className="navItem">
              <div className="dropdown">
                <span className="navLink" onClick={toggleDropdown}>
                <FaUser /> {username? `Hi,${username}`: ''}
                </span>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <NavLink to="/profile" className="dropdown-link">
                      Profile
                    </NavLink>
                    <NavLink to="/" className="dropdown-link" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </header>
      {/* {selectedUsername && ( // Only render the UpdateProduct modal if a product is selected
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <MyCart username={selectedUsername} closePopup={closePopup} />
                    </div>
                </div>
            )} */}
    </section>
  )
}
