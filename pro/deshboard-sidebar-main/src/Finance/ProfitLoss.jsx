import React, { useState } from 'react'
import Financebar from '../components/Financebar'

const ProfitLoss = () => {
    const [sales,setSales]=useState([]);
    const [expense,setExpense]=useState([]);
    const [purchase,setPurchase]=useState([]);
    
  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <h2>Profit or Loss</h2>
            </div>
        </Financebar>
    </div>
  )
}
export default ProfitLoss
