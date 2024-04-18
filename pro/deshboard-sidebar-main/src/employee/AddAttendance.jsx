import React, {useState } from 'react';
import axios from 'axios';
import '../css/employee.css';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';
 

export default function AddAttendance() {

  let navigate=useNavigate();

    const [attendance, setAttendance]=useState({
        emp_id:"",
        att_id:"",
        date:"",
        check_In:"",
        check_Out:""
      });

      const {emp_id,att_id,date,check_In,check_Out}=attendance;

      const OnInputChange=(e)=>{
        setAttendance({...attendance,[e.target.name]:e.target.value})
      }
    
      const onSubmit=async (e)=>{
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/attendanceP", attendance);
          window.alert("Attendance added succesfully...!");
          navigate("/attendance");
        } catch (error) {
          console.error("Error adding attendance:", error);
          window.alert("Failed to add attendance. Please try again.");
        }
      }

  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
            <div className='main-title'>
            <h2>Add Attendance</h2>
            </div>
            <div className='margin'>
              <form className='form' onSubmit={(e) => onSubmit(e)}>
                <table>
                  <tbody>
                  <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type={'text'} name='emp_id'  placeholder={'Employee ID'} value={emp_id} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr>
                    <th><label>Attendance ID: </label></th>
                    <td><input type={'text'} name='att_id'  placeholder={'Attendance ID'} value={att_id} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr>
                    <th><label>Date: </label></th>
                    <td><input type={'text'} name='date'  placeholder={'Date'} value={date} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr>
                    <th><label>Check In: </label></th>
                    <td><input type={'text'} name='check_In'  placeholder='Check In' value={check_In} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr>
                    <th><label>Check Out: </label></th>
                    <td><input type={'text'} name='check_Out'  placeholder='Check Out' value={check_Out} onChange={(e)=>OnInputChange(e)}/></td>
                  </tr>
                  <tr className='button-container'>
                    <td><button className='small-button' type="submit">Add</button></td>
                    <td><Link className='small-button' to={'/attendance'}>Cancel</Link></td>
                  </tr>
                  </tbody>
                </table>
              </form>
            </div>  
        </div>
        </EmployeeBar>
    </div>        
  )
}
