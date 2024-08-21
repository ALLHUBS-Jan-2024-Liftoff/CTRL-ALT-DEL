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
        <div className="product-details-container mt-2 mb-5">
            <div className="product-image-container">
                            {product.imagePath ? (
                                <img 
                                    src={product.imagePath} 
                                    alt={product.name} 
                                    className="product-card-image"
                                />
                            ) : (
                                <div className="product-card-no-image">No Image Available</div>
                            )}
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
