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

      const [errors,setErrors]=useState({});

      const OnInputChange=(e)=>{
        setAttendance({...attendance,[e.target.name]:e.target.value})
      }
    
      const onSubmit=async (e)=>{
        e.preventDefault();
        if(validateForm()){
          try {
            await axios.post("http://localhost:8080/attendanceP", attendance);
            window.alert("Attendance added succesfully...!");
            navigate("/attendance");
          } catch (error) {
            console.error("Error adding attendance:", error);
            window.alert("Failed to add attendance. Please try again.");
          }
        }        
      };

      const validateForm = () => {
        let errors = {};
        let isValid = true;
    
        // Basic validation for each field
        //Validation for emp_id
        if(!emp_id.trim()){
          window.alert("Employee Id is required");
          isValid=false;
        }

        //Validation for att_id
        if (!att_id.trim()) {
          window.alert("Attendance Id is required");
          isValid = false;
        }

        //Validation for date
        if(!date.trim()){
          window.alert("Date is required");
          return false;
        }else if (!/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
          window.alert("Date should be in the format 'yyyy/mm/dd'");
          return false;
        }

        //Validation for check_in
        if(!check_In.trim()){
          window.alert("Check In time is required");
          return false;
        }else if(!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(check_In)){
          window.alert("Check In time should be in the format HH:MM (24-hour format)");
          return false;
        }

        setErrors(errors);
        return isValid;
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
                    <th><label>Attendance ID: </label></th>
                    <td><input type={'text'} name='att_id'  placeholder={'Attendance ID'} value={att_id} onChange={(e)=>OnInputChange(e)}/></td>
                    {errors.att_id && <span className="error">{errors.att_id}</span>}
                  </tr>
                  <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type={'text'} name='emp_id'  placeholder={'Employee ID'} value={emp_id} onChange={(e)=>OnInputChange(e)}/></td>
                    {errors.emp_id && <span className="error">{errors.emp_id}</span>}
                  </tr>
                  <tr>
                    <th><label>Date: </label></th>
                    <td><input type={'text'} name='date'  placeholder={'Date'} value={date} onChange={(e)=>OnInputChange(e)}/></td>
                    {errors.date && <span className="error">{errors.date}</span>}
                  </tr>
                  <tr>
                    <th><label>Check In: </label></th>
                    <td><input type={'text'} name='check_In'  placeholder='Check In' value={check_In} onChange={(e)=>OnInputChange(e)}/></td>
                    {errors.check_In && <span className="error">{errors.check_In}</span>}
                  </tr>
                  <tr>
                    <th><label>Check Out: </label></th>
                    <td><input type={'text'} name='check_Out'  placeholder='Check Out' value={check_Out} onChange={(e)=>OnInputChange(e)} disabled/></td>
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
