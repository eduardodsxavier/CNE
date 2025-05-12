FROM maven:3.8.5-openjdk-17 AS dev

RUN mvn clean install 

WORKDIR /app
COPY . /app

CMD ["mvn", "spring-boot:run"]

