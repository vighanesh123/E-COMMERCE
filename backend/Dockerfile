# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# First, copy only the pom.xml and download dependencies
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies (this step is cached)
RUN ./mvnw dependency:go-offline -B

# Then copy the source code
COPY src/ /app/src/

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17-alpine

# Install required packages
RUN apk add --no-cache tzdata

# Set timezone
ENV TZ=Asia/Kolkata

# Create app directory
WORKDIR /app

# Copy the built WAR file from the build stage
COPY --from=build /app/target/*.war /app/app.war

# Make sure the file was copied correctly
RUN ls -la /app/

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.war"]
