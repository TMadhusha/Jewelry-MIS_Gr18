import React, { useState } from 'react'
import Financebar from '../components/Financebar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNewExpense() {
    let navigate=useNavigate(); 

    //Get the current date
  const getCurrentDate = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month= String(date.getMonth() + 1).padStart(2, '0');
    const day= String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [expense,setExpense]=useState({
    date:getCurrentDate(),
    type:"",
    description:"",
    amount:"",
    receipt:null,
    receiptPreview: null
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors
  const {date,type,description,amount,receipt,receiptPreview}=expense;

  const onChangeInput = (e) => {
    if (e.target.name === "receipt") {
        const file = e.target.files[0];
        setExpense({
            ...expense,
            receipt: file,
            receiptPreview: URL.createObjectURL(file), // Create a URL for the image preview
        });
    } else {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validation for date
    if (!expense.date.trim()) {
      window.alert("Date is required");
      return false;
    } else if (!/^\d{4}\-\d{2}\-\d{2}$/.test(expense.date)) {
      window.alert("Date should be in the format 'yyyy/mm/dd'");
      return false;
    }

    if(!type.trim()){
        window.alert("Type is required")
        isValid=false;
    }

    if(!description.trim()){
        window.alert("Description is required");
        isValid=false
    }

    if(!amount.trim()){
        window.alert("Amount is required");
        isValid=false;
    }

    setErrors(errors);
    return isValid;
  }

  const onSubmit= async(e) =>{
    e.preventDefault();

    if(validateForm()){
        try{
            const formData=new FormData();
            formData.append("date", date);
            formData.append("type", type);
            formData.append("description", description);
            formData.append("amount", amount);
            formData.append("receipt", receipt);
            // formData.append("receipt", new Blob([new Uint8Array(receipt)], { type: "receipt/jpeg" }));
            
            await axios.post("http://localhost:8080/addExpense",formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
            });
            window.alert("Expense added");
            navigate("/viewExpense");
        }catch (error) {
            console.error("Error adding expense:", error);
            window.alert("Failed to add expense. Please try again.");
          }
    }

  }

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <h2>New Expense</h2>
                <br/>
                <div className='margin'>
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <td><input type='date' name='date' value={date} onChange={(e) => onChangeInput(e)}/></td>
                                    {errors.date && <span className="error">{errors.date}</span>}
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>
                                        <select className='select' name='type' value={type} onChange={(e) => onChangeInput(e)}>
                                            <option value={"None"}>None</option>
                                            <option value={"Bill payment"}>Bill payment</option>
                                            <option value={"Office use"}>Office Use</option>
                                            <option value={"Own expenditure"}>Own expenditure</option>
                                            <option value={"Employee payment"}>Employee payment</option>
                                        </select>
                                    </td>
                                    {errors.type && <span className="error">{errors.type}</span>}
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td><input type='text' name='description' value={description} placeholder='Description' onChange={(e) => onChangeInput(e)}/></td>
                                    {errors.description && <span className="error">{errors.description}</span>}
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td><input type='text' name='amount' value={amount} placeholder='Amount' onChange={(e) => onChangeInput(e)}/></td>
                                    {errors.amount && <span className="error">{errors.amount}</span>}
                                </tr>
                                <tr>
                                    <td>
                                            {receiptPreview ? (
                                                <img src={receiptPreview} alt="Receipt Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            ) : (
                                                <span>No Receipt</span>
                                            )}
                                    </td>
                                    <td><input type='file' name='receipt' onChange={(e) => onChangeInput(e)}/></td>
                                </tr>
                                <tr className='button-container'>
                                    <td><button className='btn' type='submit'> Add</button></td>
                                    <td><Link className='btn' to={"/viewExpense"}>Cancel</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </Financebar>
    </div>
  )
}
