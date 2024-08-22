import React, { useEffect, useState } from 'react';
import { searchProducts, getCategories } from '../services/axiosService';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductList.css'; 

const SearchProduct = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get('name');
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            fetchProducts(searchTerm);
            fetchCategories();
        }
    }, [searchTerm]);

    const fetchProducts = async (searchTerm) => {
        try {
            const response = await searchProducts(searchTerm);
            setProducts(response.data);
        } catch (error) {
            console.error("[SearchProduct.jsx]: Error fetching products:", error);
            setProducts([]);
        }
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };


    return (
        <div className="mt-2 mb-5">
            <h1>Search Results</h1>
            <div className="product-card-container mt-3">
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => navigate(`/productDetails/${product.id}`)}
                            style={{ cursor: 'pointer' }}>
                            <div className="card-body">
                                <div className="product-card-image-container">
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
                                <h5 className="product-card-title">{product.name}</h5>
                                <p className="product-card-price">${product.price}</p>
                                <p className="product-card-category">{getCategoryNameById(product.categoryId)}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAddToCart(product);
                                    }}
                                    className="btn btn-primary">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found for "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
};

export default SearchProduct;

