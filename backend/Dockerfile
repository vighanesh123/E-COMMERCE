FROM openjdk:17-jdk-slim

# Set JAVA_HOME explicitly
ENV JAVA_HOME=/usr/local/openjdk-17
ENV PATH=$JAVA_HOME/bin:$PATH

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-Dserver.port=${PORT:-8080}", "-jar", "target/ecommerce-backend-0.0.1-SNAPSHOT.jar"]
