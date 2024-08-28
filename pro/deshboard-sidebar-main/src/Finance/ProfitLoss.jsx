import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar'
import axios from 'axios';

const ProfitLoss = () => {
    const [sales,setSales]=useState([]);
    const [expense,setExpense]=useState([]);
    const [purchase,setPurchase]=useState([]);
    const [month, setMonth] = useState('');  // Add state for selected month
    const [year, setYear] = useState('');    // Add state for selected year

    const loadSales=async()=>{
      const result=await axios.get("http://localhost:8080/salesAndRevenues")
      setSales(result.data);
      console.log(result.data);
    }

    const loadPurchase=async()=>{
      const result=await axios.get("http://localhost:8080/getPurchase");
      setPurchase(result.data);
      console.log(result.data);
    }

    const loadExpense=async()=>{
      const result=await axios.get("http://localhost:8080/getExpense");
      setExpense(result.data);
      console.log(result.data);
    }

    useEffect(()=>{
      loadSales();
      loadPurchase();
      loadExpense();
    },[])

    const filterByMonthAndYear = (data) => {
      return data.filter(item => {
          const date = new Date(item.date);  // Assuming the date field is in 'date' property
          return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
      });
  };
  
  // Calculate totals with a default value of 0
  const totalSales = filterByMonthAndYear(sales).reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalPurchases = filterByMonthAndYear(purchase).reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalExpenses = filterByMonthAndYear(expense).reduce((sum, item) => sum + (item.amount || 0), 0);
  
  // Calculate profit or loss
  const profitOrLoss = totalSales - (totalPurchases + totalExpenses);
  


    
  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <h2>Profit or Loss</h2>
            </div>
            <div className='container'>
              <div>
                <div>
                  <label>Select Year:</label>
                  <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
                </div>
                <div>
                    <label>Select Month:</label>
                    <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month (1-12)" />
                </div>
                <div>
                  <h3>Total Sales: ${totalSales.toFixed(2)}</h3>
                  <h3>Total Purchases: ${totalPurchases.toFixed(2)}</h3>
                  <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
                  <h3>Profit/Loss: ${profitOrLoss.toFixed(2)}</h3>
                </div>
              </div>
              <div>
                <h2>Graph View</h2>
              </div>
            </div>
        </Financebar>
    </div>
  )
}
export default ProfitLoss
