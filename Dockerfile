# Build stage
FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

# Configure Maven with reliable mirrors and retry logic
RUN mkdir -p /root/.m2 && \
    echo '<?xml version="1.0" encoding="UTF-8"?><settings>\
    <mirrors>\
        <mirror>\
            <id>central</id>\
            <name>Maven Central</name>\
            <url>https://repo1.maven.org/maven2</url>\
            <mirrorOf>central</mirrorOf>\
        </mirror>\
        <mirror>\
            <id>google-maven-central</id>\
            <name>Google Maven Central Mirror</name>\
            <url>https://maven-central.storage-download.googleapis.com/maven2/</url>\
            <mirrorOf>central</mirrorOf>\
        </mirror>\
    </mirrors>\
    <profiles>\
        <profile>\
            <id>default</id>\
            <activation><activeByDefault>true</activeByDefault></activation>\
            <repositories>\
                <repository>\
                    <id>central</id>\
                    <url>https://repo1.maven.org/maven2</url>\
                    <releases><enabled>true</enabled></releases>\
                    <snapshots><enabled>false</enabled></snapshots>\
                </repository>\
            </repositories>\
        </profile>\
    </profiles>\
    </settings>' > /root/.m2/settings.xml

# Copy only the POM file first (for better caching)
COPY backend/pom.xml .

# Download dependencies with retry logic
RUN mvn dependency:go-offline -B || \
    (echo "First attempt failed, retrying..." && sleep 10 && mvn dependency:go-offline -B) || \
    (echo "Second attempt failed, retrying one more time..." && sleep 20 && mvn dependency:go-offline -B)

# Copy source code
COPY backend/src ./src

# Build the application with retry logic
RUN mvn clean package -DskipTests || \
    (echo "First build attempt failed, retrying..." && sleep 10 && mvn clean package -DskipTests) || \
    (echo "Second build attempt failed, retrying one more time..." && sleep 20 && mvn clean package -DskipTests)

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
