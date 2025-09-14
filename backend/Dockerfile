# Use Maven image for building
FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Use runtime image
FROM openjdk:17-jre-slim

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/ecommerce-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-Dserver.port=${PORT:-8080}", "-jar", "app.jar"]
