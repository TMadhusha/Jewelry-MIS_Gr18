import React, { useState, useEffect } from 'react';
import CustomerBar from '../components/CustomerBar';
import Chart from "react-apexcharts";
import axios from 'axios';

const Customer = () => {
    const [chartData, setChartData] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: "Customer Count",
                data: []
            }
        ]
    });

    const [totalCustomerCount, setTotalCustomerCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getcustomer');
            const data = response.data;

            // Group customer counts by year
            const customerCountsByYear = data.reduce((counts, customer) => {
                const year = new Date(customer.registration_date).getFullYear();
                counts[year] = (counts[year] || 0) + 1;
                return counts;
            }, {});

            // Extract years and corresponding customer counts
            const years = Object.keys(customerCountsByYear);
            const customerCounts = Object.values(customerCountsByYear);

            setChartData({
                options: {
                    chart: {
                        id: "basic-bar"
                    },
                    xaxis: {
                        categories: years
                    }
                },
                series: [
                    {
                        name: "Customer Count",
                        data: customerCounts
                    }
                ]
            });

            setTotalCustomerCount(data.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <CustomerBar>
            <div className='chart'>
                <h1>Customer Engagement</h1>
                <div className='row'>
                    <div className='col-12'>
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            width={700}
                        />
                    </div>
                </div>
                <div>
                    <h2>Total Customers</h2>
                    <p>{totalCustomerCount}</p>
                </div>
            </div>
        </CustomerBar>
    );
};

export default Customer;
