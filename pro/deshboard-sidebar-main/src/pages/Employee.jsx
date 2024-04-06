import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';


const Employee = () => {
    const [employees,setEmployees]=useState([]);

    const {id}=useParams()

  useEffect(()=>{
    loadEmp();

  },[])

  const loadEmp=async()=>{
    const result=await axios.get("http://localhost:8080/employees");
    setEmployees(result.data);
  }

  const deleteEmployee=async (id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if(confirmDelete){
      try{
        await axios.delete(`http://localhost:8080/employee/${id}`)
        loadEmp();
      }catch(error){
        window.alert("The employee cannot be deleted...!")
      }
    }  
  }
  
    return (
        <div className='container'>
          <EmployeeBar>       
          <div className='main-container'>
            <div className='main-title'>
                <h1>Employee Management</h1>
            </div>
            <div>
              <h3>Employee details</h3>
                <div className='table-container'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Address</th>
                        <th scope="col">NIC</th>
                        <th scope="col">email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col" style={{ width: '120px'}}>Role</th>
                        <th scope="col" >UpdateEmp</th>
                        <th scope="col" style={{ width: '150px'}}>DeleteEmp</th>
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
                          <td><Link className='small-button' to={`/editemp/${employee.empId}`}>Update</Link></td>
                          <td><button className='small-button' onClick={()=>deleteEmployee(employee.empId)}>Delete</button></td>
                        </tr> 
                        ))
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div> 
          </EmployeeBar>               
        </div>   
    );
};

export default Employee;