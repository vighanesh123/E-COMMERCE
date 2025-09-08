# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Copy only the files needed for downloading dependencies
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies (this step is cached)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17-alpine

# Install required packages
RUN apk add --no-cache tzdata

# Set timezone
ENV TZ=Asia/Kolkata

# Set working directory
WORKDIR /app

# Copy the built WAR file
COPY --from=build /app/target/*.war app.war

# Expose port
EXPOSE $PORT

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application with the PORT environment variable
CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=$PORT -jar app.war"]
