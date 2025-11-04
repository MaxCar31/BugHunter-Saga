FROM gradle:jdk17-focal AS builder

WORKDIR /app

# Copiar solo archivos de configuración de Gradle primero
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Descargar dependencias (esta capa se cachea si no cambian los archivos de configuración)
RUN chmod +x ./gradlew && ./gradlew dependencies --no-daemon || true

# Ahora copiar el resto del código fuente
COPY src ./src

# Construir la aplicación
RUN ./gradlew build -x test --no-daemon

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]