import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/product/${productId}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reviews-list mt-4">
      {reviews.length > 0 ? (
        <div className="reviews-list-group">
          {reviews.map((review) => (
            <div key={review.id} className="reviews-list-item">
              <h5 className="mb-1">Rating: {review.rating}</h5>
              <p className="mb-1">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet. Add yours!</p>
      )}
    </div>
  );
};

export default ProductReviews;
