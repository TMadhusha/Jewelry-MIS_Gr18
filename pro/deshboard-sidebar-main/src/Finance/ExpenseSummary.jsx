import React, { useEffect, useState } from 'react';
import Financebar from '../components/Financebar';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ExpenseSummary = () => {
    const [expense, setExpense] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [selectedExpenseMonth, setSelectedExpenseMonth] = useState('');
    const [selectedPurchaseMonth, setSelectedPurchaseMonth] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const resultE = await axios.get('http://localhost:8080/getExpense', { params: { year: selectedYear } });
                setExpense(resultE.data);
            } catch (error) {
                console.log('Error loading expenses', error);
                setExpense([]); // Set expense to empty array on error or no data
            }
        };
    
        const loadPurchases = async () => {
            try {
                const resultP = await axios.get('http://localhost:8080/getPurchase', { params: { year: selectedYear } });
                setPurchase(resultP.data);
            } catch (error) {
                console.log('Error loading purchases', error);
                setPurchase([]); // Set purchase to empty array on error or no data
            }
        };
    
        loadExpenses();
        loadPurchases();
    }, [selectedYear]);
    

    useEffect(() => {
        calculateTotals();
    }, [expense, purchase, selectedExpenseMonth, selectedPurchaseMonth, selectedYear]);

    const handleExpenseMonthChange = (e) => {
        setSelectedExpenseMonth(e.target.value);
    };

    const handlePurchaseMonthChange = (e) => {
        setSelectedPurchaseMonth(e.target.value);
    };

    const calculateTotals = () => {
        let expenseTotal = 0;
        let purchaseTotal = 0;

        // Calculate total expenses for selected month and year if applicable
        if (selectedExpenseMonth !== '') {
            expense.forEach(exp => {
                const expDate = new Date(exp.date);
                if (expDate.getMonth() === parseInt(selectedExpenseMonth) && expDate.getFullYear() === selectedYear) {
                    expenseTotal += parseFloat(exp.amount);
                }
            });
        }

        // Calculate total purchases for selected month and year if applicable
        if (selectedPurchaseMonth !== '') {
            purchase.forEach(pur => {
                const purDate = new Date(pur.date);
                if (purDate.getMonth() === parseInt(selectedPurchaseMonth) && purDate.getFullYear() === selectedYear) {
                    purchaseTotal += parseFloat(pur.cost);
                }
            });
        }

        setTotalExpense(expenseTotal);
        setTotalPurchase(purchaseTotal);
        setTotalCost(expenseTotal + purchaseTotal);
    };

    const generateReport = () => {
        // Check if any required field is empty
        if (!selectedExpenseMonth || !selectedPurchaseMonth) {
            window.alert('Please select both expense and purchase months');
            return; // Prevent generating the PDF report
        }

        const doc = new jsPDF();

        doc.setFillColor(4, 33, 68); // Set your desired background color
        doc.rect(0, 0, 210, 30, 'F'); // Draw a filled rectangle as the background

        // Add title and heading with white color
        doc.setTextColor(255);
        doc.setFontSize(20);
        doc.setFont('Monotype Corsiva');
        doc.text('Italy Silver Choice', 10, 15);

        doc.setFontSize(16);
        doc.text('Expense Summary Report', 10, 22);

        // Add logo
        const logo = new Image();
        logo.src = '/logo1_small.png'; // Replace 'path_to_your_logo/logo.png' with the actual path to your logo
        doc.addImage(logo, 'PNG', 150, 2, 38, 26);

        // Reset text color for the body
        doc.setTextColor(0);

        doc.setFontSize(12);
        doc.text(
            `Selected Month for Expenses: ${selectedExpenseMonth !== '' ? new Date(0, selectedExpenseMonth).toLocaleString('en', { month: 'long' }) : 'Not Selected'}`,
            14,
            40
        );

        if (selectedExpenseMonth !== '') {
            const expenseData = expense
                .filter(exp => {
                    const expDate = new Date(exp.date);
                    return expDate.getMonth() === parseInt(selectedExpenseMonth) && expDate.getFullYear() === selectedYear;
                })
                .map(exp => [exp.date, exp.amount, exp.description]);

            doc.autoTable({
                head: [['Date', 'Amount', 'Description']],
                body: expenseData,
                startY: 45,
                theme: 'grid',
            });
        }

        let finalY = doc.autoTable.previous.finalY || 45;

        doc.text(
            `Selected Month for Purchases: ${selectedPurchaseMonth !== '' ? new Date(0, selectedPurchaseMonth).toLocaleString('en', { month: 'long' }) : 'Not Selected'}`,
            14,
            finalY + 10
        );

        if (selectedPurchaseMonth !== '') {
            const purchaseData = purchase
                .filter(pur => {
                    const purDate = new Date(pur.date);
                    return purDate.getMonth() === parseInt(selectedPurchaseMonth) && purDate.getFullYear() === selectedYear;
                })
                .map(pur => [pur.date, pur.cost, pur.inventory.item_id, pur.supplier.sup_id]);

            doc.autoTable({
                head: [['Date', 'Cost', 'Item', 'Supplier']],
                body: purchaseData,
                startY: finalY + 15,
                theme: 'grid',
            });
        }

        finalY = doc.autoTable.previous.finalY || finalY + 15;

        doc.text(`Total Expense: Rs. ${totalExpense.toLocaleString()}`, 14, finalY + 10);
        doc.text(`Total Purchase: Rs. ${totalPurchase.toLocaleString()}`, 14, finalY + 16);
        doc.text(`Total Cost for the Month: Rs. ${totalCost.toLocaleString()}`, 14, finalY + 22);

        doc.save('Expense_Summary_Report.pdf');
    };

    return (
        <div className='container'>
            <Financebar>
                <div className='main-container'>
                    <h1>Expense Summary</h1>
                    <br />
                    <div className='margin' style={{ marginLeft: '80px' }}>
                        <form className='form'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan='3'>
                                            <h3>Total Other Expense</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Select year</h4>
                                        </td>
                                        <td>
                                            <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
                                                {Array.from({ length: 10 }, (_, i) => (
                                                    <option key={i} value={new Date().getFullYear() + i}>
                                                        {new Date().getFullYear() - i}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Select month</h4>
                                        </td>
                                        <td>
                                            <select onChange={handleExpenseMonthChange} value={selectedExpenseMonth}>
                                                <option value=''>Select a month</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i} value={i}>
                                                        {new Date(0, i).toLocaleString('en', { month: 'long' })}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Total: </th>
                                        <td>
                                            <input type='text' value={totalExpense} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            <h3>Total Inventory Cost</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Select month:</h4>
                                        </td>
                                        <td>
                                            <select onChange={handlePurchaseMonthChange} value={selectedPurchaseMonth}>
                                                <option value=''>Select a month</option>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i} value={i}>
                                                        {new Date(0, i).toLocaleString('en', { month: 'long' })}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Total: </th>
                                        <td>
                                            <input type='text' value={totalPurchase} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            <h2>Total Cost for the Month: </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='3'>
                                            <input type='text' value={totalCost} readOnly style={{ textAlign: 'center' }} />
                                        </td>
                                    </tr>
                                    <tr className='button-container'>
                                        <td colSpan='3'>
                                            <button className='btn' onClick={generateReport}>
                                                Generate Report
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </Financebar>
        </div>
    );
};

export default ExpenseSummary;
