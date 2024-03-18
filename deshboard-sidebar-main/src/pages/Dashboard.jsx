import React from 'react';
//import {BsGrid1X2Fill} from 'react-icons/bs';
import backgroundImage from '../components/back.jpg';
import { FcPositiveDynamic } from 'react-icons/fc';
import Home from '../components/Home';

const Dashboard = () => {
    return (
        <main className='main-container backimg'>
        <div className='main-title ' >
            <h1 className='page-title'>DASHBOARD</h1>
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