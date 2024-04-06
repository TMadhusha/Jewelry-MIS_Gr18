import React from 'react'
import EmployeeBar from '../components/EmployeeBar'
import '../css/employee.css';

export default function Attendance() {
  return (
    <div className='container'>
      <EmployeeBar>
        <div className='main-container'>
            <h2>Attendance</h2>
            <table>
              <form>
                <tr>
                  <th>Employee</th>
                </tr>
              </form>
              
            </table>
        </div>
      </EmployeeBar>
    </div>
  )
}

