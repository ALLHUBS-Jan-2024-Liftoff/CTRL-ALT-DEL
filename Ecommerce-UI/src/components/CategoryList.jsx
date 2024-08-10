import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/axiosService';

const CategoryList = ({ onEdit }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    return (
        <div>
            <h2>All Categories</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(categories => (
                        <tr key={categories.id}>
                            <td>{categories.name}</td>
                            <td>{categories.description}</td>
                            <td>
                                <button onClick={() => onEdit(categories)} className="btn btn-primary mt-3">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
