package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findAllByCourse_CourseId(Long courseId);
}
