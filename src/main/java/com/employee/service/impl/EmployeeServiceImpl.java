package com.employee.service.impl;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import com.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }

    @Override
    public List<Employee> findByDepartment(String department) {
        return employeeRepository.findByDepartment(department);
    }

    @Override
    public List<Employee> findByStatus(Employee.EmploymentStatus status) {
        return employeeRepository.findByStatus(status);
    }
} 