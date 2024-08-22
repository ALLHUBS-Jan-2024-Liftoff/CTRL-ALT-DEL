import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getCategories } from '../services/axiosService';
import ProductReviews from './ProductReviews';  
import ReviewForm from './ReviewForm';

const ProductDetails = ({ onAddToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchProductDetails();
        fetchCategories();
        fetchProductReviews();
    }, [id]);

    const fetchProductDetails = async () => {
        const response = await getProductById(id);
        setProduct(response.data);
    };

    const fetchCategories = async () => {
        const response = await getCategories();
        setCategories(response.data);
    };

    const fetchProductReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reviews/product/${id}`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleReviewAdded = (newReview) => {
        setReviews(prevReviews => [...prevReviews, newReview]);
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
        {/* Product Image and Details */}
        <div className="product-info-section mb-5">
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

        {/* Reviews Section */}
        <div className="product-reviews-section mt-4">
            <h2>Reviews</h2>
            <ProductReviews productId={id} />
        

        </div>

        {/* Review Form */}
        <div className="add-review-section mt-4">
            <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />
        </div>
    </div>
    );
};

export default ProductDetails;
