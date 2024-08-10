// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../services/axiosService';


const CategoryForm = ({ currentCategory, onSave}) => {
    const [success, setSuccess] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (currentCategory) {
            setCategory(currentCategory);
        }
    }, [currentCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (category.id) {
            await updateCategory(category.id, category);
        } else {
            try{
            await createCategory(category);
            setSuccess(true);
            }
            catch (error) {
                console.error('Error creating category:', error);
                setSuccess(false);
            }
        }
        onSave();
    };

    const handelCancel = () => {
        if (window.confirm('Are you sure you want to cancel? This will clear all fields.')) {
            setcategory({
                name: '',
                description: '',
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
                    value={category.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div >
                <label className="form-label">Description</label>
                <input
                    type="text"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="form-control">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" onClick={handelCancel} className="btn btn-primary">Cancel</button>
                {success && <p>Category created successfully!</p>}
            </div>
        </form>
    );
};

export default CategoryForm;
