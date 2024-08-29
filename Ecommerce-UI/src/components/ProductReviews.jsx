import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // default to sorting by date
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/product/${productId}`, {
          params: { sortBy, minRating, maxRating }
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <FontAwesomeIcon
        key={i}
        icon={i < rating ? solidStar : regularStar}
        style={{ color: '#ffc107', fontSize: '18px' }}  // trying inline styling because the stylesheet doesn't seem to work. not sure what's overriding it 
      />
    ));
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reviews-list mt-4">
      <div className="filter-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>
        
        <label htmlFor="min-rating">Min Rating:</label>
        <select id="min-rating" value={minRating || ''} onChange={(e) => setMinRating(e.target.value ? parseInt(e.target.value) : null)}>
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} stars</option>)}
        </select>
        
      </div>

      {reviews.length > 0 ? (
        <div className="reviews-list-group">
          {reviews.map((review, index) => (
          <div key={index} className="reviews-list-item">
            <div className="review-header">
              <div className="star-rating">{renderStars(review.rating)}</div>
              <h5 className="mb-1">{review.comment}</h5>
            </div>
            <p className="review-date">{new Date(review.reviewDate).toLocaleDateString()}</p>
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
