import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import axios from 'axios';

export default function ViewSalary() {
    //create const variables to store salary
    const [salary,setSalary]=useState([]);

    //load salary
    const loadSalary=async ()=>{
        try{
            const result=await axios.get("http://localhost:8080/salaryG");
            setSalary(result.data);
        }catch(error){
            window.alert("Error loading salary");
            console.log("Error loadin salary", error);
        }
    }

    useEffect(()=>{
        loadSalary();
    })


  return (
    <div className='container'>
        <EmployeeBar>
        <div className='main-container'>
            <div className='main-title'>
                <h2>Salary details of the employees </h2>
            </div>
            <div className='table-container section'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Employee ID</th>
                            <th scope='col'>Role</th>
                            <th scope='col'>Start Date</th>
                            <th scope='col'>End Date</th>
                            <th scope='col'>Total Working Hours</th>
                            <th scope='col'>Hourly Rate</th>
                            <th scope='col'>Total Amount</th>                  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salary.map((salary,index)=>(
                                <tr key={index}>
                                    <td>{salary.id}</td>
                                    <td>{salary.empId}</td>
                                    <td>{salary.role}</td>
                                    <td>{salary.startDate}</td>
                                    <td>{salary.endDate}</td>
                                    <td>{salary.totalWorkingHours}</td>
                                    <td>{salary.hourlyRate}</td>
                                    <td>{salary.totalAmount}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>
        </div>
        </EmployeeBar>
    </div>
  )
}
