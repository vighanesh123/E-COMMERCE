package com.electronics.controller;

import com.electronics.dto.CreateOrderRequest;
import com.electronics.model.Order;
import com.electronics.security.UserPrincipal;
import com.electronics.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Create a new order
     */
    @PostMapping
    public ResponseEntity<?> createOrder(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateOrderRequest orderRequest) {
        
        System.out.println("POST /api/orders received");
        System.out.println("User ID: " + userPrincipal.getId());
        System.out.println("Order request: " + orderRequest.getPaymentMethod());
        System.out.println("Shipping address: " + orderRequest.getShippingAddress().getStreet() + ", " + 
                          orderRequest.getShippingAddress().getCity() + ", " + 
                          orderRequest.getShippingAddress().getState());
        
        try {
            Order order = orderService.createOrder(userPrincipal.getId(), orderRequest);
            System.out.println("Order created successfully with ID: " + order.getId());
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            System.err.println("Error in createOrder controller: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating order: " + e.getMessage());
        }
    }

    /**
     * Get all orders for the authenticated user
     */
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        List<Order> orders = orderService.getUserOrders(userPrincipal.getId());
        return ResponseEntity.ok(orders);
    }

    /**
     * Get order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String orderId) {
        
        Order order = orderService.getOrderById(orderId);
        
        // Ensure the order belongs to the authenticated user
        if (!order.getUser().getId().equals(userPrincipal.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(order);
    }

    /**
     * Update order status (could be restricted to admin in a real app)
     */
    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String orderId,
            @RequestParam String status) {
        
        Order updatedOrder = orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }

    /**
     * Update payment status (could be restricted to admin in a real app)
     */
    @PutMapping("/{orderId}/payment")
    public ResponseEntity<Order> updatePaymentStatus(
            @PathVariable String orderId,
            @RequestParam String paymentStatus) {
        
        Order updatedOrder = orderService.updatePaymentStatus(orderId, paymentStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}