package com.fyp.studentportal.serviceImpls;

import com.fyp.studentportal.domains.Department;
import com.fyp.studentportal.repositories.DepartmentRepository;
import com.fyp.studentportal.services.IDepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements IDepartmentService {
    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getAllDepartments() {
        return this.departmentRepository.findAll();
    }
}
