import React, { useEffect, useState } from 'react';
import Financebar from '../components/Financebar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseChart = () => {
    const [expense, setExpense] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState({
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en', { month: 'long' })),
        datasets: [
            {
                label: 'Other Expenses',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: Array.from({ length: 12 }, () => 0)
            },
            {
                label: 'Purchases',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: Array.from({ length: 12 }, () => 0)
            }
        ]
    });
    const [noUpdates, setNoUpdates] = useState(false);

    const fetchData = async (year) => {
        try {
            const resultE = await axios.get(`http://localhost:8080/getExpense`, { params: { year } });
            const resultP = await axios.get(`http://localhost:8080/getPurchase`, { params: { year } });
            setExpense(resultE.data);
            setPurchase(resultP.data);
            setNoUpdates(resultE.data.length === 0 && resultP.data.length === 0);
        } catch (error) {
            console.error("Error loading data", error);
            setNoUpdates(true);
        }
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        const filteredExpenses = expense.filter(exp => new Date(exp.date).getFullYear() === selectedYear);
        const filteredPurchases = purchase.filter(pur => new Date(pur.date).getFullYear() === selectedYear);

        const monthlyExpenses = Array.from({ length: 12 }, () => 0);
        const monthlyPurchases = Array.from({ length: 12 }, () => 0);

        filteredExpenses.forEach(exp => {
            const month = new Date(exp.date).getMonth();
            monthlyExpenses[month] += parseFloat(exp.amount);
        });

        filteredPurchases.forEach(pur => {
            const month = new Date(pur.date).getMonth();
            monthlyPurchases[month] += parseFloat(pur.cost);
        });

        setMonthlyData(prevData => ({
            ...prevData,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: monthlyExpenses
                },
                {
                    ...prevData.datasets[1],
                    data: monthlyPurchases
                }
            ]
        }));
    }, [expense, purchase, selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    return (
        <div className='container'>
            <Financebar>
                <div className='main-container'>
                    <div className="year-selector">
                        <label htmlFor="year">Select Year: </label>
                        <select id="year" value={selectedYear} onChange={handleYearChange}>
                            {[...Array(10).keys()].map(i => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                    <div className="chart-container">
                        <h2>Monthly Expenses for {selectedYear}</h2>
                        {noUpdates ? (
                            <p>No records</p>
                        ) : (
                            <Bar
                                data={monthlyData}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                            }
                                        },
                                        x: {
                                            beginAtZero: true,
                                            type: 'category'
                                        }
                                    }
                                }}
                            />
                        )}
                    </div>
                    <div className='button-container' >
                        <Link className='btn' to={'/expenseSummary'} style={{marginLeft:"500px"}}> Continue...</Link>
                    </div>
                </div>
            </Financebar>
        </div>
    );
}

export default ExpenseChart;
