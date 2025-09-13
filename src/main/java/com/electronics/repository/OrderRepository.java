package com.electronics.repository;

import com.electronics.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Find all orders for a specific user
    List<Order> findByUserId(String userId);
    
    // Find orders by status
    List<Order> findByStatus(String status);
    
    // Find orders by payment status
    List<Order> findByPaymentStatus(String paymentStatus);
    
    // Find orders by user and status
    List<Order> findByUserIdAndStatus(String userId, String status);
}