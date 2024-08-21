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
        <div className="mt-2 form-label mb-5">
            <h2>All Categories</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th class="text-start">Name</th>
                        <th class="text-start">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} scope="row">
                            <td class="text-start">{category.name}</td>
                            <td class="text-start">{category.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
