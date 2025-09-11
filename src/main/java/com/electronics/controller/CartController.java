package com.electronics.controller;

import com.electronics.dto.AddToCartRequest;
import com.electronics.model.Cart;
import com.electronics.service.CartService;
import com.electronics.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Cart cart = cartService.getCartByUserId(userPrincipal.getId());
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                         @Valid @RequestBody AddToCartRequest request) {
        Cart cart = cartService.addToCart(userPrincipal.getId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateCartItem(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                              @Valid @RequestBody AddToCartRequest request) {
        Cart cart = cartService.updateCartItem(userPrincipal.getId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                              @PathVariable String productId) {
        Cart cart = cartService.removeFromCart(userPrincipal.getId(), productId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Cart cart = cartService.clearCart(userPrincipal.getId());
        return ResponseEntity.ok(cart);
    }
}