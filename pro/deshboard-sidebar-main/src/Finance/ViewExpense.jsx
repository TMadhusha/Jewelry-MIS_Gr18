import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewExpense() {
    const [expense,setExpense]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const loadExpenses = async() =>{
        try{
            const result=await axios.get("http://localhost:8080/getExpense");
            setExpense(result.data);
        }catch (error){
            window.alert("Error loading expenses");
            console.log("Error loading expense", error)
        }
       
    }

    const deleteExpense=async (expenseId)=>{
        const confirmDelete = window.confirm("Do you want to delete this expense?");
        if(confirmDelete){
          try{
            await axios.delete(`http://localhost:8080/deleteExpense/${expenseId}`)
            loadExpenses();
          }catch(error){
            window.alert("The expense cannot be deleted...!")
          }
        }  
      }

    const handleSearchInputChange=(e)=>{
        setSearchQuery(e.target.value);
    }

    const filteredExpenses = expense.filter(expense => {
        return (
          expense &&
          (expense.date?.toLowerCase().includes(searchQuery.toLowerCase())||
           expense.type?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        );
      });
    
      if (searchQuery.trim() !== '' && filteredExpenses.length === 0) {
        alert("No search results found");
      }

    useEffect(()=>{
        loadExpenses();
    },[]);

  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h1>Expenses</h1>
                </div>
                <div className='container'>
                    <div style={{marginRight:"450px",marginTop:"10px"}}>
                        <Link className='btn' to={"/addNewExpense"}>Add New Expense</Link>
                    </div>
                    <div className='searchAdd-container section'>
                        <div className='search-bar-container'>
                            <FaSearch className='search-icon' />
                            <input type='text' placeholder='Search here...' className='search-input' value={searchQuery} onChange={handleSearchInputChange}/>
                        </div>
                    </div>
                </div>
                <div className='table-container'>
                    <table class='table'>
                        <thead className='tb-head'>
                            <tr>
                                <th scope="col">Expense ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Type</th>
                                <th scope="col">Description</th>
                                <th scope='col'>Amount</th>
                                <th scope="col">Receipt</th>
                                <th scope='col' colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody className='tb-body'>
                        { 
                                filteredExpenses.map((expense,index)=>(
                                    <tr key={index} className='tb-tr'>
                                        <td>{expense.expenseId}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.type}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.amount}</td>
                                        <td><img src={`data:image/jpeg;base64,${expense.receipt}`} alt="No Receipt" style={{height:"75px", width:"75px"}} /></td>
                                        <td><Link className='small-button'to={`/editExpense/${expense.expenseId}`}>Edit</Link></td>
                                        <td><button className='small-button' onClick={()=>deleteExpense(expense.expenseId)}>Delete</button></td>  
                                    </tr>
                                ))
                             }
                        </tbody>
                    </table>
                </div>
            </div>
        </Financebar>
        
    </div>
  )
}
