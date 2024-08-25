import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './WishlistPage.css'; 

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/wishlist', { withCredentials: true })
            .then(response => {
                // console.log("Wishlist data:", response.data);
                setWishlistItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the wishlist!", error);
            });
    }, []);

//     const handleIncrementQuantity = async (productId) => {
//       try {
//           await axios.post(`http://localhost:8080/api/wishlist/add`, { productId }, { withCredentials: true });
//           setWishlistItems(prevItems => prevItems.map(item => 
//               item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//           ));
//       } catch (error) {
//           console.error("There was an error adding the product to the wishlist!", error);
//       }
//   };

//   const handleDecrementQuantity = async (productId) => {
//       try {
//           await axios.delete(`http://localhost:8080/api/wishlist/remove?productId=${productId}`, { withCredentials: true });
//           setWishlistItems(prevItems => prevItems.map(item => 
//               item.product.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//           ).filter(item => item.quantity > 0)); // Filter out the item if its quantity becomes 0
//       } catch (error) {
//           console.error("There was an error decreasing the product quantity in the wishlist!", error);
//       }
//   };

    const handleRemoveFromWishlist = (productId) => {
      axios.delete(`http://localhost:8080/api/wishlist/remove`, {
        params: { productId },
        withCredentials: true,
      })
      .then(() => {
        setWishlistItems(prevItems => prevItems.filter(item => item.product.id !== productId));
      })
      .catch(error => {
        console.error("There was an error removing the product from the wishlist!", error);
      });
    };

    if (wishlistItems.length === 0) {
        return <div>Your wishlist is empty.</div>;
    }

    return (
        <div className="container mt-5 wishlist-container">
            <h2 className="mb-4">My Wishlist</h2>
            <div className="row justify-content-center">
                {wishlistItems.map(item => (
                    <div key={item.product.id} className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card mb-4 shadow-sm wishlist-card">
                            <img src={item.product.imagePath} className="card-img-top wishlist-image" alt={item.product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.product.name}</h5>
                                <p className="card-text">${item.product.price}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/productDetails/${item.product.id}`} className="btn btn-primary btn-block">View Product</Link>
                                    <button onClick={() => onAddToCart(item.product)} className="btn btn-success btn-block">Add to Cart</button>
                                </div>
                                <button 
                                    onClick={() => handleRemoveFromWishlist(item.product.id)} 
                                    className="btn btn-danger mt-3"
                                >
                                    Remove from Wishlist
                                </button>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
