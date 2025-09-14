package com.electronics.dto;

import com.electronics.model.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateOrderRequest {
    
    @Valid
    @NotNull(message = "Shipping address is required")
    private Address shippingAddress;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
    
    // Getters and Setters
    public Address getShippingAddress() {
        return shippingAddress;
    }
    
    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}