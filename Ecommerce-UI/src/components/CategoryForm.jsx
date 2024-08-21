import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../services/axiosService';

const CategoryForm = () => {
    const [success, setSuccess] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (category) {
            setCategory(category);
        }
    }, [category]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category.id) {
                await updateCategory(category.id, category);
            } else {
                await createCategory(category);
                setSuccess(true);
            }
        } catch (error) {
            console.error('Error creating/updating category:', error);
            setSuccess(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? This will clear all fields.')) {
            setCategory({
                name: '',
                description: '',
            });
        }
    };

    return (
        <div className="container mt-2 mb-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Create/Update Category</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter category name"
                                required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={category.description}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter category description"
                                required
                                rows="3"
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <button type="submit" className="btn btn-success">
                                Save
                            </button>
                            <button type="button" onClick={handleCancel} className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                        {success && <p className="text-success mt-3">Category created/updated successfully!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;