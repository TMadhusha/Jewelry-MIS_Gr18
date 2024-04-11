import React, { useEffect, useState } from 'react'
import EmployeeBar from '../components/EmployeeBar'
import '../css/employee.css';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddAttendance from './AddAttendance';
import EditAttendance from './EditAttendance';

export default function Attendance() {
  const [attendance,setAttendance]=useState([]);
  const [searchQuery,setSearchQuery]=useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAttendanceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
    
  const {att_id}=useParams();

  useEffect(()=>{
    loadAttendance();
  },[]);

  const loadAttendance=async()=>{
    const result=await axios.get("http://localhost:8080/attendanceG")
    setAttendance(result.data)
    }

  const handleSearchInputChange=(e)=>{
    setSearchQuery(e.target.value);
  }

  const filteredAttendance = attendance.filter(attendance =>
    attendance.emp_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendance.att_id.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  if (searchQuery.trim() !== '' && filteredAttendance.length === 0) {
    alert("No search results found");
  }

  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
          <div className='main-title'>
          <h2>Attendance</h2>
          </div>
          <div className='searchAdd-container section'>
            <div className='addAtt'>
            <button className='btn' onClick={handleAddAttendanceClick}> Add Attendance </button>
            {isModalOpen && <AddAttendance onClose={handleCloseModal} />}
            </div>
            <div className='search-bar-container'>
            <FaSearch className='search-icon' />
            <input type='text' placeholder='Search here...' className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
            </div>
          </div>
          <div className='tab'>
          <table class="table">
            <thead>
             <tr>
                <th scope="col">Attendance ID</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Date</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col" colSpan={'2'}>Action</th>
            </tr>
            </thead>
            <tbody>
              {
                filteredAttendance.map((attendance,index)=>(
                  <tr key={index}>
                    <td>{attendance.att_id}</td>
                    <td>{attendance.emp_id}</td>
                    <td>{attendance.date}</td>
                    <td>{attendance.check_In}</td>
                    <td>{attendance.check_Out}</td>
                    <td><button className='small-button' onClick={handleAddAttendanceClick}>Update</button>
                    {isModalOpen && <EditAttendance onClose={handleCloseModal} />}
                    </td>

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

