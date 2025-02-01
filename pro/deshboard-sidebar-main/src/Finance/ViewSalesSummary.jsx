import React, { useEffect, useState } from 'react';
import Financebar from '../components/Financebar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
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

const ViewSalesSummary = () => {
    const [sales, setSales] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyData, setMonthlyData] = useState({
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: Array.from({ length: 12 }, () => 0)
            },
        ]
    });
    const [hasData, setHasData] = useState(true);

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const loadSales = async (year) => {
        try {
            const result = await axios.get('http://localhost:8080/salesAndRevenues', { params: { year } });
            setSales(result.data);
        } catch (error) {
            console.log("Error loading sales", error);
            window.alert("Error loading sales");
        }
    };

    const calculateMonthlySales = (salesData, year) => {
        const months = Array(12).fill(0);
        salesData.forEach(sale => {
            const saleDate = new Date(sale.date);
            if (saleDate.getFullYear() === year) {
                const month = saleDate.getMonth();
                months[month] += sale.totalSalesAmount;
            }
        });
        return months;
    };

    useEffect(() => {
        loadSales(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        if (sales.length === 0) {
            setHasData(false);
            setMonthlyData((prevData) => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: Array.from({ length: 12 }, () => 0)
                    }
                ]
            }));
        } else {
            setHasData(true);
            const monthlySales = calculateMonthlySales(sales, selectedYear);
            setMonthlyData({
                labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })),
                datasets: [
                    {
                        label: 'Sales',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                        hoverBorderColor: 'rgba(54, 162, 235, 1)',
                        data: monthlySales
                    },
                ]
            });
        }
    }, [sales, selectedYear]);

    return (
        <div className='container'>
            <Financebar>
                <div className='main-container'>
                    <h1>Sales and Revenue Summary</h1>
                    <div className="year-selector">
                        <label htmlFor="year">Select Year: </label>
                        <select id="year" value={selectedYear} onChange={handleYearChange}>
                            {[...Array(10).keys()].map(i => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>
                    <div className='section'>
                        <h3>Total Sales By Month for {selectedYear}</h3>
                        <div className="chart-container">
                            {hasData ? (
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
                            ) : (
                                <p>No records found for {selectedYear}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Financebar>
        </div>
    );
}

export default ViewSalesSummary;
