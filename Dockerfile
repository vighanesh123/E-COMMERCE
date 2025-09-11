# Build stage
FROM maven:3.9.6-eclipse-temurin-17-slim AS build

WORKDIR /app

# Copy Maven settings with reliable mirrors
COPY settings.xml /usr/share/maven/conf/settings.xml

# Set Maven options for better reliability
ENV MAVEN_OPTS="-Dmaven.wagon.http.retryHandler.count=3 -Dmaven.wagon.http.retryHandler.interval=10000 -Dmaven.wagon.httpconnectionManager.ttlSeconds=30"

# Copy only the POM file first (for better caching)
COPY pom.xml .

# Function to retry Maven commands
RUN echo 'function mvn_with_retry() { \
    local max_attempts=3 \
    local attempt=1 \
    local exit_code=0 \
    while [ $attempt -le $max_attempts ]; do \
        echo "Attempt $attempt of $max_attempts: $@"; \
        if mvn "$@"; then \
            exit_code=0; \
            break; \
        else \
            exit_code=$?; \
            echo "Attempt $attempt failed with status $exit_code"; \
            sleep $((attempt * 10)); \
            attempt=$((attempt + 1)); \
        fi; \
    done; \
    return $exit_code \
}' >> ~/.bashrc

# Download dependencies with retry logic
RUN . ~/.bashrc && mvn_with_retry dependency:go-offline -B -U

# Copy source code
COPY src ./src

# Build the application with retry logic
RUN . ~/.bashrc && mvn_with_retry clean package -DskipTests

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
