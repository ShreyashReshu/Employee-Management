INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_MODERATOR');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

INSERT INTO employees (first_name, last_name, email, phone_number, department, position, hire_date, salary, address, status)
VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', 'Engineering', 'Software Engineer', '2023-01-15', 90000, '123 Main St, City', 'ACTIVE');

INSERT INTO employees (first_name, last_name, email, phone_number, department, position, hire_date, salary, address, status)
VALUES ('Jane', 'Smith', 'jane.smith@example.com', '0987654321', 'HR', 'HR Manager', '2022-05-10', 80000, '456 Elm St, City', 'ACTIVE');

INSERT INTO employees (first_name, last_name, email, phone_number, department, position, hire_date, salary, address, status)
VALUES ('Alice', 'Brown', 'alice.brown@example.com', '5551234567', 'Finance', 'Accountant', '2021-09-01', 75000, '789 Oak St, City', 'ON_LEAVE');
