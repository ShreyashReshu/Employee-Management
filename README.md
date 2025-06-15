# Employee Management System

A robust, flexible, and user-friendly employee management system built with Spring Boot (Java), featuring JWT token-based authentication, secure CRUD APIs, and a modern web UI.

## Objective

Develop an employee management system that ensures reusability, security, and functionality. The system is designed to be robust, flexible, and user-friendly.



## Scope
- Backend development using Java (Spring Boot)
- H2 in-memory database for easy setup (can be switched to PostgreSQL)
- User-friendly frontend website with backend API integration

## Features
- Token-based authentication (JWT)
- Secure login/logout
- CRUD (Add, Update, Delete) operations for employees
- Role-based access control (USER, MODERATOR, ADMIN)
- Department and status tracking
- Responsive web UI (Bootstrap)

## Requirements
- Java 17 or higher
- Maven


## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd employee-management
   ```
2. **Build and run:**
   ```bash
   mvn clean install
   ./mvnw spring-boot:run
   ```
3. **Access the app:**
   - Frontend: [http://localhost:8082](http://localhost:8082)
   - H2 Console: [http://localhost:8082/h2-console](http://localhost:8082/h2-console)

## API Endpoints

### Authentication
- POST `/api/auth/signin` - Login user (JWT token)

### Employee Management
- GET `/api/employees` - List all employees
- POST `/api/employees` - Add employee
- PUT `/api/employees/{id}` - Update employee
- DELETE `/api/employees/{id}` - Delete employee

> All endpoints require authentication (JWT token in `Authorization` header).

## Project Structure

```
src/main/java/com/employee/
├── controller/         # REST controllers
├── model/              # Entity classes
├── repository/         # Data access layer
├── security/           # Security configuration
├── service/            # Business logic
└── payload/            # Request/Response DTOs
```

## Demo Users
- **Username:** admin, **Password:** admin (role: ADMIN)
-

## Notes
- Registration is disabled for security. Use provided demo users to log in.
- The system uses an in-memory H2 database by default for easy testing. Switch to PostgreSQL by editing `application.properties`.

## Deliverables
- GitHub repository URL of the codebase
- Project documentation (this README)
- Deployment URL (Optional)

---

