import React, { useEffect, useState } from 'react';
import EmployeeBar from '../components/EmployeeBar';
import axios from 'axios';
import jsPDF from 'jspdf';



export default function Salary() {
  //creating const
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendance,setAttendance] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalWorkingHours, setTotalWorkingHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [totalAmount, setSalary] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});


  //loading employee id and role to the salary page
  const loadEmp = async () => {
    try {
      const result = await axios.get("http://localhost:8080/employees");
      setEmployees(result.data);
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  //loading attendance details  
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


  //load empId and role automatically to the form from employee table
  const handleSalaryClick = (emp_id,role) => {
    // Set the selected employee ID when the salary button is clicked
    setSelectedEmployeeId(emp_id);
    setRole(role);

  }

  // Filter attendance data for the selected employee and date range
  // const calculateTotalWorkingHours = () => {
  //   const filteredAttendance = attendance.filter(record => (
  //     record.empId === selectedEmployeeId &&
  //     new Date(record.date) >= new Date(startDate) &&
  //     new Date(record.date) <= new Date(endDate)
  //   ));

  //    // Debugging logs
  // console.log('Selected Employee ID:', selectedEmployeeId);
  // console.log('Start Date:', startDate);
  // console.log('End Date:', endDate);
  // console.log('Filtered Attendance:', filteredAttendance);

  //       // Calculate total working hours
  //       let totalHours = 0;
  //       filteredAttendance.forEach(record => {
  //         totalHours += parseFloat(record.workingHours);
  //       });
    
  //       // Set the total working hours state
  //       setTotalWorkingHours(totalHours.toFixed(2));
  //     }


  const calculateTotalWorkingHours = () => {
    if (!startDate || !endDate) {
      window.alert("Please select both start date and end date.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

    if (diffInDays < 30 || diffInDays > 31) {
      window.alert("The date range must be 30 or 31 days.");
      return;
    }

    const filteredAttendance = attendance.filter(record => (
      record.empId === selectedEmployeeId &&
      new Date(record.date) >= start &&
      new Date(record.date) <= end
    ));

    let totalHours = 0;
    filteredAttendance.forEach(record => {
      totalHours += parseFloat(record.workingHours);
    });

    setTotalWorkingHours(totalHours.toFixed(2));
  }


      // const handleDateChange = (e) => {
      //   if (e.target.name === 'start') {
      //     setStartDate(e.target.value);
      //   } else if (e.target.name === 'end') {
      //     setEndDate(e.target.value);
      //   }
      // }

      const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start') {
          setStartDate(value);
        } else if (name === 'end') {
          if (new Date(value) > new Date()) {
            window.alert("End date cannot be in the future.");
          } else {
            setEndDate(value);
          }
        }
      }

      //salary  calculation
      const calculateSalary = () => {
        const totalAmount = parseFloat(totalWorkingHours) * parseFloat(hourlyRate);
        setSalary(totalAmount.toFixed(2));
      }

      //save salary to the salary table
      const handleConfirm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          try {
            await axios.post("http://localhost:8080/salaryP", {
              empId: selectedEmployeeId,
              role: role,
              startDate: startDate,
              endDate: endDate,
              totalWorkingHours: totalWorkingHours,
              hourlyRate: hourlyRate,
              totalAmount: totalAmount
            });
            window.alert("Salary saved..!");
            // resetForm();
          } catch (error) {
            console.error("Error saving salary:", error);
            window.alert("Error saving salary");
          }
        }
      }

      // Reset all state values to initial empty values
      const handleCancel = () => {
        setSelectedEmployeeId('');
        setRole('');
        setStartDate('');
        setEndDate('');
        setTotalWorkingHours('');
        setHourlyRate('');
        setSalary('');
      }

      // validation
      const validateForm = () => {
        let isValid = true;
      
        if (!selectedEmployeeId ) {
          window.alert("Employee ID is required");
          isValid = false;
        }
      
        if (!role) {
          window.alert("Role is required");
          isValid = false;
        }
      
        if (!startDate) {
          window.alert("Start date is required");
          isValid = false;
        }
      
        if (!endDate) {
          window.alert("End date is required");
          isValid = false;
        }
      
        if (!totalWorkingHours) {
          window.alert("Total working hours is required");
          isValid = false;
        }
      
        if (!hourlyRate) {
          window.alert("Hourly rate is required");
          isValid = false;
        }
      
        return isValid;
      }
      
      const generatePDFReport = () => {
        // Check if any required field is empty
  if (!selectedEmployeeId || !role || !startDate || !endDate || !totalWorkingHours || !hourlyRate || !totalAmount) {
    window.alert("Fields are empty");
    return; // Prevent generating the PDF report
  }
        const pdf = new jsPDF();
      
        // Set font sizes
        pdf.setFontSize(24);
        pdf.setFontSize(14);
      
        // Set background color for the heading
        pdf.setFillColor(4, 33, 68); // Set your desired background color
        pdf.rect(0, 0, 210, 30, 'F'); // Draw a filled rectangle as the background
      
        // Add title and heading with white color
        pdf.setTextColor(255);// Set text color to white
        pdf.setFont("Monotype Corsiva");
        pdf.text("Italy Silver Choice", 10, 15);
        pdf.text("Salary Report", 10, 25);
        
      
        // Reset text color to black for the rest of the content
        pdf.setTextColor(0);
      
        // Add employee details
        pdf.text(`Employee ID: ${selectedEmployeeId}`, 10, 40);
        pdf.text(`Role: ${role}`, 10, 50);
        pdf.text(`Start Date: ${startDate}`, 10, 60);
        pdf.text(`End Date: ${endDate}`, 10, 70);
        pdf.text(`Total Working Hours: ${totalWorkingHours}`, 10, 80);
        pdf.text(`Hourly Rate: ${hourlyRate}`, 10, 90);
        pdf.text(`Total Amount: ${totalAmount}`, 10, 100);
        pdf.text("---------------------------------------------------------------------------------------------------------------",10,110);
      
        // Add signature line
        pdf.text("Signature of the employee: ___________________", 10, 120);
        pdf.text("Date Signature of the shop: ___________________", 10, 135);
      
        // Add logo
        const logo = new Image();
        logo.src = '/logo1_small.png'; // Replace 'path_to_your_logo/logo.png' with the actual path to your logo
        pdf.addImage(logo, 'PNG', 150, 2, 40, 26); // Adjust the position and size as needed
      
        pdf.save('salary_report.pdf');
      }

  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
          <div className='main-title'>
            <h2>Salary management</h2>
          </div>
          <div className='container' >
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
                          <button className='small-button' onClick={() => handleSalaryClick(employee.emp_id, employee.role)}>Get</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className='margin'>
              <form className='form' onSubmit={(e) => e.preventDefault()} id="report-content">
                <table>
                  <tbody>
                    <tr>
                      <th>Employee ID:</th>
                      <td><input type='text' name='emp_id' value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th>Role:</th>
                      <td><input type='text' name='role' value={role} onChange={(e) => setRole(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th colSpan="2" style={{ textAlign: 'center' }}>Select the date below</th>
                    </tr>
                    <tr>
                      <th>From: <input type='date' name='start' value={startDate} placeholder='Starting date' onChange={handleDateChange}/></th>
                      <th>To: <input type='date' name='end' value={endDate} placeholder='Ending date' onChange={handleDateChange}/></th>
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
                      <td><input type='text' name='totalAmount' value={totalAmount} readOnly /></td>
                    </tr>
                    <tr>
                      <td><button className='small-button' type="submit" onClick={handleConfirm}>Confirm</button></td>
                      <td><button className='small-button' onClick={handleCancel} >Cancel</button></td>
                    </tr>
                  </tbody>
                </table>
                <div>
                <button className='reportbtn' onClick={generatePDFReport}>Generate Report</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </EmployeeBar>
    </div>
  )
}
