import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to local storage whenever the cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Update the quantity for the existing item
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Add the new item to the cart
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Function to update the quantity of an item in the cart
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to load past orders from local storage
  const loadPastOrders = () => {
    return JSON.parse(localStorage.getItem('orderHistory')) || [];
  };

  // Function to reorder items from a past order
  const reorderItems = (orderItems) => {
    orderItems.forEach(item => {
      addToCart(item);
    });
  };

  // Function to delete order history
  const deleteOrderHistory = () => {
    localStorage.removeItem('orderHistory');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        loadPastOrders,
        reorderItems,
        deleteOrderHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

