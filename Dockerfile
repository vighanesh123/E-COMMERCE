# Build stage
FROM maven:3.8.6-amazoncorretto-17 AS build

# Set working directory
WORKDIR /app

# Create .mvn directory first
RUN mkdir -p .mvn/wrapper

# Copy only the essential files first (for better caching)
COPY backend/pom.xml .
COPY backend/mvnw* .
COPY backend/.mvn/wrapper .mvn/wrapper/

# Install Maven wrapper if not present
RUN if [ ! -f "/usr/share/maven/bin/mvn" ]; then \
      mkdir -p /usr/share/maven /usr/share/maven/ref \
      && curl -fsSL -o /tmp/apache-maven.tar.gz https://apache.osuosl.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.tar.gz \
      && tar -xzf /tmp/apache-maven.tar.gz -C /usr/share/maven --strip-components=1 \
      && rm -f /tmp/apache-maven.tar.gz; \
    fi

# Download dependencies (this step is cached)
RUN if [ -f "./mvnw" ]; then \
      chmod +x mvnw && ./mvnw dependency:go-offline -B; \
    else \
      mvn dependency:go-offline -B; \
    fi

# Copy source code
COPY backend/src ./src

# Build the application
RUN if [ -f "./mvnw" ]; then \
      ./mvnw clean package -DskipTests; \
    else \
      mvn clean package -DskipTests; \
    fi

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
