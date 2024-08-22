import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/products/${productId}/reviews', {
        rating,
        comment,
      });
      setSuccessMessage('Review added successfully!');
      onReviewAdded(response.data);
      setComment('');
      setRating(1);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
      <div>
        <h3>Add a Review</h3>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {error && <p style={{ color: red}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              />
          </div>
          <div>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
  );
};

export default ReviewForm;