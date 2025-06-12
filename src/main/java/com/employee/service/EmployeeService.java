package com.employee.service;

import com.employee.model.Employee;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> findAll();
    Optional<Employee> findById(Long id);
    Employee save(Employee employee);
    void deleteById(Long id);
    boolean existsByEmail(String email);
    List<Employee> findByDepartment(String department);
    List<Employee> findByStatus(Employee.EmploymentStatus status);
} 