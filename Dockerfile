FROM maven:3.8.6-amazoncorretto-17

WORKDIR /app

# Copy only the files needed for downloading dependencies first (better layer caching)
COPY backend/pom.xml .
COPY backend/mvnw .
COPY backend/.mvn .mvn

# Download dependencies (this step is cached)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY backend/src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime
FROM amazoncorretto:17-alpine

WORKDIR /app

# Copy the built WAR file
COPY --from=0 /app/target/*.war app.war

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.war"]
