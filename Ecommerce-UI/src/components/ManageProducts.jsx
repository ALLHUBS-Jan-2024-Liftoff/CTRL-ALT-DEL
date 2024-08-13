import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/axiosService';
import { deleteProduct } from '../services/axiosService';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetchProduct(products);
    }, [products]);

    const fetchProduct = async () => {
        const response = await getProducts(products);
        setProducts(response.data);
        console.log(response.data);
    };

    const handleDelete = async (productId) => {
        console.log("Deleting product with ID:", productId); // Debugging line
    
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                console.log(`Product with ID ${productId} deleted.`);
                setProducts(products => products.filter(product => product.id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };


    return (
        <div>
            <h2>All Products</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
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
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.categoryId}</td>
                            <td>
                                <Link to={`/updateProduct/${product.id}`} className="btn btn-primary">Edit</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;