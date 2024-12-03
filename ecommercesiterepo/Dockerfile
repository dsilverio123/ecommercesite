# Using the JDK 17 base image
FROM openjdk:17-jdk-alpine

# Copy the jar file into the container
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# defines how the application should run (in this case the spring boot jar file)
ENTRYPOINT ["java", "-jar", "/app.jar"]
