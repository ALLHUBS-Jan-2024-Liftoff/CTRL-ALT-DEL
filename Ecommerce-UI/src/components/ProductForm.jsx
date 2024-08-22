import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getCategories } from '../services/axiosService';

const ProductForm = ({ currentProduct }) => {
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        imagePath: ''
    });

    useEffect(() => {
        setSuccess(false);
        fetchCategories();
        if (currentProduct) {
            setProduct(currentProduct);
        }
    }, [currentProduct]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setProduct({ ...product, categoryId: selectedCategoryId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.id) {
            await updateProduct(product.id, product);
        } else {
            try {
                await createProduct(product);
                setSuccess(true);
            } catch (error) {
                console.error('Error creating product:', error);
                setSuccess(false);
            }
        }
    };

    const handleCancel = () => {
        setSuccess(false);
        if (window.confirm('Are you sure you want to cancel? This will clear all fields.')) {
            setProduct({
                name: '',
                description: '',
                price: '',
                categoryId: '',
                imagePath: ''
            });
        }
    };

    return (
        <div className="container mt-2 mb-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Create Product</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter product description"
                                rows="2"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter product price"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Image Path</label>
                            <input
                                type="text"
                                name="imagePath"
                                value={product.imagePath}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter product image link"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Category</label>
                            <select
                                name="categoryId"
                                value={product.categoryId}
                                onChange={handleCategoryChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <button type="submit" className="btn btn-success">
                                Save
                            </button>
                            <button type="button" onClick={handleCancel} className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                        {success && <p className="text-success mt-3">Product created successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
