// import React from "react";
// import '../App.css';

// const FeaturedProduct = () => {
//   return (
//   <section>
//     <div className="featured-product">
//       <img
//         src="src\assets\matt-brewer_hammered-silver-necklace.png"
//         alt="Matt Brewer Necklace"
//         style={{height:400, width:400}}
//       />
//       <div className="description">
//         <h3>Matt Brewer hammered silver necklace</h3>
//         <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/cart" method="POST">
//       <button type="submit">
//         Add To Cart
//       </button>
//     </form>
//   </section>
//   )
// };
// export default FeaturedProduct

// import React from 'react';
// import { useCart } from '../context/CartContext'; // Import useCart hook

// const FeaturedProduct = () => {
//   const { addToCart } = useCart();

//   const product = {
//     id: 1, // Unique ID for the product
//     name: "Matt Brewer hammered silver necklace",
//     price: 20.00,
//     image: "src/assets/matt-brewer_hammered-silver-necklace.png",
//   };

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     addToCart(product);
//   };

//   return (
//     <section>
//       <div className="featured-product">
//         <img
//           src={product.image}
//           alt={product.name}
//           style={{ height: 400, width: 400 }}
//         />
//         <div className="description">
//           <h3>{product.name}</h3>
//           <h5>${product.price.toFixed(2)}</h5>
//         </div>
//       </div>
//       <form onSubmit={handleAddToCart}>
//         <button type="submit">
//           Add To Cart
//         </button>
//       </form>
//     </section>
//   );
// };

// export default FeaturedProduct;

import React from 'react';
import { useCart } from '../context/CartContext'; // Ensure correct path
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const FeaturedProduct = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Hook for navigation

  const product = {
    id: 1, // Unique ID for the product
    name: "Matt Brewer hammered silver necklace",
    price: 20.00,
    image: "src/assets/matt-brewer_hammered-silver-necklace.png",
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product); // Add product to cart
    navigate('/cart'); // Redirect to cart page
  };

  return (
    <section>
      <div className="featured-product">
        <img
          src={product.image}
          alt={product.name}
          style={{ height: 400, width: 400 }}
        />
        <div className="description">
          <h3>{product.name}</h3>
          <h5>${product.price.toFixed(2)}</h5>
        </div>
      </div>
      <form onSubmit={handleAddToCart}>
        <button type="submit">
          Add To Cart
        </button>
      </form>
    </section>
  );
};

export default FeaturedProduct;
