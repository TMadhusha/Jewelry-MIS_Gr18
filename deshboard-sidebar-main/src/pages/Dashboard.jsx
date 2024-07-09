import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/items/${itemId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        if (itemId) {
            fetchItemData();
        }
    }, [itemId]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
        </div>
    );
};

export default Dashboard;
