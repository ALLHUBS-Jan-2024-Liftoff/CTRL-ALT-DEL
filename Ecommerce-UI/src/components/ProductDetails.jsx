// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProductById, getCategoryById } from '../services/axiosService';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [categoryName, setCategoryName] = useState('');

//     useEffect(() => {
//         fetchProductDetails(id);
//     }, [id]);

//     const fetchProductDetails = async (productId) => {
//         const response = await getProductById(productId);
//         setProduct(response.data);

//         const categoryResponse = await getCategoryById(response.data.categoryId);
//         setCategoryName(categoryResponse.data.name);
//     };

//     if (!product) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h2>Product Details</h2>
//             <p><strong>Name:</strong> {product.name}</p>
//             <p><strong>Description:</strong> {product.description}</p>
//             <p><strong>Price:</strong> ${product.price}</p>
//             <p><strong>Category:</strong> {categoryName}</p>
//         </div>
//     );
// };

// export default ProductDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getCategories } from '../services/axiosService';
import { useEffect, useState } from 'react';

const ProductDetails = ({ onAddToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchProductDetails();
        fetchCategories();
    }, [id]);

    const fetchProductDetails = async () => {
        const response = await getProductById(id);
        setProduct(response.data);
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details-container">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>
            <div className="product-details-content">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h2>${product.price}</h2>
                <p>Category: {getCategoryNameById(product.categoryId)}</p>
                <button onClick={() => onAddToCart(product)} className="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
