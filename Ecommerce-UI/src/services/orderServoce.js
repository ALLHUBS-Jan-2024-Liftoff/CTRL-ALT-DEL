// services/orderService.js
import axios from 'axios';

export const getPastOrders = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/orders');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch past orders', error);
        return [];
    }
};
