import React, { useState, useEffect } from 'react'; //manage the componenets
import CustomerBar from '../components/CustomerBar'; // Importing CustomerBar component
import Chart from "react-apexcharts"; // Importing Chart component
import axios from 'axios'; // Importing axios for making HTTP requests   get data from the backend


const Customer = () => {
    // State for chart data and total customer count  //hold the data
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
        fetchData(); // Fetch data when component mounts
    }, []);

    // Function to fetch customer data
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getcustomer'); // Fetch data from backend
            const data = response.data; // Extract data from response

            // Group customer counts by year
            const customerCountsByYear = data.reduce((counts, customer) => {
                const year = new Date(customer.registration_date).getFullYear(); // Extract year from registration date
                counts[year] = (counts[year] || 0) + 1; // Increment count for the year
                return counts;
            }, {});

            // Extract years and corresponding customer counts
            const years = Object.keys(customerCountsByYear);
            const customerCounts = Object.values(customerCountsByYear);

            // Update chart data and total customer count
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

            setTotalCustomerCount(data.length); // Set total customer count
        } catch (error) {
            console.error("Error fetching data:", error); // Log error if data fetching fails
        }
    };

    return (
        <CustomerBar> {/* CustomerBar component for layout */}
            <div className='chart'>
                <h1>Customer Engagement</h1>
                <div className='row'>
                    <div className='col-12'>
                        {/* Chart component */}
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            width={700}
                        />
                    </div>
                </div>
                <div>
                    {/* Display total customer count */}
                    <h2>Total Customers</h2>
                    <p>{totalCustomerCount}</p>
                </div>
            </div>
        </CustomerBar>
    );
};

export default Customer;
