import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import '../css/employee.css';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Attendance() {
  const [attendance,setAttendance]=useState([]);
  const [searchQuery,setSearchQuery]=useState('');
  const [employees,setEmployees]=useState([]);
    
  const {att_id}=useParams();
  const {emp_id}=useParams();

  const loadAttendance=async()=>{
    try{
      const result=await axios.get("http://localhost:8080/attendanceG")
    setAttendance(result.data)
    }catch(error){
      window.alert("Error loading attendance");
      console.log("Error loading attendance");
    }
    }
    

  const handleSearchInputChange=(e)=>{
    setSearchQuery(e.target.value);
  }

  const filteredAttendance = attendance.filter(attendance => {
    return (
      attendance &&
      (attendance.emp_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.month?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.date?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (searchQuery.trim() !== '' && filteredAttendance.length === 0) {
    alert("No search results found");
  }

  useEffect(()=>{
    loadEmp();
    loadAttendance();
  },[])

  const loadEmp=async()=>{
    const result=await axios.get("http://localhost:8080/employees");
    setEmployees(result.data);
  }

  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
          <div className='container'>
            <div>
          <div className='main-title'>
          <h2>Employees</h2>
          </div>
          <div className='table-container section'>
            <table className='table'>
              <thead>
                <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {
                employees.map((employee,index)=>(
                <tr key={index}>
                 <td>{employee.emp_id}</td>
                 <td>{employee.role}</td>
                 <td><Link className='btn' to={`/addAttendance/${employee.emp_id}`}> Add Attendance </Link></td>
                </tr> 
                ))
              }
              </tbody>
            </table>
          </div>
          </div>
          <div>
          <div className='main-title'>
          <h2 className='heading'>Attendance</h2>
          </div>
          <div className='searchAdd-container section'>
            <div className='search-bar-container'>
            <FaSearch className='search-icon' />
            <input type='text' placeholder='Search here...' className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
            </div>
          </div>
          <div className='tab'>
          <table class="table">
            <thead className='tb-head'>
             <tr>
                <th scope="col">Attendance ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Date</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan={'2'}>Action</th>
            </tr>
            </thead> 
            <tbody>
              { 
                filteredAttendance.map((attendance,index)=>(
                  <tr key={index} className='tb-tr'>
                    <td>{attendance.att_id}</td>
                    <td>{attendance.emp_id}</td>
                    <td>{attendance.date}</td>
                    <td>{attendance.check_In}</td>
                    <td>{attendance.check_Out}</td>
                    <td>{attendance.status}</td>
                    <td><Link className='small-button' to={`/editAttendance/${attendance.att_id}`}>Update</Link></td>    
                  </tr>
                ))
                }
            </tbody>
          </table>
          </div>
          </div>
          </div>
        </div>  
      </EmployeeBar>
    </div>
  )
}

