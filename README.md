# Employee Management System

A robust employee management system built with Spring Boot, featuring JWT authentication and role-based access control.

## Features

- User authentication with JWT
- Role-based access control (USER, MODERATOR, ADMIN)
- CRUD operations for employee management
- Department-based employee organization
- Employee status tracking
- Secure password handling
- PostgreSQL database integration

## Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE employee_management;
```

2. Update the database configuration in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Building and Running

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-management
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/signin` - Login user

### Employee Management
- GET `/api/employees` - Get all employees (requires authentication)
- GET `/api/employees/{id}` - Get employee by ID (requires authentication)
- POST `/api/employees` - Create new employee (requires MODERATOR or ADMIN role)
- PUT `/api/employees/{id}` - Update employee (requires MODERATOR or ADMIN role)
- DELETE `/api/employees/{id}` - Delete employee (requires ADMIN role)
- GET `/api/employees/department/{department}` - Get employees by department (requires authentication)
- GET `/api/employees/status/{status}` - Get employees by status (requires MODERATOR or ADMIN role)

## Security

- JWT-based authentication
- Password encryption using BCrypt
- Role-based access control
- Secure session management
- CORS configuration

## Testing

Run the tests using Maven:
```bash
mvn test
```

## Project Structure

```
src/main/java/com/employee/
├── controller/         # REST controllers
├── model/             # Entity classes
├── repository/        # Data access layer
├── security/          # Security configuration
│   ├── jwt/          # JWT utilities
│   └── services/     # User details service
├── service/           # Business logic
│   └── impl/         # Service implementations
└── payload/          # Request/Response DTOs
    ├── request/      # Request payloads
    └── response/     # Response payloads
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 