# Use Maven image for building
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Use Amazon Corretto 17 for runtime
FROM amazoncorretto:17-alpine

# Set working directory
WORKDIR /app

# Copy the built WAR file (since pom.xml shows WAR packaging)
COPY --from=build /app/target/*.war app.war

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

# Run the application
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.war"]
