// // import React, { useEffect, useState } from 'react';
// // import { searchProducts } from '../services/axiosService';
// // import { useLocation } from 'react-router-dom';

// // const SearchProduct = () => {
// //     const [products, setProducts] = useState([]);
// //     const query = new URLSearchParams(useLocation().search);
// //     const searchTerm = query.get('name');
// //     // console.log("[SearchProducts.jsx]: SearchTerm:", searchTerm);

// //     useEffect(() => {
// //         if (searchTerm) {
// //             fetchProducts(searchTerm);
// //         }
// //     }, [searchTerm]);

// //     const fetchProducts = async (searchTerm) => {
// //         try {
// //             const response = await searchProducts(searchTerm);
// //             // console.log("[SearchProduct.jsx]: Response Object:", response);
// //             // console.log("[SearchProduct.jsx]: Response Data:", response.data);
// //             setProducts(response.data);
// //         } catch (error) {
// //             console.error("[SearchProduct.jsx]: Error fetching products:", error);
// //             setProducts([]);
// //         }
// //         // console.log("[SearchProduct.jsx]: Products:", products);
// //     };

// //     return (
// //         <div>
// //             <h1>Search Results</h1>
// //             {products.length > 0 ? (
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>Name</th>
// //                             <th>Description</th>
// //                             <th>Price</th>
// //                             <th>Category</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {products.map(product => (
// //                             <tr key={product.id}>
// //                                 <td>{product.name}</td>
// //                                 <td>{product.description}</td>
// //                                 <td>${product.price}</td>
// //                                 <td>{product.categoryId}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             ) : (
// //                 <p>No products found for "{searchTerm}".</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default SearchProduct;

// import React, { useEffect, useState } from 'react';
// import { searchProducts, getCategories } from '../services/axiosService';
// import { useLocation } from 'react-router-dom';

// const SearchProduct = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const query = new URLSearchParams(useLocation().search);
//     const searchTerm = query.get('name');

//     useEffect(() => {
//         if (searchTerm) {
//             fetchProducts(searchTerm);
//         }
//         fetchCategories();
//     }, [searchTerm]);

//     const fetchProducts = async (searchTerm) => {
//         try {
//             const response = await searchProducts(searchTerm);
//             setProducts(response.data);
//         } catch (error) {
//             console.error("[SearchProduct.jsx]: Error fetching products:", error);
//             setProducts([]);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await getCategories();
//             setCategories(response.data);
//         } catch (error) {
//             console.error("[SearchProduct.jsx]: Error fetching categories:", error);
//         }
//     };

//     const getCategoryNameById = (categoryId) => {
//         const category = categories.find(cat => cat.id === categoryId);
//         return category ? category.name : 'Unknown Category';
//     };

//     return (
//         <div className="container">
//             <h1>Search Results</h1>
//             <div className="row">
//                 {products.length > 0 ? (
//                     products.map(product => (
//                         <div key={product.id} className="col-md-4">
//                             <div className="card mb-4">
//                                 <div className="card-body">
//                                     <h5 className="card-title">{product.name}</h5>
//                                     <p className="card-text">{product.description}</p>
//                                     <p className="card-text"><strong>Price:</strong> ${product.price}</p>
//                                     <p className="card-text"><strong>Category:</strong> {getCategoryNameById(product.categoryId)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No products found for "{searchTerm}".</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SearchProduct;

import React, { useEffect, useState } from 'react';
import { searchProducts, getCategories } from '../services/axiosService';
import { useNavigate, useLocation } from 'react-router-dom';

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
        <div>
            <h1>Search Results</h1>
            <div className="card-container">
                {products.length > 0 ? (
                    products.map(product => (
                        <div
                            key={product.id}
                            className="card"
                            onClick={() => navigate(`/productDetails/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                {/* <p className="card-text">{product.description}</p> */}
                                <p className="card-text">${product.price}</p>
                                <p className="card-text">{getCategoryNameById(product.categoryId)}</p>
                                {/* <button onClick={() => onAddToCart(product)} className="btn btn-primary">Add to Cart</button> */}
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

