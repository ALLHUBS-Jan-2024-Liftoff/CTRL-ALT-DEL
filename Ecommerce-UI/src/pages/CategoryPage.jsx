import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";


const CategoryPage = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (category) => {
      setCurrentCategory(category);
      setIsFormVisible(true);
  };

  const handleSave = () => {
      setIsFormVisible(false);
      setCurrentCategory(null);
  };

  const handleCancel = () => {
      setIsFormVisible(false);
      setCurrentCategory(null);
  };

  return (
      <div>
          <main>
              {isFormVisible ? (
                  <CategoryForm
                      currentCategory={currentCategory}
                      onSave={handleSave}
                      onCancel={handleCancel}
                  />
              ) : (
                  <div>
                      <button onClick={() => setIsFormVisible(true)}>Add Category</button>
                      <CategoryList onEdit={handleEdit} />
                  </div>
              )}
          </main>
      </div>
  );
};


export default CategoryPage;