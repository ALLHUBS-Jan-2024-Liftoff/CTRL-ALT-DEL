import React, { useState } from "react";
import ProductList from './../components/ProductList';
import ProductForm from './../components/ProductForm';

const ProductsPage = ({ onAddToCart }) => {
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
                      <ProductList onEdit={handleEdit} onAddToCart={onAddToCart} />
                  </div>
              )}
          </main>
      </div>
  );
};

export default ProductsPage;
