import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeBar from '../components/EmployeeBar';
import '../css/employee.css'; 
import Employee from '../pages/Employee';

export default function AddEmp() {
  let navigate = useNavigate();

  const [employees, setEmployees] = useState({
    emp_id:"",
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    nic: "",
    email: "",
    phoneNo: "",
    role: ""
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const { emp_id,firstname, lastname, dob, address, nic, email, phoneNo, role } = employees;

  // Function to fetch the last att_id from the backend and increment it
  const fetchLastEmpId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/employees");
      const lastEmp = result.data[result.data.length - 1];
      const lastEmpId = lastEmp ? parseInt(lastEmp.emp_id.slice(3)) : 0; // Extract the number part and convert to integer
      const newEmpId = `emp${String(lastEmpId + 1).padStart(3, '0')}`; // Increment the number part and format it
      setEmployees(prevEmployee => ({
        ...prevEmployee,
        emp_id: newEmpId
      }));
    } catch (error) {
      console.error("Error fetching last employee id:", error);
    }
  };


  useEffect(() => {
    fetchLastEmpId(); // Fetch the last attendance id when the component mounts
  }, []);

  const onChangeInput = (e) => {
    setEmployees({ ...employees, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Basic validation for each field
    //Validation for emp_id
    if(!emp_id.trim()){
      window.alert("Employee Id is required");
      isValid=false;
    }
    //Validation for first name
    if (!firstname.trim()) {
      window.alert("First name is required");
      isValid = false;
    }
    //Validation for last name
    if (!lastname.trim()) {
      window.alert("Last name is required");
      isValid = false;
    }
    //Validation for dob
    if (!dob.trim()) {
      window.alert("DOB is required");
      return false;
    } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(dob)) {
      window.alert("DOB should be in the format 'yyyy-mm-dd'");
      return false;
    }

    //Validation for address
    if (!address.trim()) {
      window.alert("Address is required");
      isValid = false;
    }

    //Validation for nic
    if (!nic.trim()) {
      window.alert("NIC is required");
      isValid = false;
    }else if (!/^\d{9}[VX]|^\d{12}$/.test(nic)) {
      window.alert("NIC should be either 9 digits followed by 'V' or 'X' or 12 digits");
      isValid = false;
    }

    //Validation for email
    if (!email.trim()) {
      window.alert("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert("Email is invalid");
      isValid = false;
    }

    // Validation for phone number
    if (!phoneNo.trim()) {
      window.alert("Phone number is required");
      isValid = false;
    } else if (isNaN(phoneNo)) {
      window.alert("Text cannot be accepted. Please enter only numeric values for the phone number.");
      isValid = false;
    } else if (phoneNo.length !== 10) {
      window.alert("Phone number must contain 10 digits");
      isValid = false;
    }

    //Validation for role
    if (!role.trim()) {
      window.alert("Role is required");
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/employee", employees);
        window.alert("Employee added succesfully...!");
        navigate("/employee");
      } catch (error) {
        console.error("Error adding employee:", error);
        window.alert("Failed to add employee. Please try again.");
      }
    }
  };

  return (
    <div className='container'> 
    <EmployeeBar>
    <div className='main-container'>
        <h2>Register Employee</h2>
        <br/>
        <div>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <table>
              <tr>
                <th><label>Employee ID: </label></th>
                <td>
                  <input type={'text'} name='emp_id' placeholder={'Employee ID'} value={emp_id} onChange={(e) => onChangeInput(e)} disabled/>
                  {errors.emp_id && <span className="error">{errors.emp_id}</span>}
                </td>
              </tr>
              <tr>
                <th><label>First name: </label></th>
                <td>
                  <input type={'text'} name="firstname" placeholder={'First name'} value={firstname} onChange={(e) => onChangeInput(e)} />
                  {errors.firstname && <span className="error">{errors.firstname}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Last name: </label></th>
                <td>
                  <input type={'text'} name="lastname" placeholder={'Last name'} value={lastname} onChange={(e) => onChangeInput(e)} />
                  {errors.lastname && <span className="error">{errors.lastname}</span>}
                </td>
              </tr>
              <tr>
                <th><label>DOB: </label></th>
                <td>
                  <input type={'date'} name="dob" value={dob} onChange={(e) => onChangeInput(e)} />
                  {errors.dob && <span className="error">{errors.dob}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Address: </label></th>
                <td>
                  <input type={'text'} name="address" placeholder={'Address'} value={address} onChange={(e) => onChangeInput(e)} />
                  {errors.address && <span className="error">{errors.address}</span>}
                </td>
              </tr>
              <tr>
                <th><label>NIC: </label></th>
                <td>
                  <input type={'text'} name="nic" placeholder={'NIC'} value={nic} onChange={(e) => onChangeInput(e)} />
                  {errors.nic && <span className="error">{errors.nic}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Email: </label></th>
                <td>
                  <input type={'text'} name="email" placeholder={'Email'} value={email} onChange={(e) => onChangeInput(e)} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Phone No: </label></th>
                <td>
                  <input type={'text'} name="phoneNo" placeholder={'Phone No'} value={phoneNo} onChange={(e) => onChangeInput(e)} />
                  {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
                </td>
              </tr>
              <tr>
                <th><label>Role: </label></th>
                <td>
                  <select name="role" placeholder={'Role'} value={role} onChange={(e) => onChangeInput(e)} className='select' >
                    <option value={'None'}>None</option>
                    <option value={'Admin'}>Admin</option>
                    <option value={'Owner'}>Designer</option>
                    <option value={'Cashier'}>Cashier</option>
                    <option value={'Manager'}>Manager</option>
                    <option value={'Stock keeper'}>Stock keeper</option>
                  </select>
                  {errors.role && <span className="error">{errors.role}</span>}
                </td>
              </tr>
              <tr className='button-container'>
                <td ><button className='btn' type="submit">Add</button></td>
                <td><Link className='btn' to={"/employee"}>Cancel</Link></td>
              </tr>
            </table>
          </form>
        </div>
    </div>
    </EmployeeBar>
    </div>
  );
}