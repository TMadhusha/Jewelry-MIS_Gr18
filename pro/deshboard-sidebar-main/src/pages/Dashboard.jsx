import React from 'react';
//import {BsGrid1X2Fill} from 'react-icons/bs';
import backgroundImage from '../components/back.jpg';
import { FcPositiveDynamic } from 'react-icons/fc';
import Home from '../components/Home';

const Dashboard = () => {
    return (
        <main className='main-container'>
        <div className='main-title ' >
            <h1 className='page-title'>DASHBOARD</h1>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <img src="employee.jpg" />           
            </div>
            <div><button>Employee</button></div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Customer</h3>
                    
                </div>
                
            </div>
            <div className='card'>
                <div className='card-inner'>
                    
                </div>
                
            </div>
            <div className='card'>
                <div className='card-inner'>
                   
                    
                </div>
            </div>
        </div>
    </main>
    );
};

export default Dashboard;