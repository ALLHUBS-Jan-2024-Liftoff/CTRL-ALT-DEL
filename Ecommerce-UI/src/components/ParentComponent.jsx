import React, { useState } from 'react';
import ProductList from './ProductList';

const ParentComponent = () => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <div>
            <ProductList onAddToCart={handleAddToCart} />
            <h2>Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ParentComponent;
