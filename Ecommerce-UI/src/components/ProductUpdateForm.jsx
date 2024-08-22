import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct, getCategories } from '../services/axiosService';
import { useParams } from 'react-router-dom';

const ProductUpdateForm = () => {
    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
    });

    useEffect(() => {
        fetchCategories();
        fetchProduct(id);
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProduct = async (id) => {
        const response = await getProductById(id);
        setProduct(response.data);
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
        try {
            await updateProduct(product);
            setSuccess(true);
        } catch (error) {
            console.error('Error updating product:', error);
            setSuccess(false);
        }
    };

    const handleCancel = () => {
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
        <div className="container mt-2 mb-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Update Product</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={id} />
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
                                required
                                rows="3"
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
                        {success && <p className="text-success mt-3">Product updated successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdateForm;
