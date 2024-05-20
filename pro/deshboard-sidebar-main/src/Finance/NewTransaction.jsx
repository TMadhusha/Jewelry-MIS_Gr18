import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar';
import axios from 'axios';

export default function NewTransaction() {
  const [customer,setCustomer]=useState([]);

  const loadCustomer = async () =>{
    try{
      const result=await axios.get("http://localhost:8080/getcustomer");
      setCustomer(result.data);
      // console.log(result.data);
    }catch(error){
      window.alert("Error loading customer");
      console.log("Error loading customer");
    }
  }

  useEffect(() =>{
    loadCustomer();
  },[]);


  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>New Transaction</h2>
                </div>
                <div className='container'>
                  <div>
                    <div>
                      <h3>search bar</h3>
                    </div>
                    <div className='table-container section'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col'>Customer ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            customer.map((customer,index)=>(
                              <tr key={index}>
                                <td>{customer.cus_id}</td>
                                <td>{customer.firstname}</td>
                                <td><button className='small-button'>Make Transaction</button></td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='margin'>
                    <form className='form'>
                      <table>
                        <tbody>
                          <tr>
                            <th>Customer ID</th>
                            <td><input type='text' name='cusId'/></td>
                          </tr>
                          <tr>
                            <th>Item ID</th>
                            <td><input type='text' name='itemId'/></td>
                          </tr>
                          <tr>
                            <th>Date</th>
                            <td><input type='date' name='date'/></td>
                          </tr>
                          <tr>
                            <th>Quantity</th>
                            <td><input type='number' name='qty'/></td>
                          </tr>
                          <tr>
                            <th>Unit Price</th>
                            <td><input type='text' name='unitPrice'/></td>
                          </tr>
                          <tr>
                            <td><button>Get Total amount</button></td>
                          </tr>
                          <tr>
                            <th>Total sales amount</th>
                            <td><input type='text' name='totalSalesAmount'/></td>
                          </tr>
                          <tr>
                            <th>Paid amount</th>
                            <td><input type='text' name='paidAmount'/></td>
                          </tr>
                          <tr>
                            <td><button>Get Balance</button></td>
                          </tr>
                          <tr>
                            <th>Balance</th>
                            <td><input type='text' name='unitPrice'/></td>
                          </tr>
                        </tbody>
                      </table>
                    </form>

                  </div>
                </div>
            </div>
        </Financebar>
    </div>
  )
}
