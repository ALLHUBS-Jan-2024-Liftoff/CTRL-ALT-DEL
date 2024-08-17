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
        try{
            await updateProduct(product);
            setSuccess(true);
        }
        catch (error) {
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
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id}/>
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
            <div className="mt-2">
                <label className="form-label">Description</label>
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mt-2">
                <label className="form-label">Price</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mt-2">
                {/* <label className="form-label">Category ID</label>
                <input
                    type="number"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                /> */}
                <label className="form-label">Category</label>
                <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleCategoryChange}
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
            <div className="mt-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
                {success && <p>Product updated successfully!</p>}
            </div>
        </form>
    );
};

export default ProductUpdateForm;