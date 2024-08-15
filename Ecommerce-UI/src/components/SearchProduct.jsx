import React, { useEffect, useState } from 'react';
import { searchProducts } from '../services/axiosService';
import { useLocation } from 'react-router-dom';

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get('name');
    console.log("[SearchProducts.jsx]: SearchTerm:", searchTerm);

    useEffect(() => {
        if (searchTerm) {
            fetchProducts(searchTerm);
        }
    }, [searchTerm]);

    const fetchProducts = async (searchTerm) => {
        try {
            const response = await searchProducts(searchTerm);
            console.log("[SearchProduct.jsx]: Response Object:", response);
            console.log("[SearchProduct.jsx]: Response Data:", response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("[SearchProduct.jsx]: Error fetching products:", error);
            setProducts([]); // Clear products on error
        }
        console.log("[SearchProduct.jsx]: Products:", products);
    };

    return (
        <div>
            <h1>Search Results</h1>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.categoryId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found for "{searchTerm}".</p>
            )}
        </div>
    );
};

export default SearchProduct;

// import React, { useEffect, useState } from 'react';
// import { searchProducts } from '../services/axiosService';
// import { useLocation } from 'react-router-dom';

// const SearchProduct = () => {
//     const [products, setProducts] = useState([]);
//     const query = new URLSearchParams(useLocation().search);
//     const searchTerm = query.get('name');
//     console.log("[SearchProducts.jsx]: SearchTerm : "+searchTerm);

//     useEffect(() => {
//         fetchProducts(searchTerm);
//     }, [searchTerm]);

//     const fetchProducts = async (searchTerm) => {
//         const response = searchProducts(searchTerm);
//         console.log("[SearchProduct.jsx]: Response Object : " + response);
//         console.log("[SearchProduct.jsx]: Response Data : " + response.data);
//         setProducts(response.data);
//         console.log("[SearchProduct.jsx]: Products"+products);
//     };

//     return (
//         <div>
//         <h1>Search Results</h1>
//         {products.length > 0 ? (
//             <table>
//                 <thead>
//                     <tr>
//                     {/* <input type="hidden" name="id" value={id}/> */}
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th>Price</th>
//                         <th>Category</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => (
//                         <tr key={product.id}>
//                             <td>{product.name}</td>
//                             <td>{product.description}</td>
//                             <td>${product.price}</td>
//                             <td>{product.categoryId}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         ) : (
//             <p>No products found for "{searchTerm}".</p>
//         )}
//     </div>
//     );
// };

// export default SearchProduct;

