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

import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/axiosService';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
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
            <h2>All Products</h2>
            <div className="card-container">
                {products.map(product => (
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
                                className="btn btn-primary"
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
