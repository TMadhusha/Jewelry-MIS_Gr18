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
                       <table border={'1'}
                       cellPadding={'1'}
                       cellSpacing={4}>
                        
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>NIC</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Role</th>
                            <th>Image</th>
                        </tr>
                       </table>
                       <div>
                       <button className='btnemp' >Add</button>
                       <button className='btnemp' >Update</button>
                       <button className='btnemp' >Delete</button>
                       </div>
                       

                    </div>
                )}
                {showAttendanceDetails && (
                    <div className="employee-details">
                       <div>
                        <h3>Add Attendance</h3>
                        </div>
                        <div>
                                <form>
                                <table >
                                    <tr>
                                        <th>Attendance ID:</th>
                                        <td><input type='text' name='attid' value='attid'/></td>
                                    </tr>
                                    <tr>
                                        <th>Employee ID:</th>
                                        <td><input type='text' name='empid' value='empid'/></td>
                                    </tr>
                                    <tr>
                                        <th>Date:</th>
                                        <td><input type='text' name='date' value='date'/></td>
                                    </tr>
                                    <tr>
                                        <th>Check In:</th>
                                        <td><input type='text' name='checkin' value='checkin'/></td>
                                    </tr>
                                    <tr>
                                        <th>Check out:</th>
                                        <td><input type='text' name='checkout' value='checkout'/></td>
                                    </tr>
                                    <tr>
                                        <th>Status:</th>
                                        <td><input type='text' name='status' value='status'/></td>
                                    </tr>
                                    </table>
                                    <button>Add</button>
                                    <button>Cancel</button>
                                </form>
                        </div>
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