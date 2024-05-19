import React from 'react'
import Financebar from '../components/Financebar';

export default function NewTransaction() {
  return (
    <div className='container'>
        <Financebar>
            <div className='main-container'>
                <div className='main-title'>
                    <h2>New Transaction</h2>
                </div>
            </div>
        </Financebar>
    </div>
  )
}
