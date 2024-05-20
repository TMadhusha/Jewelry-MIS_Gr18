import React, { useEffect, useState } from 'react';
import Financebar from '../components/Financebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Finance = () => {
    //create const variables to store sales
    const [sales,setSales]=useState([]);

    //load sales
    const loadSales=async ()=>{
        try{
            const result=await axios.get("http://localhost:8080/salesAndRevenuesG");
            setSales(result.data);
        }catch(error){
            window.alert("Error loading sales");
            console.log("Error loading sales", error);
        }
    }

    useEffect(()=>{
        loadSales();
    },[])

    return (
        <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>Sales And Revenues</h2>
                </div>
                <div className='container'>
                    <div><Link className='small-button' to={'/newTransaction'}>New Transaction</Link></div>
                </div>
                <div className='table-container section'>
                    <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Transaction ID</th>
                            <th scope='col'>Customer ID</th>
                            <th scope='col'>Item ID</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Unit Price</th>
                            <th scope='col'>Total Sales Amount</th>
                            <th scope='col'>Paid Amount</th>    
                            <th scope='col'>Balance</th>
                            <th scope='col'>Status</th>              
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.map((SalesAndRevenues,index)=>(
                                <tr key={index}>
                                    <td>{SalesAndRevenues.transactionId}</td>
                                    <td>{SalesAndRevenues.cusId}</td>
                                    <td>{SalesAndRevenues.itemId}</td>
                                    <td>{SalesAndRevenues.date}</td>
                                    <td>{SalesAndRevenues.qty}</td>
                                    <td>{SalesAndRevenues.unitPrice}</td>
                                    <td>{SalesAndRevenues.totalSalesAmount}</td>
                                    <td>{SalesAndRevenues.paidAmount}</td>
                                    <td>{SalesAndRevenues.balance}</td>
                                    <td>{SalesAndRevenues.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>

                </div>
            </div>
        </Financebar>
    </div>
    );
};

export default Finance;