import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/axiosService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css'; 

const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error('Expected an array of categories, but got:', response.data);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]); 
        }
    };

    const getCategoryNameById = (categoryId) => {
        if (!Array.isArray(categories)) {
            console.error('Categories is not an array:', categories);
            return 'Unknown Category';
        }
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    const handleAddToWishlist = (product) => {
        axios.post('http://localhost:8080/api/wishlist/add', null, {
            params: {
                productId: product.id
            },
            withCredentials: true
        })
        .then(response => {
            alert('Product added to wishlist');
        })
        .catch(error => {
            console.error('There was an error adding the product to the wishlist!', error);
            alert('Error adding product to wishlist');
        });
    };

    return (
        <div className="product-list-container mt-2 mb-5">
            <h2 className="product-list-title">All Products</h2>
            <div className="product-card-container">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => navigate(`/productDetails/${product.id}`)}>

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
                        <div className="product-card-content">
                            <h5 className="product-card-title">{product.name}</h5>
                            <p className="product-card-description">{product.description}</p>
                            <p className="product-card-price">Price: ${product.price.toFixed(2)}</p>
                            <p className="product-card-category">Category: {getCategoryNameById(product.categoryId)}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    onAddToCart(product);
                                }}
                                className="btn btn-primary mt-3 product-card-button"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToWishlist(product);
                                }}
                                className="btn btn-secondary mt-2 product-card-button"
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;