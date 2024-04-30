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
                 <td><button className='small-button'>Salary</button></td>
                </tr> 
                ))
              }
              </tbody>
            </table>
          </div>
          <div className='margin'>
            <form className='form'>
              <table>
               <tbody>
                  <tr>
                    <th>Employee ID:</th>
                    <td><input type='text' name='emp_id'/></td>
                  </tr>
                  <tr>
                    <th>Select month:</th>
                    <td>
                      <select>
                        <option value={"None"}>None</option>
                          {[...Array(12).keys()].map(month => (
                            <option key={month + 1} value={String(month + 1).padStart(2, '0')}>{String(month + 1).padStart(2, '0')}</option>
                          ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><button className='small-button'>Get working hours</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
        </div>  
        </EmployeeBar>
    </div>
  )
}
