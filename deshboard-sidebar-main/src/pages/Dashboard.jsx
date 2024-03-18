import React from 'react';
//import {BsGrid1X2Fill} from 'react-icons/bs';
import { FcPositiveDynamic } from 'react-icons/fc';
import Home from '../components/Home';

const Dashboard = () => {
    return (
        <main className='main-container'>
        <div className='main-title' >
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Jewellery Type</h3>
                    <FcPositiveDynamic className='card_icon'/>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total stock</h3>
                    <FcPositiveDynamic className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Customers</h3>
                    <FcPositiveDynamic className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Total Sale</h3>
                    <FcPositiveDynamic className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>
    </main>
    );
};

export default Dashboard;