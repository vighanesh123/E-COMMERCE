package com.electronics.service;

import com.electronics.dto.CreateOrderRequest;
import com.electronics.model.Cart;
import com.electronics.model.Order;
import com.electronics.model.User;
import com.electronics.repository.CartRepository;
import com.electronics.repository.OrderRepository;
import com.electronics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    /**
     * Create a new order from the user's cart
     */
    public Order createOrder(String userId, CreateOrderRequest orderRequest) {
        System.out.println("Creating order for user ID: " + userId);
        System.out.println("Order request: " + orderRequest.getPaymentMethod() + ", Address: " + orderRequest.getShippingAddress());
        
        try {
            // Find the user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println("User found: " + user.getId() + ", " + user.getEmail());

            // Find the user's cart
            Cart cart = cartRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Cart not found"));
            System.out.println("Cart found with " + cart.getItems().size() + " items");

            // Create a new order
            Order order = new Order();
            order.setUser(user);
            order.setItems(cart.getItems());
            double totalAmount = calculateTotalAmount(cart);
            order.setTotalAmount(totalAmount);
            System.out.println("Total order amount: " + totalAmount);
            
            order.setShippingAddress(orderRequest.getShippingAddress());
            order.setPaymentMethod(orderRequest.getPaymentMethod());
            order.setOrderDate(new Date());
            order.setLastUpdated(new Date());
            order.setStatus("PENDING");
            order.setPaymentStatus("PENDING");
            
            System.out.println("Order created, attempting to save to MongoDB...");
            // Save the order
            Order savedOrder = orderRepository.save(order);
            System.out.println("Order saved successfully with ID: " + savedOrder.getId());

            // Clear the cart after order is created
            System.out.println("Clearing user's cart...");
            cart.getItems().clear();
            cartRepository.save(cart);
            System.out.println("Cart cleared successfully");

            return savedOrder;
        } catch (Exception e) {
            System.err.println("Error creating order: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Calculate the total amount of the cart
     */
    private double calculateTotalAmount(Cart cart) {
        return cart.getItems().stream()
                .mapToDouble(item -> {
                    // Ensure we have a valid price and quantity
                    double price = item.getPrice() > 0 ? item.getPrice() : 0;
                    int quantity = item.getQuantity() > 0 ? item.getQuantity() : 0;
                    return price * quantity;
                })
                .sum();
    }

    /**
     * Get all orders for a user
     */
    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Get order by ID
     */
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    /**
     * Update order status
     */
    public Order updateOrderStatus(String orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        order.setLastUpdated(new Date());
        return orderRepository.save(order);
    }

    /**
     * Update payment status
     */
    public Order updatePaymentStatus(String orderId, String paymentStatus) {
        Order order = getOrderById(orderId);
        order.setPaymentStatus(paymentStatus);
        order.setLastUpdated(new Date());
        return orderRepository.save(order);
    }
}