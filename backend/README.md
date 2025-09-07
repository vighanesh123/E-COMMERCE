# Electronics E-commerce Backend

Spring Boot REST API for the electronics e-commerce platform.

## 🚀 Quick Start

```bash
./mvnw spring-boot:run
```

## 🏗️ Architecture

```
src/main/java/com/electronics/
├── EcommerceBackendApplication.java    # Main Spring Boot application
├── config/
│   ├── DataLoader.java                 # Preloads 30 sample products
│   └── WebSecurityConfig.java          # Security configuration
├── controller/
│   ├── AuthController.java             # Authentication endpoints
│   ├── CartController.java             # Shopping cart endpoints
│   └── ProductController.java          # Product management endpoints
├── dto/
│   ├── AddToCartRequest.java           # Cart addition request
│   ├── JwtResponse.java                # JWT authentication response
│   ├── LoginRequest.java               # User login request
│   ├── MessageResponse.java            # Generic API response
│   └── SignupRequest.java              # User registration request
├── model/
│   ├── Cart.java                       # Shopping cart entity
│   ├── CartItem.java                   # Individual cart item entity
│   ├── Product.java                    # Product entity
│   └── User.java                       # User entity
├── repository/
│   ├── CartRepository.java             # Cart data access
│   ├── ProductRepository.java          # Product data access
│   └── UserRepository.java             # User data access
├── security/
│   ├── AuthEntryPointJwt.java          # JWT authentication entry point
│   ├── AuthTokenFilter.java            # JWT token filter
│   ├── JwtUtils.java                   # JWT utilities
│   └── UserPrincipal.java              # User principal implementation
└── service/
    ├── CartService.java                # Cart business logic
    ├── ProductService.java             # Product business logic
    └── UserDetailsServiceImpl.java     # Spring Security user details
```

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MongoDB (Local or MongoDB Atlas)

## 🔧 Configuration

Update `src/main/resources/application.properties`:

```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/electronics_ecommerce
spring.data.mongodb.database=electronics_ecommerce

# JWT Configuration  
jwt.secret=mySecretKey
jwt.expiration=86400

# Server Configuration
server.port=8080

# CORS Configuration (handled in WebSecurityConfig)
```

## 🛠️ Technology Stack

- **Java 17**
- **Spring Boot 3.1.0**
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - Database integration
- **JWT** - JSON Web Token authentication
- **BCrypt** - Password encryption
- **Maven** - Dependency management
- **MongoDB** - NoSQL database

## 📦 API Endpoints

### Authentication Endpoints
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints
```http
GET /api/products                           # Get all products
GET /api/products/{id}                      # Get product by ID
GET /api/products/search?query=iphone       # Search products
GET /api/products/category/{category}       # Get products by category
```

### Cart Endpoints (Requires Authentication)
```http
GET /api/cart                              # Get user cart
POST /api/cart/add                         # Add item to cart
PUT /api/cart/update                       # Update cart item quantity
DELETE /api/cart/remove/{productId}        # Remove item from cart
```

## 🗄️ Database Schema

### User Document
```json
{
  "_id": "ObjectId",
  "firstName": "String",
  "lastName": "String", 
  "email": "String (unique)",
  "password": "String (bcrypt hashed)"
}
```

### Product Document
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Double",
  "category": "String",
  "brand": "String", 
  "imageUrl": "String",
  "specifications": {
    "key": "value"
  },
  "inStock": "Boolean",
  "stockQuantity": "Integer"
}
```

### Cart Document
```json
{
  "_id": "ObjectId",
  "userId": "String",
  "items": [
    {
      "productId": "String",
      "quantity": "Integer",
      "price": "Double"
    }
  ],
  "totalAmount": "Double"
}
```

## 🧪 Sample Data

The `DataLoader.java` automatically loads 30 sample products:
- **10 Smartphones**: iPhone, Samsung Galaxy, Google Pixel
- **10 Laptops**: MacBook, ThinkPad, Gaming Laptops
- **10 Audio Equipment**: Speakers, Headphones, Earbuds

## 🔒 Security Features

- **JWT Authentication** with configurable expiration
- **BCrypt Password Encryption** for secure password storage
- **CORS Configuration** for frontend integration
- **Protected Endpoints** requiring valid JWT tokens
- **User Principal** integration with Spring Security

## 🚀 Running the Application

### Development Mode
```bash
./mvnw spring-boot:run
```

### Production Build
```bash
./mvnw clean package
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

## 🧪 Testing

### Using curl
```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"password123"}'

# Get products
curl http://localhost:8080/api/products
```

## 📊 Performance Considerations

- **Database Indexing**: Email field is indexed for faster user lookups
- **JWT Stateless**: No server-side session storage
- **MongoDB Aggregation**: Efficient cart total calculations
- **CORS Optimization**: Configured for specific origins in production

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on localhost:27017
   - Or update connection string for MongoDB Atlas

2. **Port 8080 Already in Use**
   - Change `server.port` in application.properties
   - Or stop the process using port 8080

3. **JWT Secret Error**
   - Ensure `jwt.secret` is set in application.properties
   - Use a strong, long secret key for production

4. **CORS Errors**
   - Check `WebSecurityConfig.java` CORS configuration
   - Ensure frontend origin is allowed

---

**Backend API Ready! 🚀**