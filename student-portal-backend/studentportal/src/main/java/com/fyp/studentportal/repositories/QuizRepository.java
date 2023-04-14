package com.fyp.studentportal.repositories;

import com.fyp.studentportal.domains.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findAllByCourse_CourseId(Long courseId);
}
