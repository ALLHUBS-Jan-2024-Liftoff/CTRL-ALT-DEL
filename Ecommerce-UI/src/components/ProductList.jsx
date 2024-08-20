// import React, { useEffect, useState } from 'react';
// import { getProducts, getCategories } from '../services/axiosService';
// import { Link } from 'react-router-dom';

// const ProductList = ({ onAddToCart }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, []);

//     const fetchProducts = async () => {
//         const response = await getProducts();
//         setProducts(response.data);
//     };

//     const fetchCategories = async () => {
//         const response = await getCategories();
//         setCategories(response.data);
//     };

//     const getCategoryNameById = (categoryId) => {
//         const category = categories.find(cat => cat.id === categoryId);
//         return category ? category.name : 'Unknown Category';
//     };

//     return (
//         // <div>
//         //     <h2>All Products</h2>
//         //     <table className="table table-hover">
//         //         <thead>
//         //             <tr>
//         //                 <th scope="col">Name</th>
//         //                 <th scope="col">Description</th>
//         //                 <th scope="col">Price</th>
//         //                 <th scope="col">Category</th>
//         //                 <th scope="col">Actions</th>
//         //             </tr>
//         //         </thead>
//         //         <tbody>
//         //             {products.map(product => (
//         //                 <tr key={product.id}>
//         //                     {/* <td>{product.name}</td> */}
//         //                     <td>
//         //                         <Link to={`/productDetails/${product.id}`}>
//         //                             {product.name}
//         //                         </Link>
//         //                     </td>
//         //                     <td>{product.description}</td>
//         //                     <td>{product.price}</td>
//         //                     <td>{getCategoryNameById(product.categoryId)}</td>
//         //                     <td>
//         //                         <button onClick={() => onAddToCart(product)} className="btn btn-primary mt-3">
//         //                             Add to Cart
//         //                         </button>
//         //                     </td>
//         //                 </tr>
//         //             ))}
//         //         </tbody>
//         //     </table>
//         // </div>
//         <div className="container">
//             <div className="row">
//                 {products.map(product => (
//                     <div key={product.id} className="col-md-4">
//                         <div className="card mb-4">
//                             <div className="card-body">
//                                 <h5 className="card-title">
//                                     <Link to={`/product/${product.id}`}>
//                                         {product.name}
//                                     </Link>
//                                 </h5>
//                                 <p className="card-text">{product.description}</p>
//                                 <p className="card-text">
//                                     <strong>Price:</strong> ${product.price}
//                                 </p>
//                                 <p className="card-text">
//                                     <strong>Category:</strong> {getCategoryNameById(product.categoryId)}
//                                 </p>
//                                 <button onClick={() => onAddToCart(product)} className="btn btn-primary">
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { getProducts, getCategories } from '../services/axiosService';
// import { useNavigate } from 'react-router-dom';

// const ProductList = ({ onAddToCart }) => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories();
//     }, []);

//     const fetchProducts = async () => {
//         const response = await getProducts();
//         setProducts(response.data);
//     };

//     const fetchCategories = async () => {
//         const response = await getCategories();
//         setCategories(response.data);
//     };

//     const getCategoryNameById = (categoryId) => {
//         const category = categories.find(cat => cat.id === categoryId);
//         return category ? category.name : 'Unknown Category';
//     };

//     return (
//         <div>
//             <h2>All Products</h2>
//             <div className="card-container">
//                 {products.map(product => (
//                     <div
//                         key={product.id}
//                         className="card"
//                         onClick={() => navigate(`/productDetails/${product.id}`)}
//                         style={{ cursor: 'pointer' }}
//                     >
//                         <div className="card-body">
//                             <h5 className="card-title">{product.name}</h5>
//                             {/* <p className="card-text">{product.description}</p> */}
//                             <p className="card-text">${product.price}</p>
//                             <p className="card-text">{getCategoryNameById(product.categoryId)}</p>
//                             {/* <button onClick={() => onAddToCart(product)} className="btn btn-primary">Add to Cart</button> */}
//                             <button
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     onAddToCart(product);
//                                 }}
//                                 className="btn btn-primary"
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductList;
import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/axiosService';
import { useNavigate } from 'react-router-dom';
import './ProductList.css'; // Assume this contains the styling

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
            setCategories([]); // Set to an empty array on error
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

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">All Products</h2>
            <div className="product-card-container">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => navigate(`/productDetails/${product.id}`)}
                    >
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
                                    e.stopPropagation(); // Prevent the card click from triggering
                                    onAddToCart(product);
                                }}
                                className="btn btn-primary mt-3"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
