package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Course;
import com.fyp.studentportal.enums.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByDepartment_DepartmentId(Long departmentId);
    List<Course> findAllByDepartment_DepartmentIdAndSemesterNumberIn(Long departmentId, List<Semester> semesters);
}
