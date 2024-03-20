import React from 'react'
import './footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import logo from '../../Assets/logo.png';



const Footer = () => {
  return (

    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">

          <div className="sb_footer-links_div">

          <img src={logo} alt='' className="logob flex"/>
            <h4>Let your style shine</h4>            
          </div>

          <div className="sb_footer-links_div">
            <h4>Contact Us</h4>
              <p>No 13, opposite Peoples Bank Nittambuwa</p>
              <p>Italy silver.013@gmail.com</p>
              <p>0777313216</p>
          </div>

          <div className="sb_footer-links_div">

          <h4>Jewelry</h4>
          <a href="">
            <p>Necklaces</p>
          </a>
          <a href="">
            <p>Bangles</p>
          </a>
          <a href="">
            <p>Rings</p>
          </a>
          <a href="">
            <p>Chains</p>
          </a>

          </div>

          <div className="sb_footer-links_div">
            <h4>Help</h4>

            <a href="">
              <p>About Us</p>
            </a>

            <a href="">
              <p>Contact Us</p>
            </a>

            <a href="">
              <p>Promotions</p>
            </a>

          </div>

          <div className="sb_footer-links_div">
            <h4>Coming Soon on</h4>
            <div className="socialmedia">
              <p><FaFacebook size={30}/></p>
              <p><FaTwitter size={30}/></p>
              <p><FaLinkedin size={30}/></p>
              <p><FaInstagramSquare size={30}/></p>
            </div>

          </div>
        </div>   

          <hr></hr>

          <div className="sb_footer-below">
            <div className="sb_footer-copyright">
              <p>
                @{new Date().getFullYear()} ItalySilverChoice. All right reserved.
              </p>
            </div>

            <div className="sb_footer-below-links">
              <a href=""><div><p>Terms & Conditions</p></div></a>
              <a href=""><div><p>Privacy</p></div></a>
              <a href=""><div><p>Security</p></div></a>

            </div>


          </div>


        
      </div>
    </div>



  )
}

export default Footer