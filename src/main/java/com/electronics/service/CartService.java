package com.electronics.service;

import com.electronics.model.Cart;
import com.electronics.model.CartItem;
import com.electronics.model.Product;
import com.electronics.repository.CartRepository;
import com.electronics.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart getCartByUserId(String userId) {
        Optional<Cart> cart = cartRepository.findByUserId(userId);
        return cart.orElse(new Cart(userId));
    }

    public Cart addToCart(String userId, String productId, int quantity) {
        Cart cart = getCartByUserId(userId);
        
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found");
        }
        
        Product product = productOpt.get();
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            // Update quantity of existing item
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            // Add new item to cart
            CartItem newItem = new CartItem(
                    product.getId(),
                    product.getName(),
                    product.getImageUrl(),
                    quantity,
                    product.getPrice()
            );
            cart.addItem(newItem);
        }
        
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    public Cart updateCartItem(String userId, String productId, int quantity) {
        Cart cart = getCartByUserId(userId);
        
        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));
        
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    public Cart removeFromCart(String userId, String productId) {
        Cart cart = getCartByUserId(userId);
        cart.removeItem(productId);
        return cartRepository.save(cart);
    }

    public Cart clearCart(String userId) {
        Cart cart = getCartByUserId(userId);
        cart.getItems().clear();
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }
}