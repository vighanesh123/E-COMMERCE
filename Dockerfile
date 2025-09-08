# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Create settings.xml with reliable mirrors
RUN mkdir -p /root/.m2 && \
    echo '<settings><mirrors>\
        <mirror>\
            <id>central</id>\
            <name>Maven Central</name>\
            <url>https://repo1.maven.org/maven2</url>\
            <mirrorOf>central</mirrorOf>\
        </mirror>\
        <mirror>\
            <id>google</id>\
            <name>Google Maven</name>\
            <url>https://maven.google.com</url>\
            <mirrorOf>google</mirrorOf>\
        </mirror>\
    </mirrors></settings>' > /root/.m2/settings.xml

# Copy only the pom.xml first (for better caching)
COPY backend/pom.xml .

# Download dependencies with retry logic
RUN mvn dependency:go-offline -B -U || \
    (echo "First attempt failed, retrying..." && sleep 5 && mvn dependency:go-offline -B) || \
    (echo "Second attempt failed, retrying one more time..." && sleep 10 && mvn dependency:go-offline -B)

# Copy source code
COPY backend/src ./src

# Build the application with retry logic
RUN mvn clean package -DskipTests -U || \
    (echo "First build attempt failed, retrying..." && sleep 5 && mvn clean package -DskipTests) || \
    (echo "Second build attempt failed, retrying one more time..." && sleep 10 && mvn clean package -DskipTests)

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
