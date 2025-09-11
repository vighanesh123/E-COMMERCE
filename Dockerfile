# Build stage
FROM maven:3.9.6-eclipse-temurin-17-slim AS build

WORKDIR /app

# Copy Maven settings
COPY settings.xml /usr/share/maven/conf/settings.xml

# Set Maven options
ENV MAVEN_OPTS="-Dmaven.wagon.http.retryHandler.count=3 -Dmaven.wagon.http.retryHandler.interval=10000 -Dmaven.wagon.httpconnectionManager.ttlSeconds=30"

# Copy only pom.xml for dependency caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B -U

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-slim

WORKDIR /app

# Copy the built JAR file
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]
