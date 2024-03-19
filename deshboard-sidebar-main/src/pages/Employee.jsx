import React, { useState } from 'react';

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