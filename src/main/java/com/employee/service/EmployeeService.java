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

    // Controller-expected methods for compatibility
    default List<Employee> getAllEmployees() { return findAll(); }
    default Optional<Employee> getEmployeeById(Long id) { return findById(id); }
    default Employee createEmployee(Employee employee) { return save(employee); }
    default Optional<Employee> updateEmployee(Long id, Employee employee) {
        if (!findById(id).isPresent()) return Optional.empty();
        employee.setId(id);
        return Optional.of(save(employee));
    }
    default void deleteEmployee(Long id) { deleteById(id); }
}