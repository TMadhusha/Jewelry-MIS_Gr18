import React, { useState } from 'react'
import Financebar from '../components/Financebar'

const ProfitLoss = () => {
    const [sales,setSales]=useState([]);
    
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
