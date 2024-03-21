import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = () => setState(!state);
    return [state, toggle];
};

const Employee = () => {
    const [showEmployeeDetails, toggleEmployeeDetails] = useToggle();
    const [showAttendanceDetails, toggleAttendanceDetails] = useToggle();
    const [showSalaryDetails, toggleSalaryDetails] = useToggle();

    // const toggleEmployeeDetails = () => {
    //     setShowEmployeeDetails(!showEmployeeDetails);
    // };

    const [employees,setEmployees]=useState([])
  useEffect(()=>{
    loadEmp();

  },[])

  const loadEmp=async()=>{
    const result=await axios.get("http://localhost:8080/employees");
    setEmployees(result.data);

  }
    return (
        <div>
            <div className='main-container backemp'>
                <div className='main-title'>
                    <h1>Employee Management</h1>
                </div>

                <div className='btn-container'>
                <button className='btnemp' onClick={toggleEmployeeDetails}>Employee</button>
                <button className='btnemp' onClick={toggleAttendanceDetails}>Attendance</button>
                <button className='btnemp' onClick={toggleSalaryDetails}>Salary</button>
                </div>
            </div>
            <div className='content-container'>
                {showEmployeeDetails && (
                    <div className="employee-details">
                       <h3>Employee details</h3>
                       <div className='table-container'>
                       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">DOB</th>
      <th scope="col">Address</th>
      <th scope="col">NIC</th>
      <th scope="col">email</th>
      <th scope="col">Phone No</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    {
      employees.map((employee,index)=>(
        <tr>
      <th scope="row" key={index}>{index+1}</th>
      <td>{employee.firstname}</td>
      <td>{employee.lastname}</td>
      <td>{employee.dob}</td>
      <td>{employee.address}</td>
      <td>{employee.nic}</td>
      <td>{employee.email}</td>
      <td>{employee.phoneNo}</td>
      <td>{employee.role}</td>
    </tr>
      ))
    }
    
  </tbody>
</table>
</div>
        <div className='button-container'>
        <Link className='btn' to={"/addemp"}>Add</Link>
        <Link className='btn' to={"/editeemp"}>Update</Link>
        <Link className='btn' to={"/deleteemp"}>Delete</Link>
        </div>
                      

                    </div>
                    

                )}
                {showAttendanceDetails && (
                    <div className="employee-details">
                       <h3>Attandance details</h3>
                    </div>
                )}
                {showSalaryDetails && (
                    <div className="employee-details">
                       <h3>Salary details</h3>
                    </div>
                )}
            </div>
        </div>     
    );
};

export default Employee;