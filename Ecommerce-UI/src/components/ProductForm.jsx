import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct, getCategories } from '../services/axiosService';


const ProductForm = ({ currentProduct }) => {
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: ''
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
        // setSuccess(false);
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e) => {
        // setSuccess(false);
        const selectedCategoryId = e.target.value;
        setProduct({ ...product, categoryId: selectedCategoryId });
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
        
    };

    const handelCancel = () => {
        setSuccess(false);
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
            <div className="form-control">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={handelCancel} className="btn btn-primary">Cancel</button>
                {success && <p>Product created successfully!</p>}
            </div>
        </form>
    );
};

export default ProductForm;
