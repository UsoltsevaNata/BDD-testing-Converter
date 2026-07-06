# Unit Converter Web Application

A lightweight Spring Boot web application for converting between different units of measurement.  
This project was created as a **test subject** for comparing three BDD (Behavior-Driven Development) frameworks:  
**Cucumber**, **Enhanced Gherkin**, and **ConcordiaLang**.

---

## Features

- **Length conversions** – metres ↔ kilometres, metres ↔ centimetres, metres ↔ millimetres  
- **Mass conversions** – kilograms ↔ grams, kilograms ↔ tonnes  
- **Temperature conversions** – Celsius ↔ Fahrenheit, Celsius ↔ Kelvin, Kelvin ↔ Celsius  
- **History tracking** – each successful conversion is stored and displayed  
- **Input validation** – handles negative values, non‑numeric input, and absolute zero checks  

All conversion logic is implemented in a clean, service‑oriented architecture.

---

## Technology Stack

- **Java 17** + **Spring Boot 3.x**  
- **Thymeleaf** for server‑side rendering  
- **Maven** for build automation  
- **Node.js** + **npm** for test runners (optional, only for BDD frameworks)

---

## Why This Project?

This application was designed specifically to serve as a **real‑world testing target** for BDD frameworks.  
It provides a mix of:
- simple CRUD‑like operations (history)
- complex validation rules
- many parameter combinations (12 conversion types)

This makes it ideal for evaluating how well each BDD framework handles:
- **repetitive scenarios** (loops, data tables)
- **conditional logic** (validation branches)
- **variable reuse** (storing and comparing values across steps)

---

## Running the Application

### Prerequisites
- Java 17+
- Maven 3.6+

### Build and start
```bash
mvn spring-boot:run
