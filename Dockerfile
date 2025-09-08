# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Copy only the pom.xml first (for better caching)
COPY backend/pom.xml .

# Download dependencies (this step is cached)
RUN mvn dependency:go-offline -B

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17-alpine

# Set working directory
WORKDIR /app

# Copy the built WAR file
COPY --from=build /app/target/*.war /app/app.war

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.war"]
