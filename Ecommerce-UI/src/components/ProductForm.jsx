// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/axiosService';


const ProductForm = ({ currentProduct, onSave}) => {
    const [success, setSuccess] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
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
            try{
            await createProduct(product);
            setSuccess(true);
            }
            catch (error) {
                console.error('Error creating product:', error);
                setSuccess(false);
            }
        }
        onSave();
    };

    const handelCancel = () => {
        if (window.confirm('Are you sure you want to cancel? This will clear all fields.')) {
            setProduct({
                name: '',
                description: '',
                price: '',
                categoryId: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-5">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div >
                <label className="form-label">Description</label>
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div >
                <label className="form-label">Category ID</label>
                <input
                    type="number"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-control">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={handelCancel} className="btn btn-primary">Cancel</button>
                {success && <p>Product created successfully!</p>}
            </div>
        </form>
    );
};

export default ProductForm;
