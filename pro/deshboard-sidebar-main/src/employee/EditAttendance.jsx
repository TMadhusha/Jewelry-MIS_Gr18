import React, {useEffect, useState } from 'react';
import axios from 'axios';
import '../css/employee.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';
 

export default function EditAttendance() {

  let navigate=useNavigate();
  const { att_id } = useParams();
console.log('Attendance ID:', att_id);


    const [attendance, setAttendance]=useState({
        emp_id:"",
        date:"",
        check_In:"",
        check_Out:""
      });

      const {emp_id,date,check_In,check_Out}=attendance;

      const OnInputChange=(e)=>{
        setAttendance({...attendance,[e.target.name]:e.target.value})
      }
    
      const onSubmit=async (e)=>{
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/attendanceP", attendance);
          window.alert("Attendance Updated succesfully...!");
          navigate("/attendance");
        } catch (error) {
          console.error("Error adding attendance:", error);
          window.alert("Failed to add attendance. Please try again.");
        }
      }

      const loadAttendnace=async ()=>{
        try {
          const result = await axios.get(`http://localhost:8080/attendance/${att_id}`);
          setAttendance(result.data);
        } catch (error) {
          window.alert('Error loading attendance:', error);
          console.error("Error loading attendance:", error);
        }
      };

      useEffect(()=>{
        loadAttendnace();
      },[]);

  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container margin'>
            <div className='main-title'>
            <h2>Edit Attendance</h2>
            </div>
            <div>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <table>
                  <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type={'text'} name='emp_id'  placeholder={'Employee ID'} value={emp_id} onChange={(e)=>OnInputChange(e)} disabled/></td>
                  </tr>
                  <tr>
                    <th><label>Date: </label></th>
                    <td><input type={'text'} name='date'  placeholder={'Date'} value={date} onChange={(e)=>OnInputChange(e)} disabled/></td>
                  </tr>
                  <tr>
                    <th><label>Check In: </label></th>
                    <td><input type={'text'} name='check_In'  placeholder='Check In' value={check_In} onChange={(e)=>OnInputChange(e)} disabled/></td>
                  </tr>
                  <tr>
                    <th><label>Check Out: </label></th>
                    <td><input type={'text'} name='check_Out'  placeholder='Check Out' value={check_Out} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr className='button-container'>
                    <td><button className='small-button' type="submit">Update</button></td>
                    <td><Link className='small-button' to={'/attendance'}>Cancel</Link></td>
                  </tr>
                </table>
              </form>
            </div>  
        </div>
        </EmployeeBar>
    </div>        
  )
}
