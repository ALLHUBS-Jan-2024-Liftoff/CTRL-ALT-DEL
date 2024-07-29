// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/axiosService';

const ProductForm = ({ currentProduct, onSave, onCancel }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        product_category_id: ''
    });

    useEffect(() => {
        if (currentProduct) {
            setProduct(currentProduct);
        }
    }, [currentProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.id) {
            await updateProduct(product.id, product);
        } else {
            await createProduct(product);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category ID</label>
                <input
                    type="number"
                    name="product_category_id"
                    value={product.product_category_id}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default ProductForm;
