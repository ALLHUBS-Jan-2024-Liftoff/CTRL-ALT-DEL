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
      const response = await axios.post(`http://localhost:8080/reviews/product/${productId}`, {
        rating,
        comment,
      });
      setSuccessMessage('Review added successfully!');
      if (onReviewAdded) {
      onReviewAdded(response.data);
    }
      setRating(1); 
      setComment('');
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="card my-4">
    <div className="card-body">
        <h3 className="card-title">Add a Review</h3>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                    id="comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                    id="rating"
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
    </div>
</div>
  );
};

export default ReviewForm;