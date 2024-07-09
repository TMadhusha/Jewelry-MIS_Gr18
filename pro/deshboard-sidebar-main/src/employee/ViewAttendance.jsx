import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

export default function ViewAttendance() {
    const [attendance, setAttendance] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const loadAttendance = async() =>{
        try{
            const result=await axios.get("http://localhost:8080/attendanceG");
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
          (attendance.empId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attendance.month?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attendance.date?.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    
      if (searchQuery.trim() !== '' && filteredAttendance.length === 0) {
        alert("No search results found");
      }

      useEffect(()=>{
        loadAttendance();
      },[])
    

  return (
    <div className='container'>
        <EmployeeBar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>View Attendance</h2>
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
                                <th scope='col'>Working Hours</th>
                            </tr>
                        </thead> 
                        <tbody>
                            { 
                                filteredAttendance.map((attendance,index)=>(
                                    <tr key={index} className='tb-tr'>
                                        <td>{attendance.att_id}</td>
                                        <td>{attendance.empId}</td>
                                        <td>{attendance.date}</td>
                                        <td>{attendance.check_In}</td>
                                        <td>{attendance.check_Out}</td>
                                        <td>{attendance.status}</td>
                                        <td>{attendance.workingHours}</td>  
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
