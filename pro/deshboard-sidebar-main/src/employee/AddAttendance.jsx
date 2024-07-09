import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/employee.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';

export default function AddAttendance() {
  let navigate = useNavigate();
  let { empId } = useParams();
  let {att_id}=useParams();
  console.log('Employee ID:', empId);

  //Get the current date
  const getCurrentDate = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month= String(date.getMonth() + 1).padStart(2, '0');
    const day= String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [attendance, setAttendance] = useState({
    att_id:"0",
    empId: empId, // Initialize with the empId from URL
    month: "",
    date: getCurrentDate(),
    check_In: "",
    check_Out: ""
  });

  const [errors, setErrors] = useState({});
  const [checkInDisabled, setCheckInDisabled] = useState(false); 

  // Function to fetch the last att_id from the backend and increment it
  const fetchLastAttendanceId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/attendanceG");
      const lastAttendance = result.data[result.data.length - 1];
      const lastAttId = lastAttendance ? lastAttendance.att_id : 0;
      // Increment the last att_id to get the new att_id
      setAttendance({ ...attendance, att_id: lastAttId + 1 });
    } catch (error) {
      console.error("Error fetching last attendance id:", error);
    }
  };

  useEffect(() => {
    fetchLastAttendanceId(); // Fetch the last attendance id when the component mounts
  }, []);

  useEffect(()=>{
    if (attendance.status === "Absent") {
      setCheckInDisabled(true);
    } else {
      setCheckInDisabled(false);
    }
  }, [attendance.status]);


  const OnInputChange = (e) => {
    const { name, value } = e.target;

  setAttendance({ ...attendance, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/attendanceP", attendance);
        window.alert("Attendance added successfully...!");
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

    // Validation for date
    if (!attendance.date.trim()) {
      window.alert("Date is required");
      return false;
    } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(attendance.date)) {
      window.alert("Date should be in the format 'yyyy/mm/dd'");
      return false;
    }

    // Validation for check_in
    if (!checkInDisabled) {
      if (!attendance.check_In.trim()) {
        window.alert("Check In time is required");
        return false;
      } else if (!/^([01]\d|2[0-3]):?([0-5]\d)$/.test(attendance.check_In)) {
        window.alert("Check In time should be in the format HH:MM (24-hour format)");
        return false;
      }
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
                    <td><input type='text' name='att_id' placeholder='Attendance ID' value={attendance.att_id} onChange={(e) => OnInputChange(e)} /></td>
                    {errors.att_id && <span className="error">{errors.att_id}</span>}
                  </tr>
                  <tr>
                    <th><label>Employee ID: </label></th>
                    <td><input type='text' name='empId' placeholder='Employee ID' value={attendance.empId} onChange={(e) => OnInputChange(e)} disabled /></td>
                  </tr>
                  <tr>
                    <th><label>Date: </label></th>
                    <td><input type='date' name='date' placeholder='Date' value={attendance.date} onChange={(e) => OnInputChange(e)} /></td>
                    {errors.date && <span className="error">{errors.date}</span>}
                  </tr>
                  <tr>
                    <th><label>Status: </label></th>
                    <td><select  name='status' placeholder='status' value={attendance.status} onChange={(e) => OnInputChange(e)} className='select'>
                      <option value={'None'}>None</option>
                      <option value={'Present'}>Present</option>
                      <option value={'Absent'}>Absent</option>
                    </select>
                    </td>
                  </tr>
                  <tr>
                    <th><label>Check In: </label></th>
                    <td><input type='text' name='check_In' placeholder='Check In' value={attendance.check_In} onChange={(e) => OnInputChange(e)} disabled={checkInDisabled}/></td>
                    {errors.check_In && <span className="error">{errors.check_In}</span>}
                  </tr>
                  <tr>
                    <th><label>Check Out: </label></th>
                    <td><input type='text' name='check_Out' placeholder='Check Out' value={attendance.check_Out} onChange={(e) => OnInputChange(e)} disabled /></td>
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
