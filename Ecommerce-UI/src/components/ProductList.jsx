// import React, { useEffect, useState } from 'react';
// import { getProducts } from '../services/axiosService';

// const ProductList = ({ onAddToCart }) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         const response = await getProducts();
//         setProducts(response.data);
//     };

//     return (
//         <div>
//             <h2>All Products</h2>
//             <table className="table table-hover">
//                 <thead>
//                     <tr>
//                         <th scope="col">Name</th>
//                         <th scope="col">Description</th>
//                         <th scope="col">Price</th>
//                         <th scope="col">Category ID</th>
//                         <th scope="col">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => (
//                         <tr key={product.id}>
//                             <td>{product.name}</td>
//                             <td>{product.description}</td>
//                             <td>{product.price}</td>
//                             <td>{product.categoryId}</td>
//                             <td>
//                                 <button onClick={() => onAddToCart(product)} className="btn btn-primary mt-3">
//                                     Add to Cart
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ProductList;


import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/axiosService';

const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h2>All Products</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                {product.imagePath ? (
                                    <img 
                                        src={product.imagePath} 
                                        alt={product.name} 
                                        style={{ width: '100px', height: '100px' }} 
                                    />
                                ) : (
                                    <span>No Image Available</span>
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.categoryId}</td>
                            <td>
                                <button onClick={() => onAddToCart(product)} className="btn btn-primary mt-3">
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;

