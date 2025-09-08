# Use OpenJDK with Maven
FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

# Copy only the pom.xml first (for better caching)
COPY backend/pom.xml .

# Download dependencies
RUN mvn -B dependency:resolve dependency:resolve-plugins

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn -B clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim

WORKDIR /app

# Copy the built WAR file
COPY --from=build /app/target/*.war app.war

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.war"]
