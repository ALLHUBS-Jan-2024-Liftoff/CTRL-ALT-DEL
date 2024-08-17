import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/axiosService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try{
            const response = await getCategories();
            // console.log(response.data);
        setCategories(response.data);
        } catch(error){
            console.log(error);
        }
    };

    return (
        <div className="mt-5">
            <h2>All Categories</h2>
            <table className="table table-hover">
                <thead className="mt-3">
                    <tr className="form-label">
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
