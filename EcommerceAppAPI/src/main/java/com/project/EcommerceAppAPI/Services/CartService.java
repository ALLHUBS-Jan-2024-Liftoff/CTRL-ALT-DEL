//package com.project.EcommerceAppAPI.Services;
//
//import com.project.EcommerceAppAPI.models.Cart;
//import com.project.EcommerceAppAPI.models.CartItem;
//import com.project.EcommerceAppAPI.models.Product;
//import com.project.EcommerceAppAPI.repositories.CartRepository;
//import com.project.EcommerceAppAPI.repositories.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class CartService {
//
//    @Autowired
//    private CartRepository cartRepository;
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    // Retrieve cart by user ID
//    public Cart getCartByUserId(Long userId) {
//        return cartRepository.findByUserId(userId).orElse(new Cart(userId));
//    }
//
//    // Add item to cart
//    public Cart addItemToCart(Long userId, Long productId, int quantity) {
//        Cart cart = getCartByUserId(userId);
//        Optional<Product> productOpt = productRepository.findById(productId);
//
//        if (productOpt.isPresent()) {
//            Product product = productOpt.get();
//            CartItem cartItem = cart.getCartItem(productId);
//
//            if (cartItem != null) {
//                cartItem.setQuantity(cartItem.getQuantity() + quantity);
//            } else {
//                cartItem = new CartItem(product, quantity);
//                cart.addCartItem(cartItem);
//            }
//
//            cartRepository.save(cart);
//        }
//
//        return cart;
//    }
//
//    // Update item quantity in cart
//    public Cart updateItemQuantity(Long userId, Long productId, int quantity) {
//        Cart cart = getCartByUserId(userId);
//        CartItem cartItem = cart.getCartItem(productId);
//
//        if (cartItem != null) {
//            cartItem.setQuantity(quantity);
//            cartRepository.save(cart);
//        }
//
//        return cart;
//    }
//
//    // Remove item from cart
//    public Cart removeItemFromCart(Long userId, Long productId) {
//        Cart cart = getCartByUserId(userId);
//        cart.removeCartItem(productId);
//        cartRepository.save(cart);
//        return cart;
//    }
//
//    // Clear the cart
//    public void clearCart(Long userId) {
//        Cart cart = getCartByUserId(userId);
//        cart.clearItems();
//        cartRepository.save(cart);
//    }
//}
//
//// Proceed to checkout (this is a placeholder, you would integrate with Stripe
