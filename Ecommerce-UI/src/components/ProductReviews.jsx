import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxrating] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/product/${productId}`, {params: { sortBy, minRating, maxRating }
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, sortBy, minRating, maxRating]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reviews-list mt-4">
      <div className="filter-controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
        <select value={minRating || ''} onChange={(e) => setMinRating(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">Min Rating</option>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} stars</option>)}
        </select>
        <select value={maxRating || ''} onChange={(e) => setMaxRating(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">Max Rating</option>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} stars</option>)}
        </select>
      </div>

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
