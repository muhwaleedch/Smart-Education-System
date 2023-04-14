package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findAllByDepartment_DepartmentId(Long departmentId);

    Teacher getTeacherByEmailAddress(String emailAddress);
}
