package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Student;
import com.fyp.studentportal.domains.StudentAttemptQuizRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findAllByDepartment_DepartmentId(Long departmentId);
    Student getStudentByEmailAddress(String emailAddress);
}
