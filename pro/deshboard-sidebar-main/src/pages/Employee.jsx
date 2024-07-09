import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';
import { FaSearch } from "react-icons/fa";
import "../css/employee.css";

const Employee = () => {
    const [employees,setEmployees]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const {emp_id}=useParams()

  useEffect(()=>{
    loadEmp();

  },[])

  const loadEmp=async()=>{
    const result=await axios.get("http://localhost:8080/employees");
    console.log(result.data);
    setEmployees(result.data);
  }

  const deleteEmployee=async (emp_id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if(confirmDelete){
      try{
        await axios.delete(`http://localhost:8080/employee/${emp_id}`)
        loadEmp();
      }catch(error){
        window.alert("The employee cannot be deleted...!")
      }
    }  
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const filteredEmployees = employees.filter(employee =>
    employee.emp_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.lastname.toLowerCase().includes(searchQuery).toLowerCase()
  );

  if (searchQuery.trim() !== '' && filteredEmployees.length === 0) {
    alert("No search results found");
  }
  
    return (
        <div className='container'>
          <EmployeeBar>       
          <div className='main-container'>
            <div className='main-title'>
                <h2>Employee Details</h2>
            </div>
            <div className='search-bar-container'>
              <FaSearch className='search-icon' />
              <input type={'text'}  placeholder={"Search here..."} className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
            </div>
            <div>
                <div className='table-container'>
                  <table className="table">
                    <thead className='tb-head'>
                      <tr>
                        <th scope="col">Emp_Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Address</th>
                        <th scope="col">NIC</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col" >Role</th>
                        <th scope="col" colSpan={'2'} >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredEmployees.map((employee,index)=>(
                        <tr key={index} className='tb-tr'>
                          <td>{employee.emp_id}</td>
                          <td><img src={`data:image/jpeg;base64,${employee.image}`} alt="Employee" style={{height:"75px", width:"75px"}} /></td>
                          <td>{employee.firstname}</td>
                          <td>{employee.lastname}</td>
                          <td>{employee.dob}</td>
                          <td>{employee.address}</td>
                          <td>{employee.nic}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phoneNo}</td>
                          <td>{employee.role}</td>
                          <td><Link className='small-button' to={`/editemp/${employee.emp_id}`}>Update</Link></td>
                          <td><button className='small-button' onClick={()=>deleteEmployee(employee.emp_id)}>Delete</button></td>
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