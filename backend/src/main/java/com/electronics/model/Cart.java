package com.electronics.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
public class Cart {
    @Id
    private String id;
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private double totalAmount;

    public Cart() {}

    public Cart(String userId) {
        this.userId = userId;
        this.items = new ArrayList<>();
        this.totalAmount = 0.0;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
        calculateTotalAmount();
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void addItem(CartItem item) {
        this.items.add(item);
        calculateTotalAmount();
    }

    public void removeItem(String productId) {
        this.items.removeIf(item -> item.getProductId().equals(productId));
        calculateTotalAmount();
    }

    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }
}