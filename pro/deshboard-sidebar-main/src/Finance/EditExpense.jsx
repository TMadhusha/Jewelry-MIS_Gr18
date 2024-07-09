import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Financebar from '../components/Financebar';

export default function EditExpense() {
    let navigate=useNavigate();

    const {expenseId} =useParams();
    console.log('Expense ID:', expenseId);

    const [expense,setExpense]=useState({
        date:"",
        description:"",
        type:"",
        amount:"",
        receipt:null,
        receiptPreview: null, // For previewing the selected image
        existingReceipt: null 
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    const {date,description,type,amount,receiptPreview, existingReceipt  }=expense;

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

      const loadExpenses = async() =>{
        try {
            const result = await axios.get(`http://localhost:8080/getExpenseById/${expenseId}`);
            setExpense({
                ...result.data,
                existingReceipt: result.data.receipt // Store the existing receipt image
            });
        } catch (error) {
            window.alert("Error loading expenses");
            console.log("Error loading expense", error);
        }
    }

    useEffect(()=>{
        loadExpenses();
    },[]);

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
    
        if (!String(amount).trim()) {
            window.alert("Amount is required");
            isValid = false;
        }

    
        setErrors(errors);
        return isValid;
      };

      const onSubmit= async(e) =>{
        e.preventDefault();
    
        if(validateForm()){
            try{
                const formData=new FormData();
                formData.append("type", expense.type);
                formData.append("description", expense.description);
                formData.append('amount', parseFloat(expense.amount));
                if (expense.receipt) {
                    formData.append('receipt', expense.receipt);
                }
                // formData.append("receipt", new Blob([new Uint8Array(receipt)], { type: "receipt/jpeg" }));
                
                await axios.put(`http://localhost:8080/updateExpenseById/${expenseId}`,formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                      }
                });
                window.alert("Expense updated");
                navigate("/viewExpense");
            }catch (error) {
                console.error("Error editing expense:", error);
                window.alert("Failed to edit expense. Please try again.");
              }
        }
    
      }

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>Edit Expense</h2>
                </div>
                <div className='margin'>
                    <form className='form' onSubmit={(e) => onSubmit(e)}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <td><input type='date' name='date' value={date} onChange={(e) => onChangeInput(e)} readOnly/></td>
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
                                    {/* <td><img src={`data:image/jpeg;base64,${expense.receipt}`} alt="No Receipt" style={{height:"75px", width:"75px"}} /></td> */}
                                    <td>
                                            {receiptPreview ? (
                                                <img src={receiptPreview} alt="Receipt Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            ) : existingReceipt ? (
                                                <img src={`data:image/jpeg;base64,${existingReceipt}`} alt="Existing Receipt" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                            ) : (
                                                <span>No Receipt</span>
                                            )}
                                    </td>
                                    <td><input type='file' name='receipt' onChange={(e) => onChangeInput(e)}/></td>
                                </tr>
                                <tr className='buton-container'>
                                    <td><button className='btn' type='submit'> Edit</button></td>
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
