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

    const [remoteChartData, setRemoteChartData] = useState({
        options: {
            chart: {
                id: "remote-bar"
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: "Remote Customer Count",
                data: []
            }
        ]
    });

    const [totalCustomerCount, setTotalCustomerCount] = useState(0);
    const [remoteCustomerCount, setRemoteCustomerCount] = useState(0);

    useEffect(() => {
        fetchData();
        fetchRemoteCustomerData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getcustomer');
            const data = response.data;

            const customerCountsByYear = data.reduce((counts, customer) => {
                const year = new Date(customer.registration_date).getFullYear();
                counts[year] = (counts[year] || 0) + 1;
                return counts;
            }, {});

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

    const fetchRemoteCustomerData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/remoteCustomersG');
            const remoteCustomerData = response.data;

            const remoteCustomerCountsByYear = remoteCustomerData.reduce((counts, customer) => {
                const year = new Date(customer.registration_date).getFullYear();
                counts[year] = (counts[year] || 0) + 1;
                return counts;
            }, {});

            const remoteYears = Object.keys(remoteCustomerCountsByYear);
            const remoteCustomerCounts = Object.values(remoteCustomerCountsByYear);

            setRemoteChartData({
                options: {
                    chart: {
                        id: "remote-bar"
                    },
                    xaxis: {
                        categories: remoteYears
                    }
                },
                series: [
                    {
                        name: "Remote Customer Count",
                        data: remoteCustomerCounts
                    }
                ]
            });

            setRemoteCustomerCount(remoteCustomerData.length);
        } catch (error) {
            console.error("Error fetching remote customer data:", error);
        }
    };

    const totalCustomers = totalCustomerCount + remoteCustomerCount;

    return (
        <CustomerBar>
            <div className='chart'>
                <h1>Customer Engagement</h1>
                <div className='total-customers'>
                    <h2>Total Customers: {totalCustomers}</h2>
                </div>
                <div className='chart-container'>
                    <div className='chart-item'>
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            width={700}
                        />
                        <div>
                            <h2>In-Store Customers</h2>
                            <p>{totalCustomerCount}</p>
                        </div>
                    </div>
                    <div className='chart-item'>
                        <Chart
                            options={remoteChartData.options}
                            series={remoteChartData.series}
                            type="bar"
                            width={700}
                        />
                        <div>
                            <h2>Remote Customers</h2>
                            <p>{remoteCustomerCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerBar>
    );
};

export default Customer;
