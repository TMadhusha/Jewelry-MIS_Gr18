import React, { useEffect, useState } from 'react'
import Financebar from '../components/Financebar'
import axios from 'axios';

const ProfitLoss = () => {
    const [sales,setSales]=useState([]);
    const [expense,setExpense]=useState([]);
    const [purchase,setPurchase]=useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalSales,setTotalSales] = useState(0);
    const [totalCost,setTotalCost]= useState(0);
    const [profitOrLoss, setProfitOrLoss] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');  // Add state for selected month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());    // Add state for selected year

    useEffect(()=>{
      const loadSales=async()=>{
        const result=await axios.get("http://localhost:8080/salesAndRevenues",{ params: { year: selectedYear } })
        setSales(result.data);
        console.log(result.data);
      }
  
      const loadPurchase=async()=>{
        const result=await axios.get("http://localhost:8080/getPurchase",{ params: { year: selectedYear } });
        setPurchase(result.data);
        console.log(result.data);
      }
  
      const loadExpense=async()=>{
        const result=await axios.get("http://localhost:8080/getExpense",{ params: { year: selectedYear } });
        setExpense(result.data);
        console.log(result.data);
      }

      loadSales();
      loadPurchase();
      loadExpense();

    },[selectedYear]);

    const handleMonthChange = (e) => {
      setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
      setSelectedYear(parseInt(e.target.value));
  };

    const calculateTotals = () => {
      let expenseTotal = 0;
      let purchaseTotal = 0;
      let salesTotal= 0;

      // Calculate total expenses for selected month and year if applicable
      if (selectedMonth !== '') {
          expense.forEach(exp => {
              const expDate = new Date(exp.date);
              if (expDate.getMonth() === parseInt(selectedMonth) && expDate.getFullYear() === selectedYear) {
                  expenseTotal += parseFloat(exp.amount);
              }
          });
      }

      // Calculate total purchases for selected month and year if applicable
      if (selectedMonth !== '') {
          purchase.forEach(pur => {
              const purDate = new Date(pur.date);
              if (purDate.getMonth() === parseInt(selectedMonth) && purDate.getFullYear() === selectedYear) {
                  purchaseTotal += parseFloat(pur.cost);
              }
          });
      }

      //Calculate total sales for selected month and year if applicable
      if(selectedMonth !== ''){
        sales.forEach(sal => {
          const salDate = new Date(sal.date);
          if(salDate.getMonth() === parseInt(selectedMonth) && salDate.getFullYear() === selectedYear){
              salesTotal += parseFloat(sal.totalSalesAmount);
          }
        })
      }

      setTotalExpense(expenseTotal);
      setTotalPurchase(purchaseTotal);
      setTotalSales(salesTotal);
      setTotalCost(expenseTotal+purchaseTotal);
      setProfitOrLoss(salesTotal-(expenseTotal+purchaseTotal));
  };

  useEffect(() => {
    calculateTotals();
  }, [expense, purchase, sales,selectedMonth, selectedYear]);



  //   const filterByMonthAndYear = (data) => {
  //     return data.filter(item => {
  //         const date = new Date(item.date);  // Assuming the date field is in 'date' property
  //         return date.getMonth() + 1 === parseInt(month) && date.getFullYear() === parseInt(year);
  //     });
  // };
  
  // // Calculate totals with a default value of 0
  // const totalSales = filterByMonthAndYear(sales).reduce((sum, item) => sum + (item.amount || 0), 0);
  // const totalPurchases = filterByMonthAndYear(purchase).reduce((sum, item) => sum + (item.amount || 0), 0);
  // const totalExpenses = filterByMonthAndYear(expense).reduce((sum, item) => sum + (item.amount || 0), 0);
  
  // // Calculate profit or loss
  // const profitOrLoss = totalSales - (totalPurchases + totalExpenses);
  
    
  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
              <div className='main-title'>
                <h1>Profit or Loss</h1>
              </div>
              <div style={{marginLeft:"500px"}}>                
                  <div>
                    <label>Select Year:</label>
                    <select id="year" value={selectedYear} onChange={handleYearChange}>
                            {[...Array(10).keys()].map(i => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                  </div>
                  <div>
                      <label>Select Month:</label>
                      <select onChange={handleMonthChange} value={selectedMonth}>
                          <option value=''>Select a month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={i}>
                                {new Date(0, i).toLocaleString('en', { month: 'long' })}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div>
                    <h3>Total Sales: ${totalSales.toFixed(2)}</h3>
                    <br/>
                    <h3>Total Cost: </h3>
                    <h3>Total Purchases: ${totalPurchase.toFixed(2)}</h3>
                    <h3>Total Expenses: ${totalExpense.toFixed(2)}</h3>
                    <h3>Total Expenditures: ${totalCost.toFixed(2)}</h3>
                    <br/>
                    <h3>Profit/Loss: ${profitOrLoss.toFixed(2)}</h3>
                  </div>
                
              </div>
            </div>
        </Financebar>
    </div>
  )
}
export default ProfitLoss
