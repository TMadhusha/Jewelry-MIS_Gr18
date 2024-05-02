import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import axios from 'axios';

export default function Salary() {
  const [employees,setEmployees]=useState([]);

  const loadEmp=async()=>{
    const result=await axios.get("http://localhost:8080/employees");
    setEmployees(result.data)
  }

  useEffect(()=>{
    loadEmp();
  })


  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
        <div className='main-title'>
            <h2>Salary management</h2>
        </div>
        <div className='container'>
          <div className='table-container section'>
            <table className='table'>
              <thead>
                <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Role</th>
                <th scope="col" >Action</th>
                </tr>
              </thead>
              <tbody>
              {
                employees.map((employee,index)=>(
                <tr key={index}>
                 <td>{employee.emp_id}</td>
                 <td>{employee.role}</td>
                 <td><button className='small-button'>salary</button></td>
                </tr> 
                ))
              }
              </tbody>
            </table>

          </div>
          <div>

          </div>

        </div>
        </div>  
        </EmployeeBar>
    </div>
  )
}
