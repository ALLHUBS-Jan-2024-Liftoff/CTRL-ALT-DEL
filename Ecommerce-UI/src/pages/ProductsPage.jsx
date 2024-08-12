import React, { useState } from "react";
import ProductList from './../components/ProductList';
import ProductForm from './../components/ProductForm';


const ProductsPage = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (product) => {
      setCurrentProduct(product);
      setIsFormVisible(true);
  };

  const handleSave = () => {
      setIsFormVisible(false);
      setCurrentProduct(null);
  };

  const handleCancel = () => {
      setIsFormVisible(false);
      setCurrentProduct(null);
  };


  return (
      <div>
          <main>
              {isFormVisible ? (
                  <ProductForm
                      currentProduct={currentProduct}
                      onSave={handleSave}
                      onCancel={handleCancel}
                  />
              ) : (
                  <div>
                      <button onClick={() => setIsFormVisible(true)}>Add Product</button>
                      <ProductList onEdit={handleEdit} />
                  </div>
              )}
          </main>
      </div>
  );
};


export default ProductsPage;

// import React from 'react';
// import { useCart } from '../context/CartContext';

// const Product = ({ product }) => {
//     const { addToCart } = useCart();

//     const handleAddToCart = () => {
//         addToCart(product);
//     };

//     return (
//         <div>
//             <h2>{product.name}</h2>
//             <p>${product.price.toFixed(2)}</p>
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default Product;