import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/employee.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';


export default function EditAttendance() {

  let navigate = useNavigate();
  const { att_id } = useParams();
  console.log('Attendance ID:', att_id);


  const [attendance, setAttendance] = useState({
    empId: "",
    date: "",
    status: "",
    check_In: "",
    check_Out: "",
    workingHours: ""
  });

  const { empId, date, status, check_In, check_Out, workingHours } = attendance;

  const [errors, setErrors] = useState({});
  const [checkOutDisabled, setCheckOutDisabled] = useState(false);

  useEffect(() => {
    if (attendance.status === "Absent") {
      setCheckOutDisabled(true);
    } else {
      setCheckOutDisabled(false);
    }
  }, [attendance.status]);

  const OnInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update the attendance state
    setAttendance({ ...attendance, [name]: value });
  
    if (name === 'check_Out') {
      // Update the working hours based on check_In and check_Out times
      const checkInTime = new Date(`2000-01-01T${attendance.check_In}`);
      const checkOutTime = new Date(`2000-01-01T${value}`);
  
      // Calculate the difference in milliseconds
      const diffMs = checkOutTime - checkInTime;
      // Convert milliseconds to hours
      const workingHours = diffMs / (1000 * 60 * 60);
      // Round the working hours to 2 decimal places
      const roundedWorkingHours = workingHours.toFixed(2);
  
      // Update the check_Out and workingHours fields in the attendance state
      setAttendance({ ...attendance, check_Out: value, workingHours: roundedWorkingHours });
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(`http://localhost:8080/attendance/${att_id}`, attendance);
        window.alert("Attendance Updated successfully...!");
        navigate("/attendance");
      } catch (error) {
        console.error("Error updating attendance:", error);
        window.alert("Failed to update attendance. Please try again.");
      }
    }
  }

  const loadAttendance = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/attendance/${att_id}`);
      setAttendance(result.data);
    } catch (error) {
      window.alert('Error loading attendance:', error);
      console.error("Error loading attendance:", error);
    }
  };
  useEffect(() => {
    loadAttendance();
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    //Validation for check_out
    if (!checkOutDisabled && attendance.check_Out) {
      if (!attendance.check_Out.trim()) {
        window.alert("Check Out time is required");
        return false;
      } else if (!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(attendance.check_Out)) {
        window.alert("Check Out time should be in the format HH:MM (24-hour format)");
        return false;
      }
    }

    setErrors(errors);
    return isValid;
  }

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
                  <td><input type={'text'} name='empId' placeholder={'Employee ID'} value={empId} onChange={(e) => OnInputChange(e)} disabled /></td>
                </tr>
                <tr>
                  <th><label>Date: </label></th>
                  <td><input type={'text'} name='date' placeholder={'Date'} value={date} onChange={(e) => OnInputChange(e)} disabled /></td>
                </tr>
                <tr>
                  <th><label>Status: </label></th>
                  <td><input type={'text'} name='status' placeholder='Status' value={status} onChange={(e) => OnInputChange(e)} disabled /></td>
                </tr>
                <tr>
                  <th><label>Check In: </label></th>
                  <td><input type={'text'} name='check_In' placeholder='Check In' value={check_In} onChange={(e) => OnInputChange(e)} disabled /></td>
                </tr>
                <tr>
                  <th><label>Check Out: </label></th>
                  <td><input type={'text'} name='check_Out' placeholder='Check Out' value={check_Out} onChange={(e) => OnInputChange(e)} disabled={checkOutDisabled} /></td>
                  {errors.check_Out && <span className="error">{errors.check_Out}</span>}
                </tr>
                <tr>
                  <th><label>Working Hours: </label></th>
                  <td><input type='text' name='workingHours' placeholder='Working_Hours' value={workingHours} onChange={(e) => OnInputChange(e)} disabled /></td>
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
