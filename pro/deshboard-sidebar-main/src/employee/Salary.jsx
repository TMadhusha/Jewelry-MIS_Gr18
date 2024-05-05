import React, { useEffect, useState } from 'react';
import EmployeeBar from '../components/EmployeeBar';
import axios from 'axios';

export default function Salary() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendance,setAttendance] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [salary, setSalary] = useState('');

  const loadEmp = async () => {
    try {
      const result = await axios.get("http://localhost:8080/employees");
      setEmployees(result.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  const loadAttendance = async() =>{
    try{
      const result= await axios.get("http://localhost:8080/attendanceG");
      setAttendance(result.data);
    }catch (error){
      console.error("Error load attendance",error);
    }
  }

  useEffect(() => {
    loadEmp();
    loadAttendance();
  }, []);

  const handleSalaryClick = (emp_id) => {
    // Set the selected employee ID when the salary button is clicked
    setSelectedEmployeeId(emp_id);
  }

  const calculateTotalWorkingHours = () => {
    // Filter attendance data for the selected employee and date range
    const filteredAttendance = attendance.filter(record => (
      record.empId === selectedEmployeeId &&
      new Date(record.date) >= new Date(startDate) &&
      new Date(record.date) <= new Date(endDate)
    ));

     // Debugging logs
  console.log('Selected Employee ID:', selectedEmployeeId);
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);
  console.log('Filtered Attendance:', filteredAttendance);

        // Calculate total working hours
        let totalHours = 0;
        filteredAttendance.forEach(record => {
          totalHours += parseFloat(record.workingHours);
        });
    
        // Set the total working hours state
        setTotalWorkingHours(totalHours.toFixed(2));
      }

      const handleDateChange = (e) => {
        if (e.target.name === 'start') {
          setStartDate(e.target.value);
        } else if (e.target.name === 'end') {
          setEndDate(e.target.value);
        }
      }

      const calculateSalary = () => {
        const salary = parseFloat(totalWorkingHours) * parseFloat(hourlyRate);
        setSalary(salary.toFixed(2));
      }

      const handleCancel = () => {
        // Reset all state values to initial empty values
        setSelectedEmployeeId('');
        setStartDate('');
        setEndDate('');
        setTotalWorkingHours('');
        setHourlyRate('');
        setSalary('');
      }

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
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.emp_id}</td>
                        <td>{employee.role}</td>
                        <td>
                          <button className='small-button' onClick={() => handleSalaryClick(employee.emp_id)}>Salary</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className='margin'>
              <form className='form' onSubmit={(e) => e.preventDefault()}>
                <table>
                  <tbody>
                    <tr>
                      <th>Employee ID:</th>
                      <td><input type='text' name='emp_id' value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th>Select the date below</th>
                    </tr>
                    <tr>
                      <th>From: <input type='date' name='start' placeholder='Starting date' onChange={handleDateChange}/></th>
                      <th>To: <input type='date' name='end' placeholder='Ending date' onChange={handleDateChange}/></th>
                    </tr>
                    <tr>
                      <td><button className='small-button' type="button" onClick={calculateTotalWorkingHours}>Get Total Working hours</button></td>
                      <td><input type='text' name='wHours' defaultValue={totalWorkingHours} /></td>
                    </tr>
                    <tr>
                      <th>Rate per Hour:</th>
                      <td><input type='number' name='rate' value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}/></td>
                    </tr>
                    <tr>
                      <td><button className='small-button' type="button" onClick={calculateSalary}>Calculate salary</button></td>
                      <td><input type='text' name='salary' value={salary} readOnly /></td>
                    </tr>
                    <tr>
                      <td><button className='small-button'>Confirm</button></td>
                      <td><button className='small-button' onClick={handleCancel} >Cancel</button></td>
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
