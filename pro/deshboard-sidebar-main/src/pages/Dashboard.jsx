import React from 'react';
//import {BsGrid1X2Fill} from 'react-icons/bs';
import backgroundImage from '../images/employees.jpg';
import { FcPositiveDynamic } from 'react-icons/fc';
import Home from '../components/Home';
import logo from '../images/logo2-bg.png';
import { Link } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className='container'>
                <div className='title-bar'> 
                <div  className='title-section'>
                 <div><img src={logo} className='title-logo'/></div>
                   <h1 className='logo'>Jewel Mart</h1>
                   <h3 style={{fontFamily:'Monotype Corsiva',fontSize:'25px',}}>A Perfect Choice</h3>
                </div>
                </div>
        
        <div className='main-container'>
            <div className='page-bar'>
            <div className='page-section'>
                <h1 className=' page-title  '>DASHBOARD</h1>
                <h1><Link to={"/login"} style={{marginLeft:"820px", color:"silver"}}><FaPowerOff/></Link></h1>
            </div>
            </div>
            
            <div className='main-cards'>
                <div>
                    <Link className='card card-inner first-child' to={'/employee'} ><h1>Employee</h1></Link>
                </div>

                <div>
                    <Link className='card card-inner second-child' to={'/customer'}><h1>Customer</h1></Link>
                </div>
                <div>
                    <Link className='card card-inner third-child' to={'/inventory'}><h1>Inventory</h1></Link>
                </div>
            </div>
            
            <div className='main-cards'>
                <div>
                    <Link className='card card-inner forth-child' to={'/supplier'}><h1>Supplier</h1></Link>
                </div>

                <div>
                    <Link className='card card-inner fifth-child' to={'/finance'} ><h1>Finance</h1></Link>
                </div>
            </div>             
            

        </div>
        </div>
        
        
    );
};

export default Dashboard;