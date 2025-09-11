package com.electronics.repository;

import com.electronics.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    List<Product> findByCategory(String category);
    
    List<Product> findByBrand(String brand);
    
    @Query("{'name': {$regex: ?0, $options: 'i'}}")
    List<Product> findByNameContainingIgnoreCase(String name);
    
    @Query("{$or: [" +
           "{'name': {$regex: ?0, $options: 'i'}}, " +
           "{'description': {$regex: ?0, $options: 'i'}}, " +
           "{'brand': {$regex: ?0, $options: 'i'}}, " +
           "{'category': {$regex: ?0, $options: 'i'}}" +
           "]}")
    List<Product> searchProducts(String query);
}